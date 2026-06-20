"use client";

import { useEffect, useRef, useState } from "react";

const CLIENT_ID = "550e8400-e29b-41d4-a716-446655440000";
const SESSION_LIMIT = 20;

type Message = { role: "user" | "assistant"; content: string };
type ChoiceItem = { label: string; href: string | null };

function renderText(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={i} href={link[2]} className="font-semibold underline underline-offset-2 hover:opacity-70">{link[1]}</a>;
    return <span key={i}>{part}</span>;
  });
}

function renderContent(content: string, onChoice: (t: string) => void, isStreaming: boolean) {
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
      <div key={result.length} className="mt-2.5 flex flex-wrap gap-1.5">
        {items.map((item, i) =>
          item.href ? (
            <a key={i} href={item.href} className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-semibold text-amber-900 transition hover:bg-amber-900 hover:text-white hover:border-amber-900">
              {item.label}
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </a>
          ) : (
            <button key={i} onClick={() => !isStreaming && onChoice(item.label)} disabled={isStreaming}
              className="rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-semibold text-amber-900 transition hover:bg-amber-900 hover:text-white hover:border-amber-900 disabled:opacity-50">
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
  flushText(); flushChoices();
  return <div className="space-y-2 text-sm">{result}</div>;
}

export default function ChatWidgetLeon() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (isOpen) bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isOpen]);
  useEffect(() => {
    if (isOpen) { const t = setTimeout(() => inputRef.current?.focus(), 100); return () => clearTimeout(t); }
  }, [isOpen]);

  async function sendMessage(text: string) {
    if (!text.trim() || isStreaming || sessionCount >= SESSION_LIMIT) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const nextMessages = [...messages, userMsg];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);
    setSessionCount((c) => c + 1);

    try {
      const res = await fetch(`/api/chat/${CLIENT_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, sessionCount }),
      });

      if (!res.ok || !res.body) {
        setMessages((prev) => { const u = [...prev]; u[u.length - 1] = { role: "assistant", content: "Une erreur est survenue. Appelez-nous au 04 78 62 33 17." }; return u; });
        return;
      }

      const reader = res.body.getReader();
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
            if (parsed.text) setMessages((prev) => { const u = [...prev]; u[u.length - 1] = { role: "assistant", content: u[u.length - 1].content + parsed.text }; return u; });
          } catch { /* incomplete chunk */ }
        }
      }
    } catch {
      setMessages((prev) => { const u = [...prev]; u[u.length - 1] = { role: "assistant", content: "Erreur de connexion. Contactez-nous au 04 78 62 33 17." }; return u; });
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  }

  const limitReached = sessionCount >= SESSION_LIMIT;

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm">
          <div className="flex h-[480px] flex-col overflow-hidden rounded-[1.75rem] border border-amber-100 bg-white shadow-2xl">
            <div className="flex flex-shrink-0 items-center gap-3 bg-amber-900 px-5 py-4">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white leading-tight">Les Délices de Léon</p>
                <p className="text-[11px] text-amber-200 truncate">Boulangerie artisanale · Lyon 3e</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="ml-auto flex-shrink-0 rounded-full p-1.5 text-amber-200 hover:bg-white/10 hover:text-white">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5 bg-amber-50/30">
              <div className="flex justify-start">
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white border border-amber-100 px-3.5 py-2.5 text-sm text-slate-700 shadow-sm">
                  Bonjour ! Je suis l'assistant des Délices de Léon. Comment puis-je vous aider ?
                </div>
              </div>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-sm ${msg.role === "user" ? "rounded-tr-sm bg-amber-900 text-sm text-white" : "rounded-tl-sm bg-white border border-amber-100 text-slate-700"}`}>
                    {msg.content === "" && msg.role === "assistant" ? (
                      <span className="flex items-center gap-1">
                        {[0, 150, 300].map((d) => <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-400" style={{ animationDelay: `${d}ms` }} />)}
                      </span>
                    ) : msg.role === "assistant" ? renderContent(msg.content, sendMessage, isStreaming) : msg.content}
                  </div>
                </div>
              ))}
              {limitReached && <div className="text-center text-xs text-slate-400 pt-2">Fin de session. <a href="tel:0478623317" className="font-semibold text-amber-900">04 78 62 33 17</a></div>}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex-shrink-0 border-t border-amber-100 bg-white p-3">
              <div className="flex items-center gap-2">
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder={limitReached ? "Session terminée" : "Votre question..."} disabled={isStreaming || limitReached}
                  className="flex-1 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-amber-900 focus:bg-white disabled:opacity-50" />
                <button type="submit" disabled={!input.trim() || isStreaming || limitReached}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-900 text-white transition hover:bg-amber-800 disabled:opacity-40">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-900 shadow-lg transition hover:scale-105 hover:bg-amber-800"
        aria-label={isOpen ? "Fermer" : "Ouvrir l'assistant"}>
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
          </>
        )}
      </button>
    </>
  );
}
