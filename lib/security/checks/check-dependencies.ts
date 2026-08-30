import { NotImplementedError } from "@/lib/security/errors/not-implemented-error";
import type { SecurityCheckResult } from "@/lib/security/types/audit";

export async function checkDependenciesSecurity(
  targetUrl: URL,
): Promise<SecurityCheckResult> {
  void targetUrl;
  throw new NotImplementedError(
    "Le controle des dependances n'est pas encore implemente.",
  );
}
