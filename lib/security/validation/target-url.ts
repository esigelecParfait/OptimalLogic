export interface TargetUrlValidationResult {
  valid: boolean;
  url?: URL;
  normalizedUrl?: string;
  error?: string;
}

function localhostAllowed(): boolean {
  return process.env.SECURITY_AUDIT_ALLOW_LOCALHOST === "true";
}

export function validateTargetUrl(input: unknown): TargetUrlValidationResult {
  if (typeof input !== "string" || input.trim().length === 0) {
    return { valid: false, error: "L'URL cible est obligatoire." };
  }

  if (input.length > 2048) {
    return { valid: false, error: "L'URL cible est trop longue." };
  }

  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return { valid: false, error: "L'URL cible est invalide." };
  }

  if (url.username || url.password) {
    return {
      valid: false,
      error: "L'URL cible ne doit pas contenir d'identifiants.",
    };
  }

  const isHttps = url.protocol === "https:";
  const isLocalHttp =
    localhostAllowed() &&
    url.protocol === "http:" &&
    ["localhost", "127.0.0.1", "::1"].includes(url.hostname.toLowerCase());

  if (!isHttps && !isLocalHttp) {
    return {
      valid: false,
      error: "L'URL cible doit utiliser le protocole HTTPS.",
    };
  }

  url.hash = "";
  if (
    (url.protocol === "https:" && url.port === "443") ||
    (url.protocol === "http:" && url.port === "80")
  ) {
    url.port = "";
  }

  return {
    valid: true,
    url,
    normalizedUrl: url.toString(),
  };
}
