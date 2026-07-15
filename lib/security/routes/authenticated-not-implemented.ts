import { verifyApiKey } from "@/lib/security/authorization/verify-api-key";
import { errorResponse, notImplementedResponse } from "@/lib/security/http/json-response";

export function authenticatedNotImplemented(request: Request, message: string): Response {
  const auth = verifyApiKey(request);

  if (!auth.valid) {
    return errorResponse("UNAUTHORIZED", auth.message, auth.status);
  }

  return notImplementedResponse(message);
}
