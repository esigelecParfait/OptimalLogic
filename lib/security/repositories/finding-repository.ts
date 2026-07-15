import type { SecurityFinding } from "@/lib/security/types/finding";

export interface StoredFinding extends SecurityFinding {
  id: string;
  auditId: string;
  createdAt: string;
}

export interface FindingRepository {
  saveFindings(auditId: string, findings: SecurityFinding[]): Promise<StoredFinding[]>;
  getFindingsByAuditId(auditId: string): Promise<StoredFinding[]>;
}
