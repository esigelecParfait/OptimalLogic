"use client";

import { useState } from "react";

const models = [
  {
    id: 1,
    label: "Modèle 1",
    description: "Design original — Clean & Minimal",
    url: "/preview/modele-1",
    color: "bg-slate-100 text-slate-700",
    dot: "bg-slate-400",
  },
  {
    id: 2,
    label: "Modèle 2",
    description: "Neofolio — Blanc, pill buttons, curseur",
    url: "/preview/modele-2",
    color: "bg-gray-900 text-white",
    dot: "bg-emerald-400",
  },
  {
    id: 3,
    label: "Modèle 3",
    description: "Saazai — Violet, gradient, Inter Display",
    url: "/preview/modele-3",
    color: "bg-purple-100 text-purple-900",
    dot: "bg-purple-500",
  },
  {
    id: 4,
    label: "Modèle 4",
    description: "Arrow — Dark space, lime green, starfield",
    url: "/preview/modele-4",
    color: "bg-lime-400 text-black",
    dot: "bg-lime-400",
  },
];

export default function ComparerPage() {
  const [focus, setFocus] = useState<number | null>(null);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const visibleModels = focus !== null ? models.filter((m) => m.id === focus) : models;

  return (
    <div className="flex h-screen flex-col bg-gray-950 text-white">
      {/* Barre de contrôle */}
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white"
          >
            ← OptimalLogic
          </a>
          <span className="text-white/20">|</span>
          <span className="text-sm font-black text-white">Comparateur de modèles</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Device toggle */}
          <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5">
            <button
              onClick={() => setDevice("desktop")}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                device === "desktop" ? "bg-white text-gray-900" : "text-white/50 hover:text-white"
              }`}
            >
              🖥 Desktop
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                device === "mobile" ? "bg-white text-gray-900" : "text-white/50 hover:text-white"
              }`}
            >
              📱 Mobile
            </button>
          </div>

          {/* Focus toggle */}
          {focus !== null && (
            <button
              onClick={() => setFocus(null)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              ← Voir tous
            </button>
          )}
        </div>
      </header>

      {/* Grille d'iframes */}
      <div
        className={`flex flex-1 overflow-hidden gap-0 divide-x divide-white/10 ${
          visibleModels.length === 1 ? "" : "grid"
        }`}
        style={{
          gridTemplateColumns: visibleModels.length === 4
            ? "repeat(4, 1fr)"
            : visibleModels.length === 3
            ? "repeat(3, 1fr)"
            : visibleModels.length === 2
            ? "repeat(2, 1fr)"
            : "1fr",
        }}
      >
        {visibleModels.map((model) => (
          <div key={model.id} className="flex flex-col overflow-hidden">
            {/* Étiquette du modèle */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-gray-900 px-4 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${model.dot}`} />
                <span className="text-sm font-black text-white">{model.label}</span>
                <span className="text-xs text-white/40">{model.description}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={model.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-white/50 transition hover:border-white/30 hover:text-white"
                >
                  ↗ Ouvrir
                </a>
                {focus === null && (
                  <button
                    onClick={() => setFocus(model.id)}
                    className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-white/50 transition hover:border-white/30 hover:text-white"
                  >
                    ⛶ Agrandir
                  </button>
                )}
              </div>
            </div>

            {/* iframe */}
            <div className="relative flex-1 bg-white">
              <iframe
                src={model.url}
                className={`h-full border-0 transition-all duration-300 ${
                  device === "mobile" ? "mx-auto shadow-2xl" : "w-full"
                }`}
                style={
                  device === "mobile"
                    ? { width: "390px", height: "100%" }
                    : { width: "100%" }
                }
                title={`Aperçu ${model.label}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Barre de navigation dans les iframes */}
      <footer className="flex shrink-0 items-center justify-center gap-2 border-t border-white/10 bg-gray-950 py-3">
        <span className="text-xs text-white/30">Naviguer vers :</span>
        {[
          { label: "Accueil", path: "" },
          { label: "Tarifs", path: "/tarifs" },
          { label: "Contact", path: "/contact" },
        ].map((page) => (
          <div key={page.label} className="flex gap-1">
            {visibleModels.map((model) => (
              <a
                key={model.id}
                href={`${model.url}${page.path}`}
                target={`frame-${model.id}`}
                className="rounded-md border border-white/10 px-3 py-1 text-xs font-medium text-white/50 transition hover:border-white/30 hover:text-white"
              >
                M{model.id} {page.label}
              </a>
            ))}
          </div>
        ))}
      </footer>
    </div>
  );
}
