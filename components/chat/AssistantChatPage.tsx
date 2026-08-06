"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AssistantChatCore from "@/components/chat/AssistantChatCore";

export default function AssistantChatPage() {
  const router = useRouter();

  useEffect(() => {
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.documentElement.style.overflow = previousDocumentOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
    };
  }, []);

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  }

  return (
    <main className="fixed inset-0 z-[200] flex h-dvh w-full min-w-0 max-w-full flex-col overflow-hidden bg-bg">
      <header className="shrink-0 border-b border-white/[0.09] bg-[#0d0d0f]/95 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="grid min-h-14 grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center px-2">
          <button
            type="button"
            onClick={goBack}
            aria-label="Retour à la page précédente"
            className="grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>

          <div className="min-w-0 px-2 text-center">
            <h1 className="truncate font-display text-[15px] font-semibold text-ink">
              Assistant OptimalLogic
            </h1>
            <p className="mt-0.5 flex items-center justify-center gap-1.5 text-[11px] text-mut">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald"
                aria-hidden="true"
              />
              Réponse en quelques secondes
            </p>
          </div>

          <span aria-hidden="true" />
        </div>
      </header>

      <AssistantChatCore variant="page" />
    </main>
  );
}
