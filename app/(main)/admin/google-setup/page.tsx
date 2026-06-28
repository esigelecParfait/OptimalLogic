import { createClient } from "@supabase/supabase-js";
import GoogleSetupClient from "./GoogleSetupClient";

export const dynamic = "force-dynamic";

type DbClient = {
  id_client: string;
  business_name: string | null;
  contact_first_name: string | null;
  contact_last_name: string | null;
  google_location_name: string | null;
  google_account_location_name: string | null;
};

export default async function GoogleSetupPage({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string }>;
}) {
  const { secret } = await searchParams;

  // Protection simple par secret admin
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="surface-card max-w-sm rounded-2xl p-8 text-center">
          <p className="text-2xl mb-3">🔒</p>
          <h1 className="font-display text-xl font-semibold text-ink">Accès restreint</h1>
          <p className="mt-2 text-sm text-mut">Ajoutez <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">?secret=VOTRE_ADMIN_SECRET</code> à l'URL.</p>
        </div>
      </main>
    );
  }

  // Charger les clients depuis Supabase
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: clients } = await db
    .from("clients")
    .select("id_client, business_name, contact_first_name, contact_last_name, google_location_name, google_account_location_name")
    .order("business_name");

  return (
    <main className="relative min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow-grad text-xs font-semibold uppercase tracking-widest">Administration</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
            Connexion Google Business
          </h1>
          <p className="mt-2 text-sm text-mut max-w-xl">
            Associez chaque fiche Google Business à son client. Les métriques (vues, avis, note) seront ensuite récupérées automatiquement chaque lundi.
          </p>
        </div>

        <GoogleSetupClient
          clients={(clients ?? []) as DbClient[]}
          adminSecret={secret}
        />
      </div>
    </main>
  );
}
