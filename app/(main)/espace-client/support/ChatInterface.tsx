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
        <a key={i} href={link[2]}
          className="inline-flex items-center gap-0.5 font-semibold text-slate-950 underline underline-offset-2 hover:opacity-70">
          {link[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderAssistantContent(
  content: string,
  onChoice: (text: string) => void,
  isStreaming: boolean
) {
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
            <a key={i} href={item.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-950 hover:bg-slate-950 hover:text-white">
              {item.label}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          ) : (
            <button key={i}
              onClick={() => !isStreaming && onChoice(item.label)}
              disabled={isStreaming}
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-950 hover:bg-slate-950 hover:text-white disabled:cursor-default disabled:opacity-50">
              {item.label}
            </button>
          )
        )}
      </div>
    );
  }

  for (const line of lines) {
    // Accepte "- [label](url)" même avec du texte après (on ignore le reste)
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
    <div className="flex h-[calc(100vh-300px)] min-h-[500px] flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center gap-3 border-b border-slate-100 px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-950">Assistant OptimalLogic</p>
          <p className="text-xs text-slate-400">Support client</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          En ligne
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        <div className="flex justify-start">
          <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-sm text-slate-700 leading-relaxed">
            {greeting}
          </div>
        </div>

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[78%] rounded-2xl px-4 py-3 ${
              msg.role === "user"
                ? "rounded-tr-sm bg-slate-950 text-sm text-white"
                : "rounded-tl-sm bg-slate-100 text-slate-800"
            }`}>
              {msg.content === "" && msg.role === "assistant" ? (
                <span className="flex items-center gap-1.5">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${d}ms` }} />
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
      <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
        className="flex-shrink-0 border-t border-slate-100 p-4">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Écrivez votre message..."
            disabled={isStreaming}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-950 focus:bg-white disabled:opacity-50"
          />
          <button type="submit" disabled={!input.trim() || isStreaming}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-slate-400">
          Pour une aide personnalisée :{" "}
          <a href="mailto:contact@optimallogic.fr"
            className="font-medium text-slate-600 underline underline-offset-2 hover:text-slate-950">
            contact@optimallogic.fr
          </a>
        </p>
      </form>
    </div>
  );
}
