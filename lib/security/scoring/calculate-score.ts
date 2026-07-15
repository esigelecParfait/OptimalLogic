import type { SecurityFinding } from "@/lib/security/types/finding";
import { SEVERITY_WEIGHTS } from "./severity-weights";

/**
 * Internal score only: starts at 100 and subtracts deterministic penalties for
 * non-passing findings. It is not a certification of security.
 */
export function calculateSecurityScore(findings: SecurityFinding[]): number {
  const penalty = findings.reduce((total, finding) => {
    if (finding.status === "pass") {
      return total;
    }

    return total + SEVERITY_WEIGHTS[finding.severity];
  }, 0);

  return Math.max(0, Math.min(100, 100 - penalty));
}
