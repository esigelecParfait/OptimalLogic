import { successResponse } from "@/lib/security/http/json-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return successResponse({
    service: "OptimalLogic Security API",
    status: "healthy",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
}
