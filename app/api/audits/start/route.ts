import { authenticatedNotImplemented } from "@/lib/security/routes/authenticated-not-implemented";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return authenticatedNotImplemented(
    request,
    "Le demarrage d'audit n'est pas encore implemente.",
  );
}
