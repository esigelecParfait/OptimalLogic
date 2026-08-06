"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import AssistantChatCore from "@/components/chat/AssistantChatCore";

const OPEN_STORAGE_KEY = "ol_chat_open";

export default function ChatWidget() {
  const pathname = usePathname();
  if (pathname.startsWith("/espace-client")) return null;

  return <DesktopChatWidget />;
}

function DesktopChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoadedOpenState, setHasLoadedOpenState] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let savedOpenState = false;
    try {
      savedOpenState = sessionStorage.getItem(OPEN_STORAGE_KEY) === "true";
    } catch {
      // Le widget reste fermé si le stockage navigateur est indisponible.
    }

    const timeout = window.setTimeout(() => {
      setIsOpen(savedOpenState);
      setHasLoadedOpenState(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hasLoadedOpenState) return;

    try {
      sessionStorage.setItem(OPEN_STORAGE_KEY, String(isOpen));
    } catch {
      // L'ouverture reste fonctionnelle sans persistance.
    }
  }, [hasLoadedOpenState, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      window.setTimeout(() => launcherRef.current?.focus(), 0);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  function closeWidget() {
    setIsOpen(false);
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  }

  return (
    <>
      {isOpen && (
        <div
          id="desktop-assistant-panel"
          className="fixed bottom-20 right-4 top-28 z-[90] hidden w-[calc(100vw-2rem)] max-w-sm items-end sm:top-24 lg:flex"
        >
          <div className="surface-card glass flex h-full max-h-[520px] min-h-[360px] w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.13] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]">
            <div
              className="flex flex-shrink-0 items-center gap-3 px-5 py-4"
              style={{ background: "var(--grad)" }}
            >
              <div className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Assistant OptimalLogic
                </p>
                <p className="text-[11px] text-white/80">
                  Réponse en quelques secondes
                </p>
              </div>
              <button
                type="button"
                onClick={closeWidget}
                aria-label="Fermer"
                className="ml-auto rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg
                  aria-hidden="true"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <AssistantChatCore active={isOpen} variant="desktop" />
          </div>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-4 right-4 z-50 hidden h-14 w-14 place-items-center rounded-full shadow-[0_18px_40px_-12px_rgba(255,255,255,0.45)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:grid"
        style={{ background: "var(--grad)" }}
        aria-label={isOpen ? "Fermer l'assistant" : "Ouvrir l'assistant"}
        aria-expanded={isOpen}
        aria-controls="desktop-assistant-panel"
      >
        {isOpen ? (
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <>
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="9" cy="10" r="1" fill="white" stroke="none" />
              <circle cx="12" cy="10" r="1" fill="white" stroke="none" />
              <circle cx="15" cy="10" r="1" fill="white" stroke="none" />
            </svg>
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
