import { describe, expect, it } from "vitest";

import { calculateSecurityScore } from "@/lib/security/scoring/calculate-score";
import type { SecurityFinding } from "@/lib/security/types/finding";

function finding(
  severity: SecurityFinding["severity"],
  status: SecurityFinding["status"],
): SecurityFinding {
  return {
    checkId: `${severity}-${status}`,
    category: "HEADERS",
    severity,
    status,
    title: "Contrôle",
    evidence: "Preuve de test",
    impact: "Impact de test",
    recommendation: "Correction de test",
  };
}

describe("calculateSecurityScore", () => {
  it("ne pénalise pas les contrôles réussis", () => {
    expect(calculateSecurityScore([finding("critical", "pass")])).toBe(100);
  });

  it("applique les poids de sévérité aux constats non réussis", () => {
    expect(
      calculateSecurityScore([
        finding("critical", "fail"),
        finding("high", "warning"),
        finding("low", "manual_review"),
      ]),
    ).toBe(53);
  });

  it("borne le score à zéro", () => {
    expect(
      calculateSecurityScore([
        finding("critical", "fail"),
        finding("critical", "fail"),
        finding("critical", "fail"),
        finding("high", "fail"),
      ]),
    ).toBe(0);
  });
});
