import { preventSsrf } from "@/lib/security/authorization/prevent-ssrf";
import { verifyApiKey } from "@/lib/security/authorization/verify-api-key";
import { verifyAllowedDomain } from "@/lib/security/authorization/verify-domain";
import { checkSecurityHeaders } from "@/lib/security/checks/check-headers";
import { errorResponse, successResponse } from "@/lib/security/http/json-response";
import { validateAuditRequest } from "@/lib/security/validation/audit-request.schema";
import { validateTargetUrl } from "@/lib/security/validation/target-url";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = verifyApiKey(request);
  if (!auth.valid) {
    return errorResponse("UNAUTHORIZED", auth.message, auth.status);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("INVALID_REQUEST", "Le corps JSON est invalide.", 400);
  }

  const auditRequest = validateAuditRequest(body);
  if (!auditRequest.valid || !auditRequest.data) {
    return errorResponse("INVALID_REQUEST", auditRequest.error ?? "La requete est invalide.", 400);
  }

  const target = validateTargetUrl(auditRequest.data.target_url);
  if (!target.valid || !target.url) {
    return errorResponse("INVALID_REQUEST", target.error ?? "L'URL cible est invalide.", 400);
  }

  const domain = verifyAllowedDomain(target.url);
  if (!domain.allowed) {
    return errorResponse("FORBIDDEN_DOMAIN", domain.message ?? "Le domaine cible n'est pas autorise.", 403);
  }

  const ssrf = await preventSsrf(target.url);
  if (!ssrf.safe) {
    return errorResponse("SSRF_BLOCKED", "La cible a ete refusee par la protection SSRF.", 400);
  }

  try {
    const result = await checkSecurityHeaders(target.url);
    return successResponse(result);
  } catch {
    return errorResponse("CHECK_FAILED", "Le controle des headers n'a pas pu etre execute.", 502);
  }
}
