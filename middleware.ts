import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Admin uniquement en local — bloqué sur Vercel (production)
  if (
    process.env.VERCEL === "1" &&
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    return new NextResponse(null, { status: 404 });
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
