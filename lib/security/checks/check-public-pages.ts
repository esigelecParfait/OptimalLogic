import { NotImplementedError } from "@/lib/security/errors/not-implemented-error";
import type { SecurityCheckResult } from "@/lib/security/types/audit";

export async function checkPublicPages(targetUrl: URL): Promise<SecurityCheckResult> {
  void targetUrl;
  throw new NotImplementedError(
    "Le controle des pages publiques n'est pas encore implemente.",
  );
}
