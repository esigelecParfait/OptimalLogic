import { lookup } from "dns/promises";
import { isIP } from "net";

export interface SsrfProtectionResult {
  safe: boolean;
  reason?: string;
}

const ALLOWED_PORTS = new Set(["", "443"]);
const CLOUD_METADATA_IPV4 = new Set([
  "169.254.169.254",
  "169.254.170.2",
  "100.100.100.200",
]);

function isLocalhost(hostname: string): boolean {
  const normalized = hostname.toLowerCase().replace(/\.$/, "");
  return normalized === "localhost" || normalized.endsWith(".localhost");
}

function isPrivateIpv4(address: string): boolean {
  const parts = address.split(".").map((part) => Number(part));
  if (
    parts.length !== 4 ||
    parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)
  ) {
    return true;
  }

  const [first, second] = parts;
  return (
    first === 10 ||
    first === 127 ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168) ||
    (first === 169 && second === 254) ||
    (first === 100 && second >= 64 && second <= 127) ||
    first === 0 ||
    first >= 224 ||
    CLOUD_METADATA_IPV4.has(address)
  );
}

function isPrivateIpv6(address: string): boolean {
  const normalized = address.toLowerCase();
  const mappedIpv4 = normalized.startsWith("::ffff:")
    ? normalized.slice("::ffff:".length)
    : null;

  if (mappedIpv4 && isIP(mappedIpv4) === 4) {
    return isPrivateIpv4(mappedIpv4);
  }

  return (
    normalized === "::1" ||
    normalized === "::" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    /^fe[89ab][0-9a-f]:/.test(normalized) ||
    normalized === "fe80::a9fe:a9fe"
  );
}

function isBlockedIp(address: string): boolean {
  const family = isIP(address);
  if (family === 4) {
    return isPrivateIpv4(address);
  }

  if (family === 6) {
    return isPrivateIpv6(address);
  }

  return true;
}

export async function preventSsrf(url: URL): Promise<SsrfProtectionResult> {
  if (url.protocol !== "https:") {
    return { safe: false, reason: "Seul le protocole HTTPS est autorise." };
  }

  if (!ALLOWED_PORTS.has(url.port)) {
    return { safe: false, reason: "Le port cible n'est pas autorise." };
  }

  if (url.username || url.password) {
    return {
      safe: false,
      reason: "Les identifiants integres dans l'URL sont interdits.",
    };
  }

  if (isLocalhost(url.hostname)) {
    return { safe: false, reason: "Les noms localhost sont interdits." };
  }

  const directIp = isIP(url.hostname);
  if (directIp && isBlockedIp(url.hostname)) {
    return { safe: false, reason: "L'adresse IP cible est interdite." };
  }

  try {
    const resolvedAddresses = await lookup(url.hostname, { all: true, verbatim: true });
    if (resolvedAddresses.length === 0) {
      return { safe: false, reason: "Le domaine cible ne peut pas etre resolu." };
    }

    const blockedAddress = resolvedAddresses.find((entry) => isBlockedIp(entry.address));
    if (blockedAddress) {
      return {
        safe: false,
        reason: "Le domaine cible pointe vers une adresse interdite.",
      };
    }
  } catch {
    return { safe: false, reason: "Le domaine cible ne peut pas etre verifie." };
  }

  return { safe: true };
}

export const SSRF_PROTECTION_LIMITATIONS =
  "Premiere barriere SSRF: elle bloque les cas internes courants et reverifie les redirections, mais ne remplace pas un filtrage reseau sortant ni une politique DNS dediee.";
