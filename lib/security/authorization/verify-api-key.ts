import { timingSafeEqual } from "crypto";

export interface ApiKeyVerificationResult {
  valid: boolean;
  status: 401;
  message: string;
}

function safeCompare(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyApiKey(request: Request): ApiKeyVerificationResult {
  const expectedKey = process.env.SECURITY_AGENT_API_KEY;
  const authorization = request.headers.get("authorization");
  const prefix = "Bearer ";

  if (!expectedKey || !authorization?.startsWith(prefix)) {
    return {
      valid: false,
      status: 401,
      message: "Authentification requise.",
    };
  }

  const receivedKey = authorization.slice(prefix.length).trim();
  if (!receivedKey || !safeCompare(receivedKey, expectedKey)) {
    return {
      valid: false,
      status: 401,
      message: "Authentification requise.",
    };
  }

  return {
    valid: true,
    status: 401,
    message: "OK",
  };
}
