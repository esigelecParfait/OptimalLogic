import type {
  AuditEnvironment,
  AuditRequest,
  AuditType,
} from "@/lib/security/types/audit";

export interface AuditRequestValidationResult {
  valid: boolean;
  data?: AuditRequest;
  error?: string;
}

const AUDIT_TYPES = ["quick", "full", "client_delivery", "critical"] as const;
const ENVIRONMENTS = ["local", "staging", "production"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isAuditType(value: unknown): value is AuditType {
  return typeof value === "string" && AUDIT_TYPES.includes(value as AuditType);
}

function isAuditEnvironment(value: unknown): value is AuditEnvironment {
  return typeof value === "string" && ENVIRONMENTS.includes(value as AuditEnvironment);
}

export function validateAuditRequest(input: unknown): AuditRequestValidationResult {
  if (!isRecord(input)) {
    return { valid: false, error: "Le corps JSON est invalide." };
  }

  const allowedKeys = new Set([
    "target_url",
    "audit_type",
    "environment",
    "authorization_confirmed",
  ]);
  const unknownKey = Object.keys(input).find((key) => !allowedKeys.has(key));
  if (unknownKey) {
    return { valid: false, error: "La requete contient un champ non autorise." };
  }

  if (typeof input.target_url !== "string" || input.target_url.trim().length === 0) {
    return { valid: false, error: "target_url est obligatoire." };
  }

  if (input.target_url.length > 2048) {
    return { valid: false, error: "target_url est trop long." };
  }

  if (input.authorization_confirmed !== true) {
    return {
      valid: false,
      error: "authorization_confirmed doit etre explicitement vrai.",
    };
  }

  const auditType = input.audit_type ?? "quick";
  if (!isAuditType(auditType)) {
    return { valid: false, error: "audit_type est invalide." };
  }

  const environment = input.environment ?? "production";
  if (!isAuditEnvironment(environment)) {
    return { valid: false, error: "environment est invalide." };
  }

  return {
    valid: true,
    data: {
      target_url: input.target_url.trim(),
      audit_type: auditType,
      environment,
      authorization_confirmed: true,
    },
  };
}
