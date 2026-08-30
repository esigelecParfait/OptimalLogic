"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  COOKIE_CONSENT_UPDATED_EVENT,
  COOKIE_PREFERENCES_STORAGE_KEY,
  DEFAULT_COOKIE_PREFERENCES,
  OPEN_COOKIE_PREFERENCES_EVENT,
  isCookiePreferences,
  type CookiePreferences,
} from "@/lib/cookie-consent";

function applyPreferences(preferences: CookiePreferences) {
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT, { detail: preferences }),
  );
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(
    DEFAULT_COOKIE_PREFERENCES,
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(COOKIE_PREFERENCES_STORAGE_KEY);
    } catch {
      // Le panneau reste disponible lorsque le stockage est bloqué.
    }

    let timeout: number;
    if (!saved) {
      timeout = window.setTimeout(() => setIsVisible(true), 0);
    } else {
      try {
        const parsed: unknown = JSON.parse(saved);
        if (!isCookiePreferences(parsed)) {
          throw new Error("Invalid preferences");
        }
        timeout = window.setTimeout(() => setPreferences(parsed), 0);
        applyPreferences(parsed);
      } catch {
        timeout = window.setTimeout(() => setIsVisible(true), 0);
      }
    }

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    function openPreferences() {
      returnFocusRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setIsVisible(true);
      setIsSettingsOpen(true);
    }

    function syncPreferences(event: StorageEvent) {
      if (event.key !== COOKIE_PREFERENCES_STORAGE_KEY) return;

      try {
        const parsed: unknown = event.newValue ? JSON.parse(event.newValue) : null;
        if (isCookiePreferences(parsed)) setPreferences(parsed);
      } catch {
        // Une valeur invalide dans un autre onglet est ignorée dans le panneau.
      }
    }

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    window.addEventListener("storage", syncPreferences);
    return () => {
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
      window.removeEventListener("storage", syncPreferences);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animationFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isSettingsOpen, isVisible]);

  function savePreferences(nextPreferences: CookiePreferences) {
    try {
      localStorage.setItem(
        COOKIE_PREFERENCES_STORAGE_KEY,
        JSON.stringify(nextPreferences),
      );
    } catch {
      // Le choix reste appliqué pour la session même sans stockage persistant.
    }

    setPreferences(nextPreferences);
    applyPreferences(nextPreferences);
    setIsVisible(false);
    setIsSettingsOpen(false);

    const returnFocusTarget = returnFocusRef.current;
    returnFocusRef.current = null;
    window.setTimeout(() => returnFocusTarget?.focus(), 0);
  }

  function acceptAll() {
    savePreferences({ analytics: true, chatbot: true, marketing: true });
  }

  function rejectAll() {
    savePreferences({ analytics: false, chatbot: false, marketing: false });
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] max-h-dvh overflow-y-auto overscroll-contain px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))] sm:px-6 sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
      <div
        ref={dialogRef}
        role="dialog"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="glass mx-auto max-w-5xl rounded-[1.5rem] border border-white/[0.13] p-5 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)] outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        {!isSettingsOpen ? (
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p id={titleId} className="text-sm font-semibold text-ink">
                Gestion des cookies
              </p>
              <p className="mt-2 text-xs leading-5 text-mut">
                Nous utilisons des cookies nécessaires au fonctionnement du site. Avec
                votre accord, nous pouvons aussi utiliser des cookies de mesure
                d’audience, de chatbot ou de marketing pour améliorer l’expérience et
                suivre les performances.
              </p>
              <a
                href="/cookies"
                className="mt-2 inline-flex text-xs font-semibold text-white underline underline-offset-2"
              >
                En savoir plus
              </a>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={rejectAll}
                className="btn-ghost min-h-11 rounded-full px-4 py-2 text-xs font-semibold"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="btn-ghost min-h-11 rounded-full px-4 py-2 text-xs font-semibold"
              >
                Personnaliser
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="btn-grad min-h-11 rounded-full px-4 py-2 text-xs font-semibold"
              >
                Tout accepter
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <p id={titleId} className="text-sm font-semibold text-ink">
                Préférences cookies
              </p>
              <p className="mt-2 text-xs leading-5 text-mut">
                Les cookies nécessaires sont toujours actifs. Vous pouvez choisir les
                autres catégories.
              </p>
            </div>
            <div className="grid gap-3">
              <div
                className="rounded-2xl border border-white/[0.07] p-4"
                style={{ background: "rgba(26,26,29,0.5)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">Cookies nécessaires</p>
                    <p className="mt-1 text-xs leading-5 text-mut">
                      Indispensables au fonctionnement du site et à la mémorisation de vos
                      choix.
                    </p>
                  </div>
                  <span
                    className="rounded-full px-3 py-1.5 text-[11px] font-semibold text-white"
                    style={{ background: "var(--grad)" }}
                  >
                    Actifs
                  </span>
                </div>
              </div>
              <PreferenceToggle
                title="Mesure d’audience"
                description="Permet de comprendre l’utilisation du site et d’améliorer les pages."
                checked={preferences.analytics}
                onChange={(value) =>
                  setPreferences((current) => ({
                    ...current,
                    analytics: value,
                  }))
                }
              />
              <PreferenceToggle
                title="Chatbot"
                description="Permet d’activer ou de personnaliser certains services liés au chatbot."
                checked={preferences.chatbot}
                onChange={(value) =>
                  setPreferences((current) => ({
                    ...current,
                    chatbot: value,
                  }))
                }
              />
              <PreferenceToggle
                title="Marketing"
                description="Permet de mesurer des campagnes publicitaires ou des conversions."
                checked={preferences.marketing}
                onChange={(value) =>
                  setPreferences((current) => ({
                    ...current,
                    marketing: value,
                  }))
                }
              />
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="btn-ghost min-h-11 rounded-full px-4 py-2 text-xs font-semibold"
              >
                Tout refuser
              </button>
              <button
                type="button"
                onClick={() => savePreferences(preferences)}
                className="btn-grad min-h-11 rounded-full px-4 py-2 text-xs font-semibold"
              >
                Enregistrer mes choix
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="btn-ghost min-h-11 rounded-full px-4 py-2 text-xs font-semibold"
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
  const titleId = useId();

  return (
    <div
      className="rounded-2xl border border-white/[0.07] p-4"
      style={{ background: "rgba(26,26,29,0.5)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p id={titleId} className="text-sm font-semibold text-ink">
            {title}
          </p>
          <p className="mt-1 text-xs leading-5 text-mut">{description}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={titleId}
          onClick={() => onChange(!checked)}
          className="relative h-11 w-12 shrink-0 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-2 h-7 w-12 rounded-full transition"
            style={{
              background: checked ? "var(--grad)" : "rgba(255,255,255,0.15)",
            }}
          />
          <span
            aria-hidden="true"
            className={`absolute top-3 h-5 w-5 rounded-full bg-white transition-all ${
              checked ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
