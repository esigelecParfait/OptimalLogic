"use client";

import { useEffect, useRef, useState } from "react";

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
    result.push(<p key={result.length} className="leading-relaxed">{renderText(text)}</p>);
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

export default function ChatInterface({ firstName }: { firstName: string | null }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || isStreaming) return;
    const userMessage: Message = { role: "user", content: text.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok || !response.body) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: "Une erreur est survenue. Veuillez réessayer ou contacter contact@optimallogic.fr" };
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
        updated[updated.length - 1] = { role: "assistant", content: "Une erreur est survenue. Veuillez réessayer ou contacter contact@optimallogic.fr" };
        return updated;
      });
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  }

  const greeting = firstName
    ? `Bonjour ${firstName} ! Comment puis-je vous aider aujourd'hui ?`
    : "Bonjour ! Comment puis-je vous aider aujourd'hui ?";

  return (
    <div className="surface-card flex h-[calc(100vh-300px)] min-h-[500px] flex-col overflow-hidden rounded-[28px]">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center gap-3 border-b border-white/[0.07] px-6 py-4">
        <div className="grid h-9 w-9 place-items-center rounded-full" style={{ background: "var(--grad)" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Assistant OptimalLogic</p>
          <p className="text-xs text-mut-2">Support client</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-emerald" style={{ background: "rgba(46,230,168,0.1)" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> En ligne
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        <div className="flex justify-start">
          <div className="max-w-[78%] rounded-2xl rounded-tl-sm border border-white/[0.07] px-4 py-3 text-sm leading-relaxed text-mut" style={{ background: "rgba(16,20,42,0.7)" }}>{greeting}</div>
        </div>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[78%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "rounded-tr-sm text-sm text-white" : "rounded-tl-sm border border-white/[0.07] text-ink"}`}
              style={msg.role === "user" ? { background: "var(--grad)" } : { background: "rgba(16,20,42,0.7)" }}
            >
              {msg.content === "" && msg.role === "assistant" ? (
                <span className="flex items-center gap-1.5">
                  {[0, 150, 300].map((d) => (<span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-mut" style={{ animationDelay: `${d}ms` }} />))}
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
      <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex-shrink-0 border-t border-white/[0.07] p-4">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Écrivez votre message..."
            disabled={isStreaming}
            className="flex-1 rounded-xl border border-white/[0.13] bg-[rgba(16,20,42,0.7)] px-4 py-2.5 text-sm text-ink outline-none placeholder:text-mut-2 focus:border-indigo disabled:opacity-50"
          />
          <button type="submit" disabled={!input.trim() || isStreaming} className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40" style={{ background: "var(--grad)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-mut-2">
          Pour une aide personnalisée : <a href="mailto:contact@optimallogic.fr" className="font-medium text-cyan underline underline-offset-2 hover:opacity-80">contact@optimallogic.fr</a>
        </p>
      </form>
    </div>
  );
}
