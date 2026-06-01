"use client";

import { useState } from "react";

const CAL_URL = "https://cal.com/digit-soluce/test?embed=true";

export default function CalEmbed() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-[2rem] bg-white p-4 shadow-xl shadow-black/5 ring-1 ring-black/5">
      {isLoading && (
        <div className="absolute inset-4 z-10 flex flex-col items-center justify-center rounded-[1.5rem] bg-[#f7f4ef] px-6 text-center">
          <div className="mb-6 h-14 w-14 animate-pulse rounded-full bg-black/10" />

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Chargement du calendrier
          </p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-black">
            Préparation des créneaux disponibles...
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-600">
            Nous chargeons l’agenda de réservation pour vous permettre de
            choisir le meilleur moment pour votre appel découverte.
          </p>

          <div className="mt-8 grid w-full max-w-xl gap-3">
            <div className="h-12 animate-pulse rounded-2xl bg-black/5" />
            <div className="h-12 animate-pulse rounded-2xl bg-black/5" />
            <div className="h-12 animate-pulse rounded-2xl bg-black/5" />
          </div>
        </div>
      )}

      <iframe
        src={CAL_URL}
        title="Prendre rendez-vous avec DigitSoluce"
        loading="eager"
        onLoad={() => setIsLoading(false)}
        className={`h-[750px] w-full rounded-[1.5rem] transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}