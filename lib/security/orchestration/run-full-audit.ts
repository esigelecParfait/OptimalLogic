import { NotImplementedError } from "@/lib/security/errors/not-implemented-error";
import type { AuditRequest, SecurityAuditResult } from "@/lib/security/types/audit";

export async function runFullAudit(request: AuditRequest): Promise<SecurityAuditResult> {
  void request;
  throw new NotImplementedError(
    "L'orchestration d'audit complet n'est pas encore implementee.",
  );
}
