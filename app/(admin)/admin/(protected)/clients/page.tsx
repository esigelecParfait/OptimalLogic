import { supabaseAdmin } from "@/lib/supabase-admin";
import GenerateLinkForm from "./GenerateLinkForm";

export const dynamic = "force-dynamic";

type ClientRow = {
  id_client: string;
  status: string;
  became_client_at: string;
  id_client_prospect: string | null;
};

type ProspectRow = {
  id_client: string;
  contact_first_name: string | null;
  contact_last_name: string | null;
  contact_email: string | null;
  business_name: string | null;
  type_client: string | null;
};

type ServiceRow = {
  id_service: string;
  id_client: string;
  offer_code: string;
  service_status: string;
  payment_status: string;
};

export default async function ClientsPage() {
  const [clientsRes, servicesRes] = await Promise.all([
    supabaseAdmin.from("clients").select("id_client, status, became_client_at, id_client_prospect").order("became_client_at", { ascending: false }),
    supabaseAdmin.from("client_services").select("id_service, id_client, offer_code, service_status, payment_status"),
  ]);

  const clients: ClientRow[] = clientsRes.data ?? [];
  const services: ServiceRow[] = servicesRes.data ?? [];

  const prospectIds = clients.map((c) => c.id_client_prospect).filter(Boolean) as string[];
  const prospectsRes = prospectIds.length > 0
    ? await supabaseAdmin
        .from("client_prospects")
        .select("id_client, contact_first_name, contact_last_name, contact_email, business_name, type_client")
        .in("id_client", prospectIds)
    : { data: [] };

  const prospectMap = new Map<string, ProspectRow>(
    (prospectsRes.data ?? []).map((p) => [p.id_client, p as ProspectRow])
  );

  const servicesByProspect = services.reduce<Record<string, ServiceRow[]>>((acc, s) => {
    (acc[s.id_client] ??= []).push(s);
    return acc;
  }, {});

  const statusBadge = (s: string) =>
    s === "active" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
    : s === "pause" ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
    : "text-red-400 bg-red-400/10 border-red-400/20";

  const payBadge = (s: string) =>
    s === "paye" ? "text-emerald-400" : "text-yellow-400";

  return (
    <div className="p-8 space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-mut-2">Administration</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink">Clients payants</h1>
        <p className="mt-1 text-sm text-mut">{clients.length} client{clients.length !== 1 ? "s" : ""} enregistré{clients.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Génération de lien rapide */}
      <section className="surface-card rounded-2xl p-6">
        <h2 className="font-display text-base font-semibold text-ink mb-1">Générer un lien d&apos;accès espace client</h2>
        <p className="text-xs text-mut mb-4">Le client doit être actif avec un service payé en cours. Le lien expire après 2h.</p>
        <GenerateLinkForm />
      </section>

      {/* Table clients */}
      <section className="surface-card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.07]">
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Client</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Statut</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Services</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Depuis</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Lien</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {clients.map((c) => {
              const p = c.id_client_prospect ? prospectMap.get(c.id_client_prospect) : undefined;
              const svcList = c.id_client_prospect ? (servicesByProspect[c.id_client_prospect] ?? []) : [];

              return (
                <tr key={c.id_client} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink">{p ? `${p.contact_first_name} ${p.contact_last_name}` : "—"}</p>
                    <p className="text-xs text-mut mt-0.5">{p?.contact_email ?? "—"}</p>
                    {p?.business_name && <p className="text-xs text-mut-2 mt-0.5">{p.business_name}</p>}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusBadge(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {svcList.length === 0 ? <span className="text-mut text-xs">Aucun</span> : (
                      <div className="space-y-1">
                        {svcList.map((s) => (
                          <div key={s.id_service} className="text-xs">
                            <span className="text-mut">{s.offer_code}</span>
                            {" · "}
                            <span className={payBadge(s.payment_status)}>{s.payment_status}</span>
                            {" · "}
                            <span className="text-mut">{s.service_status}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-xs text-mut">
                    {new Date(c.became_client_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-5 py-4">
                    {p?.contact_email && (
                      <GenerateLinkForm defaultEmail={p.contact_email} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {clients.length === 0 && (
          <div className="py-16 text-center text-sm text-mut">
            Aucun client pour l&apos;instant. Exécutez le SQL de création dans Supabase pour en ajouter un.
          </div>
        )}
      </section>
    </div>
  );
}
