export const dynamic = "force-dynamic";

export default function SupportPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">

        {/* Icône chatbot animée */}
        <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-slate-950">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="10" r="1" fill="white" stroke="none" />
            <circle cx="12" cy="10" r="1" fill="white" stroke="none" />
            <circle cx="15" cy="10" r="1" fill="white" stroke="none" />
          </svg>
          {/* Point de statut animé */}
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
          Bientôt disponible
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-slate-950">
          Votre assistant est en cours de déploiement.
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-slate-500">
          Un chatbot de support sera intégré ici pour répondre à vos questions
          directement depuis votre espace client, à tout moment.
        </p>

        {/* Aperçu simulé de conversation */}
        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-5 text-left shadow-sm">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-950">Assistant OptimalLogic</span>
            <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
              En ligne
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-2.5 text-sm text-slate-700">
                Bonjour ! Comment puis-je vous aider aujourd'hui ?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-slate-950 px-4 py-2.5 text-sm text-white opacity-40">
                J'ai une question sur mon abonnement...
              </div>
            </div>
            <div className="flex justify-start">
              <div className="flex max-w-[80%] items-center gap-1.5 rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 opacity-50">
            <span className="flex-1 text-sm text-slate-400">Écrivez votre message...</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          En attendant, contactez-nous à{" "}
          <a
            href="mailto:contact@optimallogic.fr"
            className="font-semibold text-slate-600 underline underline-offset-2 hover:text-slate-950"
          >
            contact@optimallogic.fr
          </a>
        </p>
      </div>
    </div>
  );
}
