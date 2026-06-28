"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Message = { role: "user" | "assistant"; content: string };
type ChoiceItem = { label: string; href: string | null };

function renderText(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={i} href={link[2]} className="inline-flex items-center gap-0.5 font-semibold text-cyan underline underline-offset-2 hover:opacity-80">
          {link[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderAssistantContent(content: string, onChoice: (text: string) => void, isStreaming: boolean) {
  const lines = content.split("\n");
  const result: React.ReactNode[] = [];
  let textBuf: string[] = [];
  let choiceBuf: ChoiceItem[] = [];

  function flushText() {
    const text = textBuf.join("\n").trim();
    textBuf = [];
    if (!text) return;
    result.push(
      <p key={result.length} className="leading-relaxed">
        {renderText(text)}
      </p>
    );
  }

  function flushChoices() {
    if (!choiceBuf.length) return;
    const items = [...choiceBuf];
    choiceBuf = [];
    result.push(
      <div key={result.length} className="mt-3 flex flex-wrap gap-2">
        {items.map((item, i) =>
          item.href ? (
            <a key={i} href={item.href} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.13] bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-ink transition hover:border-indigo hover:bg-[rgba(124,92,255,0.18)]">
              {item.label}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </a>
          ) : (
            <button key={i} onClick={() => !isStreaming && onChoice(item.label)} disabled={isStreaming} className="inline-flex items-center rounded-full border border-white/[0.13] bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-ink transition hover:border-indigo hover:bg-[rgba(124,92,255,0.18)] disabled:cursor-default disabled:opacity-50">
              {item.label}
            </button>
          )
        )}
      </div>
    );
  }

  for (const line of lines) {
    const linkChoice = line.match(/^-\s+\[([^\]]+)\]\(([^)]+)\)/);
    if (linkChoice) { flushText(); choiceBuf.push({ label: linkChoice[1], href: linkChoice[2] }); continue; }
    const msgChoice = line.match(/^-\s+(.+)$/);
    if (msgChoice) { flushText(); choiceBuf.push({ label: msgChoice[1].trim(), href: null }); continue; }
    flushChoices();
    textBuf.push(line);
  }
  flushText();
  flushChoices();

  return <div className="space-y-2 text-sm">{result}</div>;
}

export default function ChatWidget() {
  const pathname = usePathname();
  if (pathname.startsWith("/espace-client")) return null;
  return <ChatWidgetContent />;
}

function ChatWidgetContent() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem("ol_chat_open") === "true";
    } catch {
      return false;
    }
  });
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const savedMessages = sessionStorage.getItem("ol_chat_messages");
      return savedMessages ? JSON.parse(savedMessages) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { sessionStorage.setItem("ol_chat_messages", JSON.stringify(messages)); } catch { /* ignore */ }
  }, [messages]);

  useEffect(() => {
    try { sessionStorage.setItem("ol_chat_open", String(isOpen)); } catch { /* ignore */ }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  async function sendMessage(text: string) {
    if (!text.trim() || isStreaming) return;
    const userMessage: Message = { role: "user", content: text.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok || !response.body) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: "Une erreur est survenue. Contactez-nous à contact@optimallogic.fr" };
          return updated;
        });
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data) as { text?: string };
            if (parsed.text) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: updated[updated.length - 1].content + parsed.text };
                return updated;
              });
            }
          } catch { /* incomplete chunk */ }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: "Une erreur est survenue. Contactez-nous à contact@optimallogic.fr" };
        return updated;
      });
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 top-28 z-[90] flex w-[calc(100vw-2rem)] max-w-sm items-end sm:top-24">
          <div className="surface-card glass flex h-full max-h-[520px] min-h-[360px] w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.13] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]">
            {/* Header */}
            <div className="flex flex-shrink-0 items-center gap-3 px-5 py-4" style={{ background: "var(--grad)" }}>
              <div className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Assistant OptimalLogic</p>
                <p className="text-[11px] text-white/80">Réponse en quelques secondes</p>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Fermer" className="ml-auto rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/[0.07] px-4 py-3 text-sm leading-relaxed text-mut" style={{ background: "rgba(16,20,42,0.7)" }}>
                  Bonjour ! Je suis l&apos;assistant OptimalLogic. Comment puis-je vous aider ?
                </div>
              </div>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "rounded-tr-sm text-sm text-white" : "rounded-tl-sm border border-white/[0.07] text-ink"}`}
                    style={msg.role === "user" ? { background: "var(--grad)" } : { background: "rgba(16,20,42,0.7)" }}
                  >
                    {msg.content === "" && msg.role === "assistant" ? (
                      <span className="flex items-center gap-1">
                        {[0, 150, 300].map((d) => (
                          <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-mut" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </span>
                    ) : msg.role === "assistant" ? (
                      renderAssistantContent(msg.content, sendMessage, isStreaming)
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex-shrink-0 border-t border-white/[0.07] p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                  placeholder="Votre question..."
                  disabled={isStreaming}
                  className="flex-1 rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.7)] px-3.5 py-2 text-sm text-ink outline-none placeholder:text-mut-2 focus:border-indigo disabled:opacity-50"
                />
                <button type="submit" disabled={!input.trim() || isStreaming} className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40" style={{ background: "var(--grad)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bouton flottant */}
      <button onClick={() => setIsOpen((o) => !o)} className="fixed bottom-4 right-4 z-50 grid h-14 w-14 place-items-center rounded-full shadow-[0_18px_40px_-12px_rgba(124,92,255,0.9)] transition hover:scale-105" style={{ background: "var(--grad)" }} aria-label={isOpen ? "Fermer l'assistant" : "Ouvrir l'assistant"}>
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><circle cx="9" cy="10" r="1" fill="white" stroke="none" /><circle cx="12" cy="10" r="1" fill="white" stroke="none" /><circle cx="15" cy="10" r="1" fill="white" stroke="none" /></svg>
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald" />
            </span>
          </>
        )}
      </button>
    </>
  );
}
