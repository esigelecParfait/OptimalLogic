import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import EditClientForm from "../../clients/[id]/EditClientForm";

export const dynamic = "force-dynamic";

export default async function ProspectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: prospect } = await supabaseAdmin
    .from("client_prospects")
    .select("*")
    .eq("id_client", id)
    .maybeSingle();

  if (!prospect) notFound();

  return (
    <div className="p-8 space-y-8 max-w-3xl">
      <div>
        <Link href="/admin/prospects" className="text-xs text-mut hover:text-ink transition-colors">← Retour aux prospects</Link>
        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-mut-2">Fiche prospect</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink">
          {prospect.business_name || `${prospect.contact_first_name ?? ""} ${prospect.contact_last_name ?? ""}`.trim()}
        </h1>
      </div>

      <section className="surface-card rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-ink mb-1">Informations</h2>
        <p className="text-xs text-mut mb-5">Modifie les coordonnées ou les informations de l&apos;entreprise.</p>
        <EditClientForm prospect={prospect} />
      </section>
    </div>
  );
}
