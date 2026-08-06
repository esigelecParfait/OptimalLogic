export type CookiePreferences = {
  analytics: boolean;
  chatbot: boolean;
  marketing: boolean;
};

export const COOKIE_PREFERENCES_STORAGE_KEY = "cookie-preferences-v1";
export const COOKIE_CONSENT_UPDATED_EVENT = "cookie-consent-updated";
export const OPEN_COOKIE_PREFERENCES_EVENT = "open-cookie-preferences";

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  analytics: false,
  chatbot: false,
  marketing: false,
};

export function isCookiePreferences(value: unknown): value is CookiePreferences {
  if (typeof value !== "object" || value === null) return false;

  const preferences = value as Record<string, unknown>;
  return (
    typeof preferences.analytics === "boolean" &&
    typeof preferences.chatbot === "boolean" &&
    typeof preferences.marketing === "boolean"
  );
}
