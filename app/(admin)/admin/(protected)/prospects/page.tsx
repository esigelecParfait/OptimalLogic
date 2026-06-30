import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function ProspectsPage() {
  const { data: prospects } = await supabaseAdmin
    .from("client_prospects")
    .select(`
      id_client,
      contact_first_name,
      contact_last_name,
      contact_email,
      business_name,
      type_client,
      created_at,
      demandes (
        id,
        request_status,
        request_source,
        offer_code,
        created_at
      )
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  const typeLabels: Record<string, string> = {
    commerce: "Commerce",
    tpe_pme: "TPE/PME",
    startup: "Startup",
    autre: "Autre",
  };

  const statusColors: Record<string, string> = {
    nouveau: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    a_contacter: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    contacte: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    rdv_planifie: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    devis_envoye: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    gagne: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    perdu: "text-red-400 bg-red-400/10 border-red-400/20",
    archive: "text-gray-400 bg-gray-400/10 border-gray-400/20",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-mut-2">Administration</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink">Prospects</h1>
        <p className="mt-1 text-sm text-mut">{prospects?.length ?? 0} prospects enregistrés</p>
      </div>

      <div className="surface-card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.07]">
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Contact</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Entreprise</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Type</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Demandes</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Statut</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {(prospects ?? []).map((p) => {
              const demandes = (p.demandes as Array<{
                id: string;
                request_status: string | null;
                request_source: string | null;
                offer_code: string | null;
                created_at: string;
              }>) ?? [];
              const latest = demandes.sort((a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
              )[0];
              const status = latest?.request_status ?? null;

              return (
                <tr key={p.id_client} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink">{p.contact_first_name} {p.contact_last_name}</p>
                    <p className="text-xs text-mut mt-0.5">{p.contact_email}</p>
                  </td>
                  <td className="px-5 py-4 text-mut">{p.business_name ?? "—"}</td>
                  <td className="px-5 py-4">
                    {p.type_client ? (
                      <span className="rounded-full border border-white/[0.12] bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-mut">
                        {typeLabels[p.type_client] ?? p.type_client}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="px-5 py-4 text-mut">{demandes.length}</td>
                  <td className="px-5 py-4">
                    {status ? (
                      <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusColors[status] ?? "text-mut border-white/10"}`}>
                        {status.replace(/_/g, " ")}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="px-5 py-4 text-xs text-mut">
                    {new Date(p.created_at).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {(!prospects || prospects.length === 0) && (
          <div className="py-16 text-center text-sm text-mut">Aucun prospect pour l&apos;instant.</div>
        )}
      </div>
    </div>
  );
}
