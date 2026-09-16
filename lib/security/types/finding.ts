export type FindingSeverity = "critical" | "high" | "medium" | "low" | "info";

export type FindingStatus = "pass" | "fail" | "warning" | "manual_review";

export type FindingCategory =
  | "HEADERS"
  | "HTTPS_TLS"
  | "PUBLIC_PAGES"
  | "FORM_SECURITY"
  | "API_SECURITY"
  | "DEPENDENCIES"
  | "SUPABASE_RLS"
  | "AUTHENTICATION"
  | "AUTHORIZATION"
  | "SECRETS"
  | "ERROR_HANDLING"
  | "RGPD";

export interface SecurityFinding {
  checkId: string;
  category: FindingCategory;
  severity: FindingSeverity;
  status: FindingStatus;
  title: string;
  evidence: string;
  impact: string;
  recommendation: string;
  source?: string;
}
