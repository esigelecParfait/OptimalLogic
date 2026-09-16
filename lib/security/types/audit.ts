import type { SecurityFinding } from "./finding";

export type AuditType = "quick" | "full" | "client_delivery" | "critical";

export type AuditEnvironment = "local" | "staging" | "production";

export type AuditStatus = "queued" | "running" | "completed" | "failed";

export type SecurityCheckStatus =
  "pass" | "fail" | "warning" | "manual_review" | "not_implemented";

export interface SecurityCheckSummary {
  total: number;
  passed: number;
  failed: number;
  warnings: number;
  manualReview: number;
}

export interface SecurityCheckResult {
  checkName: string;
  target: string;
  executedAt: string;
  status: SecurityCheckStatus;
  score: number;
  summary: SecurityCheckSummary;
  findings: SecurityFinding[];
}

export interface SecurityAuditResult {
  auditId?: string;
  target: string;
  auditType: AuditType;
  environment: AuditEnvironment;
  status: AuditStatus;
  executedAt: string;
  score: number;
  checks: SecurityCheckResult[];
  findings: SecurityFinding[];
}

export interface AuditRequest {
  target_url: string;
  audit_type: AuditType;
  environment: AuditEnvironment;
  authorization_confirmed: true;
}
