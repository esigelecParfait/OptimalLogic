import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ActivateForm from "./ActivateForm";

export const dynamic = "force-dynamic";

export default async function ActiverPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Lien invalide ou expiré
  if (!user) {
    redirect("/connexion?error=lien_invalide");
  }

  const params = await searchParams;
  const isReset = params.mode === "reset";

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20">
      {/* Fond aurora */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #7c5cff, transparent 70%)", filter: "blur(80px)" }}
        />
      </div>

      <div className="relative z-10 w-full">
        <ActivateForm email={user.email ?? ""} isReset={isReset} />
      </div>
    </main>
  );
}
