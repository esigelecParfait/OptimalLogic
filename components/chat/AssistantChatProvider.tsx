"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  COOKIE_CONSENT_UPDATED_EVENT,
  COOKIE_PREFERENCES_STORAGE_KEY,
  OPEN_COOKIE_PREFERENCES_EVENT,
  isCookiePreferences,
  type CookiePreferences,
} from "@/lib/cookie-consent";

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

type AssistantChatContextValue = {
  chatbotConsent: boolean | null;
  input: string;
  isHistoryReady: boolean;
  isStreaming: boolean;
  messages: AssistantMessage[];
  requestCookiePreferences: () => void;
  sendMessage: (text: string) => Promise<void>;
  setInput: Dispatch<SetStateAction<string>>;
};

const HISTORY_STORAGE_KEY = "ol_chat_messages";
const ERROR_MESSAGE = "Une erreur est survenue. Contactez-nous à contact@optimallogic.fr";

const AssistantChatContext = createContext<AssistantChatContextValue | null>(null);

function isAssistantMessage(value: unknown): value is AssistantMessage {
  if (typeof value !== "object" || value === null) return false;

  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string"
  );
}

function readStoredMessages(): AssistantMessage[] {
  try {
    const savedMessages = sessionStorage.getItem(HISTORY_STORAGE_KEY);
    if (!savedMessages) return [];

    const parsed: unknown = JSON.parse(savedMessages);
    const messages = Array.isArray(parsed) ? parsed.filter(isAssistantMessage) : [];

    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant" && !lastMessage.content.trim()) {
      return replacePendingAssistant(
        messages,
        "La réponse a été interrompue. Vous pouvez réessayer.",
      );
    }

    return messages;
  } catch {
    return [];
  }
}

function replacePendingAssistant(
  messages: AssistantMessage[],
  content: string,
): AssistantMessage[] {
  if (messages.length === 0) return messages;

  const updated = [...messages];
  updated[updated.length - 1] = { role: "assistant", content };
  return updated;
}

