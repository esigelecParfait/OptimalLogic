import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatStatus } from "@/lib/format-status";

export const dynamic = "force-dynamic";

type ClientService = {
  id_service: string;
  offer_code: string;
  service_status: string;
  payment_status: string;
  start_date: string | null;
  end_date: string | null;
  offres: {
    nom_offre: string;
    prix: number | string;
    prix_abonnement: number | string | null;
    client_type: string;
  } | null;
};

const shortcuts = [
  { href: "/espace-client/suivi", label: "Suivi d'avancement" },
  { href: "/espace-client/support", label: "Support" },
  { href: "/espace-client/mon-compte", label: "Mes informations" },
];

export default async function TableauDeBordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const { data: client } = await supabase
    .from("clients")
    .select("id_client")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  const { data: service } = client
    ? await supabase
        .from("client_services")
        .select(
          "id_service, offer_code, service_status, payment_status, start_date, end_date, offres(nom_offre, prix, prix_abonnement, client_type)"
        )
        .eq("id_client", client.id_client)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
    : { data: null };

  const activeService = service as unknown as ClientService | null;

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Mon offre
        </p>

        {activeService ? (
          <>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
              {activeService.offres?.nom_offre ?? activeService.offer_code}
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoCard
                label="Statut du service"
                value={formatStatus(activeService.service_status)}
              />
              <InfoCard
                label="Statut du paiement"
                value={formatStatus(activeService.payment_status)}
              />
              {activeService.start_date && (
                <InfoCard
                  label="Date de début"
                  value={new Date(activeService.start_date).toLocaleDateString(
                    "fr-FR"
                  )}
                />
              )}
              {activeService.end_date && (
                <InfoCard
                  label="Date de fin"
                  value={new Date(activeService.end_date).toLocaleDateString(
                    "fr-FR"
                  )}
                />
              )}
              {activeService.offres?.prix != null && (
                <InfoCard
                  label="Prix"
                  value={`${activeService.offres.prix} €`}
                />
              )}
              {activeService.offres?.prix_abonnement != null && (
                <InfoCard
                  label="Abonnement"
                  value={`${activeService.offres.prix_abonnement} €/mois`}
                />
              )}
            </div>
          </>
        ) : (
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Aucun service actif pour le moment. Une fois votre paiement
            validé, votre offre apparaîtra ici.
          </p>
        )}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Raccourcis
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {shortcuts.map((shortcut) => (
            <Link
              key={shortcut.href}
              href={shortcut.href}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-950 transition hover:border-slate-950 hover:bg-white"
            >
              {shortcut.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}
