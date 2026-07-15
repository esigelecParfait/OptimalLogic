import { authenticatedNotImplemented } from "@/lib/security/routes/authenticated-not-implemented";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return authenticatedNotImplemented(request, "Le rapport d'audit n'est pas encore implemente.");
}
