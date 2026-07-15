import { NotImplementedError } from "@/lib/security/errors/not-implemented-error";
import type { SecurityCheckResult } from "@/lib/security/types/audit";

export async function checkFormsSecurity(targetUrl: URL): Promise<SecurityCheckResult> {
  void targetUrl;
  throw new NotImplementedError("Le controle des formulaires n'est pas encore implemente.");
}
