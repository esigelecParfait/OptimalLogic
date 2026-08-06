"use client";

import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useAssistantChat } from "@/components/chat/AssistantChatProvider";

type ChoiceItem = {
  label: string;
  href: string | null;
};

type AssistantChatCoreProps = {
  active?: boolean;
  variant: "desktop" | "page";
};

function renderText(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={index}
          href={link[2]}
          className="inline-flex items-center gap-0.5 font-semibold text-white underline underline-offset-2 hover:opacity-80"
        >
          {link[1]}
        </a>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function renderAssistantContent(
  content: string,
  onChoice: (text: string) => void,
  isStreaming: boolean,
  variant: AssistantChatCoreProps["variant"],
) {
  const lines = content.split("\n");
  const result: ReactNode[] = [];
  let textBuffer: string[] = [];
  let choiceBuffer: ChoiceItem[] = [];

  function flushText() {
    const text = textBuffer.join("\n").trim();
    textBuffer = [];
    if (!text) return;

    result.push(
      <p key={result.length} className="leading-relaxed">
        {renderText(text)}
      </p>,
    );
  }

  function flushChoices() {
    if (choiceBuffer.length === 0) return;

    const items = [...choiceBuffer];
    choiceBuffer = [];
    const touchClass = variant === "page" ? "min-h-11 px-4 py-2.5" : "px-3.5 py-1.5";

    result.push(
      <div key={result.length} className="mt-3 flex flex-wrap gap-2">
        {items.map((item, index) =>
          item.href ? (
            <a
              key={index}
              href={item.href}
              className={`inline-flex items-center gap-1.5 rounded-full border border-white/[0.13] bg-white/[0.04] text-xs font-semibold text-ink transition hover:border-white/30 hover:bg-[rgba(255,255,255,0.12)] ${touchClass}`}
            >
              {item.label}
              <svg
                aria-hidden="true"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          ) : (
            <button
              key={index}
              type="button"
              onClick={() => !isStreaming && onChoice(item.label)}
              disabled={isStreaming}
              className={`inline-flex items-center rounded-full border border-white/[0.13] bg-white/[0.04] text-xs font-semibold text-ink transition hover:border-white/30 hover:bg-[rgba(255,255,255,0.12)] disabled:cursor-default disabled:opacity-50 ${touchClass}`}
            >
              {item.label}
            </button>
          ),
        )}
      </div>,
    );
  }

  for (const line of lines) {
    const linkChoice = line.match(/^-\s+\[([^\]]+)\]\(([^)]+)\)/);
    if (linkChoice) {
      flushText();
      choiceBuffer.push({ label: linkChoice[1], href: linkChoice[2] });
      continue;
    }

    const messageChoice = line.match(/^-\s+(.+)$/);
    if (messageChoice) {
      flushText();
      choiceBuffer.push({ label: messageChoice[1].trim(), href: null });
      continue;
    }

    flushChoices();
    textBuffer.push(line);
  }

  flushText();
  flushChoices();

  return <div className="space-y-2 text-sm">{result}</div>;
}

