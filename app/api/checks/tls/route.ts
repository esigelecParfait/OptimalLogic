import { authenticatedNotImplemented } from "@/lib/security/routes/authenticated-not-implemented";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return authenticatedNotImplemented(request, "Le controle TLS n'est pas encore implemente.");
}
