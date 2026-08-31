export interface DomainVerificationResult {
  allowed: boolean;
  hostname: string;
  message?: string;
}

function getAllowedDomains(): Set<string> {
  return new Set(
    (process.env.SECURITY_AUDIT_ALLOWED_DOMAINS ?? "")
      .split(",")
      .map((domain) => domain.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function verifyAllowedDomain(url: URL): DomainVerificationResult {
  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
  const allowedDomains = getAllowedDomains();

  if (allowedDomains.size === 0) {
    return {
      allowed: false,
      hostname,
      message: "Aucun domaine d'audit autorise n'est configure.",
    };
  }

  if (!allowedDomains.has(hostname)) {
    return {
      allowed: false,
      hostname,
      message: "Le domaine cible n'est pas autorise pour les audits.",
    };
  }

  return { allowed: true, hostname };
}
