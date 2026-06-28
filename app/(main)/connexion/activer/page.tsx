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

  // Si pas de session valide → lien invalide ou expiré
  if (!user) {
    redirect("/connexion?error=lien_invalide");
  }

  const params = await searchParams;
  const isReset = params.mode === "reset";

  return (
    <main className="relative flex min-h-screen items-center justify-center px-5 py-32">
      <ActivateForm
        email={user.email ?? ""}
        isReset={isReset}
      />
    </main>
  );
}