export function AssistantChatProvider({ children }: { children: ReactNode }) {
  const [chatbotConsent, setChatbotConsent] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isHistoryReady, setIsHistoryReady] = useState(false);
  const activeRequestRef = useRef<AbortController | null>(null);
  const hasLoadedHistoryRef = useRef(false);

  useEffect(() => {
    let initialConsent = false;

    try {
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_STORAGE_KEY);
      if (savedPreferences) {
        const parsed: unknown = JSON.parse(savedPreferences);
        initialConsent = isCookiePreferences(parsed) ? parsed.chatbot : false;
      }
    } catch {
      initialConsent = false;
    }

    const initialConsentTimeout = window.setTimeout(
      () => setChatbotConsent(initialConsent),
      0,
    );

    function updateConsent(event: Event) {
      const preferences = (event as CustomEvent<CookiePreferences>).detail;
      if (isCookiePreferences(preferences)) {
        window.clearTimeout(initialConsentTimeout);
        setChatbotConsent(preferences.chatbot);
      }
    }

    function updateConsentFromStorage(event: StorageEvent) {
      if (event.key !== COOKIE_PREFERENCES_STORAGE_KEY) return;
      window.clearTimeout(initialConsentTimeout);

      try {
        const parsed: unknown = event.newValue ? JSON.parse(event.newValue) : null;
        setChatbotConsent(isCookiePreferences(parsed) ? parsed.chatbot : false);
      } catch {
        setChatbotConsent(false);
      }
    }

    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, updateConsent);
    window.addEventListener("storage", updateConsentFromStorage);

    return () => {
      window.clearTimeout(initialConsentTimeout);
      window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, updateConsent);
      window.removeEventListener("storage", updateConsentFromStorage);
    };
  }, []);

  useEffect(() => {
    if (chatbotConsent !== true || hasLoadedHistoryRef.current) return;

    const timeout = window.setTimeout(() => {
      setMessages(readStoredMessages());
      hasLoadedHistoryRef.current = true;
      setIsHistoryReady(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [chatbotConsent]);

  useEffect(() => {
    if (chatbotConsent !== true) {
      activeRequestRef.current?.abort();
    }
  }, [chatbotConsent]);

  useEffect(() => {
    if (chatbotConsent !== true || !isHistoryReady) return;

    try {
      sessionStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Le chatbot reste utilisable si le stockage navigateur est indisponible.
    }
  }, [chatbotConsent, isHistoryReady, messages]);

  useEffect(() => {
    return () => activeRequestRef.current?.abort();
  }, []);

  const requestCookiePreferences = useCallback(() => {
    window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmedText = text.trim();
      if (!trimmedText || isStreaming || chatbotConsent !== true || !isHistoryReady) {
        return;
      }

      const userMessage: AssistantMessage = {
        role: "user",
        content: trimmedText,
      };
      const nextMessages = [...messages, userMessage];

      setMessages([...nextMessages, { role: "assistant", content: "" }]);
      setInput("");
      setIsStreaming(true);

      const controller = new AbortController();
      activeRequestRef.current = controller;

      try {
        const response = await fetch("/api/chat/public", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          setMessages((current) => replacePendingAssistant(current, ERROR_MESSAGE));
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let receivedText = false;
        let streamFailed = false;
        let streamFinished = false;

        function processLine(line: string) {
          if (!line.startsWith("data: ")) return;

          const data = line.slice(6);
          if (data === "[DONE]") {
            streamFinished = true;
            return;
          }

          try {
            const parsed = JSON.parse(data) as {
              error?: string;
              text?: string;
            };

            if (parsed.error) {
              streamFailed = true;
              return;
            }

            if (parsed.text) {
              receivedText = true;
              setMessages((current) => {
                if (current.length === 0) return current;

                const updated = [...current];
                const previousContent = updated[updated.length - 1].content;
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: previousContent + parsed.text,
                };
                return updated;
              });
            }
          } catch {
            // Une ligne SSE incomplète reste dans le buffer jusqu'au prochain bloc.
          }
        }

        while (!streamFinished) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          lines.forEach(processLine);
        }

        if (buffer) processLine(buffer);

        if (streamFailed || !receivedText) {
          setMessages((current) => replacePendingAssistant(current, ERROR_MESSAGE));
        } else if (!streamFinished) {
          setMessages((current) => {
            if (current.length === 0) return current;

            const updated = [...current];
            const previousContent = updated[updated.length - 1].content;
            updated[updated.length - 1] = {
              role: "assistant",
              content: `${previousContent}\n\nLa réponse a été interrompue. Vous pouvez réessayer.`,
            };
            return updated;
          });
        }
      } catch (error) {
        const wasAborted = error instanceof DOMException && error.name === "AbortError";
        setMessages((current) =>
          replacePendingAssistant(
            current,
            wasAborted
              ? "La réponse a été interrompue. Vous pouvez réessayer."
              : ERROR_MESSAGE,
          ),
        );
      } finally {
        if (activeRequestRef.current === controller) {
          activeRequestRef.current = null;
        }
        setIsStreaming(false);
      }
    },
    [chatbotConsent, isHistoryReady, isStreaming, messages],
  );

  const value = useMemo<AssistantChatContextValue>(
    () => ({
      chatbotConsent,
      input,
      isHistoryReady,
      isStreaming,
      messages,
      requestCookiePreferences,
      sendMessage,
      setInput,
    }),
    [
      chatbotConsent,
      input,
      isHistoryReady,
      isStreaming,
      messages,
      requestCookiePreferences,
      sendMessage,
    ],
  );

  return (
    <AssistantChatContext.Provider value={value}>
      {children}
    </AssistantChatContext.Provider>
  );
}

export function useAssistantChat() {
  const context = useContext(AssistantChatContext);
  if (!context) {
    throw new Error("useAssistantChat doit être utilisé dans AssistantChatProvider.");
  }
  return context;
}
