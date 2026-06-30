import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import GenerateLinkForm from "./GenerateLinkForm";
import SendLinkButton from "./SendLinkButton";

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

type TokenRow = {
  email: string;
  expires_at: string;
  used_at: string | null;
  created_at: string;
};

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

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

  const emails = (prospectsRes.data ?? []).map((p) => p.contact_email).filter(Boolean) as string[];
  const tokensRes = emails.length > 0
    ? await supabaseAdmin
        .from("activation_tokens")
        .select("email, expires_at, used_at, created_at")
        .in("email", emails)
        .order("created_at", { ascending: false })
    : { data: [] };

  const latestTokenByEmail = new Map<string, TokenRow>();
  for (const t of (tokensRes.data ?? []) as TokenRow[]) {
    if (!latestTokenByEmail.has(t.email)) latestTokenByEmail.set(t.email, t);
  }

  const servicesByProspect = services.reduce<Record<string, ServiceRow[]>>((acc, s) => {
    (acc[s.id_client] ??= []).push(s);
    return acc;
  }, {});

  const query = (q ?? "").trim().toLowerCase();
  const filteredClients = query
    ? clients.filter((c) => {
        const p = c.id_client_prospect ? prospectMap.get(c.id_client_prospect) : undefined;
        const haystack = [p?.contact_first_name, p?.contact_last_name, p?.contact_email, p?.business_name]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
    : clients;

  const statusBadge = (s: string) =>
    s === "active" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
    : s === "pause" ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
    : "text-red-400 bg-red-400/10 border-red-400/20";

  const payBadge = (s: string) =>
    s === "paye" ? "text-emerald-400" : "text-yellow-400";

  const tokenBadge = (t: TokenRow | undefined) => {
    if (!t) return { label: "Aucun lien", cls: "text-mut-2 bg-white/[0.04] border-white/[0.08]" };
    if (t.used_at) return { label: "Activé", cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" };
    if (new Date(t.expires_at) < new Date()) return { label: "Expiré", cls: "text-red-400 bg-red-400/10 border-red-400/20" };
    return { label: "Lien actif", cls: "text-blue-400 bg-blue-400/10 border-blue-400/20" };
  };

  return (
    <div className="p-8 space-y-10">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-mut-2">Administration</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-ink">Clients payants</h1>
          <p className="mt-1 text-sm text-mut">{filteredClients.length} client{filteredClients.length !== 1 ? "s" : ""} {query ? "trouvé(s)" : "enregistré(s)"}</p>
        </div>
        <form method="GET" className="shrink-0">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Rechercher un client…"
            className="h-10 w-64 rounded-xl border border-white/[0.12] bg-[rgba(26,26,29,0.8)] px-3.5 text-sm text-ink outline-none placeholder:text-mut-2 focus:border-white/30"
          />
        </form>
      </div>

      {/* Génération de lien manuelle (cas particuliers, copie directe) */}
      <section className="surface-card rounded-2xl p-6">
        <h2 className="font-display text-base font-semibold text-ink mb-1">Générer un lien d&apos;accès (manuel)</h2>
        <p className="text-xs text-mut mb-4">Pour copier le lien toi-même plutôt que de l&apos;envoyer automatiquement. Le client doit être actif avec un service payé en cours.</p>
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
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Lien d&apos;accès</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Depuis</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {filteredClients.map((c) => {
              const p = c.id_client_prospect ? prospectMap.get(c.id_client_prospect) : undefined;
              const svcList = c.id_client_prospect ? (servicesByProspect[c.id_client_prospect] ?? []) : [];
              const token = p?.contact_email ? latestTokenByEmail.get(p.contact_email) : undefined;
              const tb = tokenBadge(token);

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
                  <td className="px-5 py-4">
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${tb.cls}`}>
                      {tb.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-mut">
                    {new Date(c.became_client_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {p?.contact_email && <SendLinkButton email={p.contact_email} />}
                      {c.id_client_prospect && (
                        <Link
                          href={`/admin/clients/${c.id_client_prospect}`}
                          className="text-xs text-mut hover:text-ink transition-colors whitespace-nowrap"
                        >
                          Modifier →
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredClients.length === 0 && (
          <div className="py-16 text-center text-sm text-mut">
            {query ? "Aucun résultat pour cette recherche." : "Aucun client pour l'instant."}
          </div>
        )}
      </section>
    </div>
  );
}
