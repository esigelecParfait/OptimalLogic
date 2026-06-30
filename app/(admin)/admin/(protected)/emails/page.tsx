import { supabaseAdmin } from "@/lib/supabase-admin";
import GenerateLinkForm from "../clients/GenerateLinkForm";

export const dynamic = "force-dynamic";

export default async function EmailsPage() {
  const { data: tokens } = await supabaseAdmin
    .from("activation_tokens")
    .select("id, token, email, expires_at, used_at, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  const now = new Date();

  const tokenStatus = (t: { expires_at: string; used_at: string | null }) => {
    if (t.used_at) return { label: "Utilisé", cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" };
    if (new Date(t.expires_at) < now) return { label: "Expiré", cls: "text-red-400 bg-red-400/10 border-red-400/20" };
    return { label: "Actif", cls: "text-blue-400 bg-blue-400/10 border-blue-400/20" };
  };

  return (
    <div className="p-8 space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-mut-2">Administration</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink">Emails & accès</h1>
        <p className="mt-1 text-sm text-mut">Génération de liens d&apos;accès espace client et historique des tokens.</p>
      </div>

      <section className="surface-card rounded-2xl p-6">
        <h2 className="font-display text-base font-semibold text-ink mb-1">Nouveau lien d&apos;accès</h2>
        <p className="text-xs text-mut mb-4">
          Génère un lien de connexion sécurisé (valide 2h) à envoyer manuellement au client.
          Le client doit exister dans la table <code className="text-[11px] bg-white/[0.07] px-1.5 py-0.5 rounded">clients</code> avec un service actif payé.
        </p>
        <GenerateLinkForm />
      </section>

      <section className="surface-card rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.07]">
          <h2 className="font-display text-base font-semibold text-ink">Historique des tokens</h2>
          <p className="text-xs text-mut mt-0.5">{tokens?.length ?? 0} tokens générés (50 derniers)</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.07]">
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Email</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Statut</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Expire le</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Utilisé le</th>
              <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-widest text-mut-2">Créé le</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {(tokens ?? []).map((t) => {
              const s = tokenStatus(t);
              return (
                <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5 font-medium text-ink">{t.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${s.cls}`}>
                      {s.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-mut">
                    {new Date(t.expires_at).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-mut">
                    {t.used_at
                      ? new Date(t.used_at).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })
                      : "—"}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-mut">
                    {new Date(t.created_at).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(!tokens || tokens.length === 0) && (
          <div className="py-16 text-center text-sm text-mut">Aucun token généré pour l&apos;instant.</div>
        )}
      </section>
    </div>
  );
}