export default function AssistantChatCore({
  active = true,
  variant,
}: AssistantChatCoreProps) {
  const {
    chatbotConsent,
    input,
    isHistoryReady,
    isStreaming,
    messages,
    requestCookiePreferences,
    sendMessage,
    setInput,
  } = useAssistantChat();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const previousMessageCountRef = useRef(0);
  const previousConsentRef = useRef(chatbotConsent);
  const shouldAutoScrollRef = useRef(true);
  const wasStreamingRef = useRef(false);

  useEffect(() => {
    if (!active || !messagesRef.current) return;

    if (messages.length > previousMessageCountRef.current) {
      shouldAutoScrollRef.current = true;
    }
    previousMessageCountRef.current = messages.length;
    if (!shouldAutoScrollRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: isStreaming || reduceMotion ? "auto" : "smooth",
    });
  }, [active, isStreaming, messages]);

  useEffect(() => {
    if (!active || variant !== "desktop") return;
    if (!window.matchMedia("(min-width: 64rem)").matches) return;

    const timeout = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => window.clearTimeout(timeout);
  }, [active, chatbotConsent, isHistoryReady, variant]);

  useEffect(() => {
    const consentWasGranted =
      previousConsentRef.current === false && chatbotConsent === true;
    previousConsentRef.current = chatbotConsent;

    if (!consentWasGranted || !isHistoryReady || !active) return;

    const timeout = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(timeout);
  }, [active, chatbotConsent, isHistoryReady]);

  useEffect(() => {
    if (
      wasStreamingRef.current &&
      !isStreaming &&
      active &&
      document.visibilityState === "visible"
    ) {
      inputRef.current?.focus();
    }
    wasStreamingRef.current = isStreaming;
  }, [active, isStreaming]);

  if (chatbotConsent === null) {
    return (
      <div
        className="flex min-h-0 flex-1 items-center justify-center text-sm text-mut"
        role="status"
      >
        Chargement de l’assistant…
      </div>
    );
  }

  if (!chatbotConsent) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center p-5">
        <div className="max-w-sm text-center">
          <div
            className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-white/[0.13] bg-white/[0.06] text-ink"
            aria-hidden="true"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="mt-4 text-sm font-semibold text-ink">
            Autorisez le chatbot pour démarrer
          </p>
          <p className="mt-2 text-xs leading-5 text-mut">
            Votre choix de consentement est nécessaire pour utiliser
            l&apos;assistant et mémoriser la conversation dans cet onglet.
          </p>
          <button
            type="button"
            onClick={requestCookiePreferences}
            className="btn-grad mt-5 min-h-11 rounded-full px-5 py-2.5 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Gérer mes préférences
          </button>
        </div>
      </div>
    );
  }

  if (!isHistoryReady) {
    return (
      <div
        className="flex min-h-0 flex-1 items-center justify-center text-sm text-mut"
        role="status"
      >
        Chargement de la conversation…
      </div>
    );
  }

  const isPage = variant === "page";

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div
        ref={messagesRef}
        role="log"
        aria-label="Conversation avec l’assistant OptimalLogic"
        aria-live="polite"
        aria-relevant="additions text"
        tabIndex={0}
        onScroll={(event) => {
          const viewport = event.currentTarget;
          const distanceFromBottom =
            viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;
          shouldAutoScrollRef.current = distanceFromBottom < 80;
        }}
        className="min-h-0 min-w-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white/70"
      >
        <div className="flex justify-start">
          <div
            className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/[0.07] px-4 py-3 text-sm leading-relaxed text-mut"
            style={{ background: "rgba(26,26,29,0.72)" }}
          >
            Bonjour ! Je suis l&apos;assistant OptimalLogic. Comment puis-je vous
            aider ?
          </div>
        </div>

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 [overflow-wrap:anywhere] ${
                message.role === "user"
                  ? "rounded-tr-sm text-sm text-white"
                  : "rounded-tl-sm border border-white/[0.07] text-ink"
              }`}
              style={
                message.role === "user"
                  ? { background: "var(--grad)" }
                  : { background: "rgba(26,26,29,0.72)" }
              }
            >
              {message.content === "" && message.role === "assistant" ? (
                <span
                  className="flex items-center gap-1"
                  role="status"
                  aria-label="L’assistant rédige une réponse"
                >
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      aria-hidden="true"
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-mut"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </span>
              ) : message.role === "assistant" ? (
                renderAssistantContent(
                  message.content,
                  (choice) => void sendMessage(choice),
                  isStreaming,
                  variant,
                )
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void sendMessage(input);
        }}
        className={
          isPage
            ? "shrink-0 border-t border-white/[0.07] px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3"
            : "flex-shrink-0 border-t border-white/[0.07] p-3"
        }
      >
        <label htmlFor={inputId} className="sr-only">
          Votre question
        </label>
        <div className="flex min-w-0 items-center gap-2">
          <input
            id={inputId}
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Votre question..."
            disabled={isStreaming}
            autoComplete="off"
            className={`min-w-0 flex-1 rounded-xl border border-white/[0.13] bg-[rgba(26,26,29,0.72)] px-3.5 text-ink outline-none placeholder:text-mut-2 focus:border-white/35 disabled:opacity-50 ${
              isPage ? "min-h-11 py-2.5 text-base" : "py-2 text-sm"
            }`}
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            aria-label="Envoyer le message"
            className={`grid flex-shrink-0 place-items-center rounded-full text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-40 ${
              isPage ? "h-11 w-11" : "h-9 w-9"
            }`}
            style={{ background: "var(--grad)" }}
          >
            <svg
              aria-hidden="true"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
