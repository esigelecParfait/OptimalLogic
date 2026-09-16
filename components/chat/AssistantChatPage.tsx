"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarCheck, MessagesSquare, ShieldCheck } from "lucide-react";
import AssistantChatCore from "@/components/chat/AssistantChatCore";

const helpPoints = [
  {
    title: "L’IA répond d’abord",
    description: "Elle clarifie le besoin et propose la prochaine étape utile.",
    icon: MessagesSquare,
  },
  {
    title: "Un humain reste disponible",
    description: "Une demande sensible ou spécifique peut être reprise par notre équipe.",
    icon: ShieldCheck,
  },
  {
    title: "Aucun espace client requis",
    description: "Vous échangez ici, puis choisissez librement contact ou rendez-vous.",
    icon: CalendarCheck,
  },
];

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
    <main className="fixed inset-0 z-[200] flex h-dvh w-full min-w-0 max-w-full flex-col overflow-hidden bg-[var(--color-canvas)]">
      <header className="shrink-0 border-b border-[var(--color-border-subtle)] bg-[rgba(8,10,9,0.92)] pt-[env(safe-area-inset-top)] backdrop-blur-xl">
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
              <span className="h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden="true" />
              Réponse en quelques secondes
            </p>
          </div>

          <span aria-hidden="true" />
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(20rem,0.72fr)_minmax(31rem,1.28fr)]">
        <aside className="relative hidden overflow-hidden border-r border-[var(--color-border-subtle)] lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-36 top-10 h-96 w-96 rounded-full bg-[rgba(103,242,160,0.1)] blur-[110px]"
          />

          <div className="relative max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-action)]">
              Aide guidée
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[var(--color-text)]">
              Trouver la bonne réponse, sans parcourir des menus complexes.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[var(--color-text-muted)]">
              Décrivez votre activité ou votre blocage. L’assistant vous aide à choisir
              une offre, préparer une demande ou joindre la bonne personne.
            </p>

            <div className="mt-10 grid gap-3">
              {helpPoints.map(({ title, description, icon: Icon }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-[1.25rem] border border-[var(--color-border-subtle)] bg-[var(--color-surface-glass)] p-4 shadow-[var(--shadow-inset)]"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-action)] text-[var(--color-action-contrast)]">
                    <Icon aria-hidden="true" size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-text)]">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-action)] px-5 py-3 text-sm font-semibold text-[var(--color-action-contrast)] transition hover:bg-[var(--color-action-hover)]"
            >
              Parler à un humain
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link
              href="/prise-de-rdv"
              className="inline-flex items-center rounded-full border border-[var(--color-border)] px-5 py-3 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-border-strong)] hover:bg-white/[0.04]"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </aside>

        <section
          aria-label="Conversation avec l’assistant OptimalLogic"
          className="flex min-h-0 flex-col bg-[var(--color-surface)]"
        >
          <AssistantChatCore variant="page" />
        </section>
      </div>
    </main>
  );
}
