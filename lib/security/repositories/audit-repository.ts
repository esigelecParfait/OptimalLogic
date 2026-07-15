import type {
  AuditEnvironment,
  AuditStatus,
  AuditType,
  SecurityAuditResult,
} from "@/lib/security/types/audit";

export interface CreateAuditInput {
  target: string;
  auditType: AuditType;
  environment: AuditEnvironment;
}

export interface StoredAudit {
  id: string;
  target: string;
  auditType: AuditType;
  environment: AuditEnvironment;
  status: AuditStatus;
  createdAt: string;
  updatedAt: string;
  result?: SecurityAuditResult;
}

export interface AuditRepository {
  createAudit(input: CreateAuditInput): Promise<StoredAudit>;
  updateAuditStatus(auditId: string, status: AuditStatus): Promise<void>;
  saveAuditResult(auditId: string, result: SecurityAuditResult): Promise<void>;
  getAudit(auditId: string): Promise<StoredAudit | null>;
}
