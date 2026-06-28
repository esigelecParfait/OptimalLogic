import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/espace-client";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // "recovery" = mot de passe oublié  |  "invite" = nouveau client
      // Les deux atterrissent sur la même page unifiée
      const redirectTo =
        type === "recovery"
          ? "/connexion/activer?mode=reset"
          : type === "invite"
            ? "/connexion/activer"
            : next;

      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  return NextResponse.redirect(
    new URL("/connexion?error=lien_invalide", request.url)
  );
}
