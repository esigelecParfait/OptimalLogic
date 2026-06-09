"use client";

import { useEffect, useState } from "react";

type CookiePreferences = {
  analytics: boolean;
  chatbot: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cookie-preferences-v1";

const defaultPreferences: CookiePreferences = {
  analytics: false,
  chatbot: false,
  marketing: false,
};

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  function applyPreferences(nextPreferences: CookiePreferences) {
    window.dispatchEvent(
      new CustomEvent("cookie-consent-updated", {
        detail: nextPreferences,
      })
    );
  }

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      window.setTimeout(() => setIsVisible(true), 0);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as CookiePreferences;
      window.setTimeout(() => setPreferences(parsed), 0);
      applyPreferences(parsed);
    } catch {
      window.setTimeout(() => setIsVisible(true), 0);
    }
  }, []);

  useEffect(() => {
    function openPreferences() {
      setIsVisible(true);
      setIsSettingsOpen(true);
    }

    window.addEventListener("open-cookie-preferences", openPreferences);

    return () => {
      window.removeEventListener("open-cookie-preferences", openPreferences);
    };
  }, []);

  function savePreferences(nextPreferences: CookiePreferences) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPreferences));
    setPreferences(nextPreferences);
    applyPreferences(nextPreferences);
    setIsVisible(false);
    setIsSettingsOpen(false);
  }

  function acceptAll() {
    savePreferences({
      analytics: true,
      chatbot: true,
      marketing: true,
    });
  }

  function rejectAll() {
    savePreferences({
      analytics: false,
      chatbot: false,
      marketing: false,
    });
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-5xl rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-2xl shadow-black/20">
        {!isSettingsOpen ? (
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-black">Gestion des cookies</p>
              <p className="mt-2 text-xs leading-5 text-black/65">
                Nous utilisons des cookies nécessaires au fonctionnement du site. Avec votre accord,
                nous pouvons aussi utiliser des cookies de mesure d’audience, de chatbot ou de marketing
                pour améliorer l’expérience et suivre les performances.
              </p>
              <a href="/cookies" className="mt-2 inline-flex text-xs font-semibold text-black underline">
                En savoir plus
              </a>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-black/15 px-4 py-2 text-xs font-semibold text-black transition hover:bg-black hover:text-white"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="rounded-full border border-black/15 px-4 py-2 text-xs font-semibold text-black transition hover:bg-black hover:text-white"
              >
                Personnaliser
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-black/85"
              >
                Tout accepter
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <p className="text-sm font-semibold text-black">Préférences cookies</p>
              <p className="mt-2 text-xs leading-5 text-black/65">
                Les cookies nécessaires sont toujours actifs. Vous pouvez choisir les autres catégories.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl bg-[#f7f4ef] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-black">Cookies nécessaires</p>
                    <p className="mt-1 text-xs leading-5 text-black/60">
                      Indispensables au fonctionnement du site et à la mémorisation de vos choix.
                    </p>
                  </div>
                  <span className="rounded-full bg-black px-3 py-1.5 text-[11px] font-semibold text-white">
                    Actifs
                  </span>
                </div>
              </div>

              <PreferenceToggle
                title="Mesure d’audience"
                description="Permet de comprendre l’utilisation du site et d’améliorer les pages."
                checked={preferences.analytics}
                onChange={(value) => setPreferences((current) => ({ ...current, analytics: value }))}
              />

              <PreferenceToggle
                title="Chatbot"
                description="Permet d’activer ou de personnaliser certains services liés au chatbot."
                checked={preferences.chatbot}
                onChange={(value) => setPreferences((current) => ({ ...current, chatbot: value }))}
              />

              <PreferenceToggle
                title="Marketing"
                description="Permet de mesurer des campagnes publicitaires ou des conversions."
                checked={preferences.marketing}
                onChange={(value) => setPreferences((current) => ({ ...current, marketing: value }))}
              />
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-full border border-black/15 px-4 py-2 text-xs font-semibold text-black transition hover:bg-black hover:text-white"
              >
                Tout refuser
              </button>
              <button
                type="button"
                onClick={() => savePreferences(preferences)}
                className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-black/85"
              >
                Enregistrer mes choix
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full border border-black/15 px-4 py-2 text-xs font-semibold text-black transition hover:bg-black hover:text-white"
              >
                Tout accepter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PreferenceToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="rounded-2xl bg-[#f7f4ef] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-black">{title}</p>
          <p className="mt-1 text-xs leading-5 text-black/60">{description}</p>
        </div>

        <button
          type="button"
          onClick={() => onChange(!checked)}
          className={`relative h-7 w-12 rounded-full transition ${
            checked ? "bg-black" : "bg-black/20"
          }`}
          aria-pressed={checked}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
              checked ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
