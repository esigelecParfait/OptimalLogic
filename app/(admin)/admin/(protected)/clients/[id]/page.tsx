import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import EditClientForm from "./EditClientForm";
import ClientStatusForm from "./ClientStatusForm";
import ServiceEditForm from "./ServiceEditForm";

export const dynamic = "force-dynamic";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: prospect } = await supabaseAdmin
    .from("client_prospects")
    .select("*")
    .eq("id_client", id)
    .maybeSingle();

  if (!prospect) notFound();

  const { data: client } = await supabaseAdmin
    .from("clients")
    .select("id_client, status, became_client_at")
    .eq("id_client_prospect", id)
    .maybeSingle();

  const { data: services } = client
    ? await supabaseAdmin
        .from("client_services")
        .select("id_service, offer_code, service_status, payment_status")
        .eq("id_client", client.id_client)
    : { data: [] };

  const { data: offers } = await supabaseAdmin
    .from("offres")
    .select("code, nom_offre, client_type")
    .eq("is_active", true);

  const matchingOffers = (offers ?? []).filter((o) => o.client_type === prospect.type_client);

  return (
    <div className="p-8 space-y-8 max-w-3xl">
      <div>
        <Link href="/admin/clients" className="text-xs text-mut hover:text-ink transition-colors">← Retour aux clients</Link>
        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-mut-2">Fiche client</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink">
          {prospect.business_name || `${prospect.contact_first_name ?? ""} ${prospect.contact_last_name ?? ""}`.trim()}
        </h1>
      </div>

      {client && (
        <section className="surface-card rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-ink mb-1">Statut du compte client</h2>
          <p className="text-xs text-mut mb-4">Client depuis le {new Date(client.became_client_at).toLocaleDateString("fr-FR")}</p>
          <ClientStatusForm clientId={client.id_client} status={client.status} />
        </section>
      )}

      <section className="surface-card rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-ink mb-1">Informations</h2>
        <p className="text-xs text-mut mb-5">Modifie n&apos;importe quelle donnée du client — utile s&apos;il n&apos;arrive pas à le faire lui-même depuis son espace.</p>
        <EditClientForm prospect={prospect} />
      </section>

      {client && (
        <section className="surface-card rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-ink mb-1">Services</h2>
          <p className="text-xs text-mut mb-5">Offre, statut du service et statut de paiement.</p>
          <div className="space-y-3">
            {(services ?? []).map((s) => (
              <ServiceEditForm key={s.id_service} service={s} offers={matchingOffers} />
            ))}
            {(!services || services.length === 0) && (
              <p className="text-sm text-mut">Aucun service pour ce client.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
