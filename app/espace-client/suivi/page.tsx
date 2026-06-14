import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatStatus } from "@/lib/format-status";

export const dynamic = "force-dynamic";

type ServiceStep = {
  id_step: string;
  step_name: string;
  step_description: string | null;
  step_status: string;
  position: number;
};

export default async function SuiviPage() {
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
        .select("id_service")
        .eq("id_client", client.id_client)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()
    : { data: null };

  const { data: steps } = service
    ? await supabase
        .from("service_steps")
        .select("id_step, step_name, step_description, step_status, position")
        .eq("id_service", service.id_service)
        .order("position", { ascending: true })
    : { data: null };

  const stepList = (steps as ServiceStep[] | null) ?? [];

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Suivi
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
          Suivi d'avancement
        </h2>
      </div>

      {!service ? (
        <EmptyState message="Aucun service actif pour le moment. Le suivi d'avancement apparaîtra ici une fois votre service activé." />
      ) : stepList.length === 0 ? (
        <EmptyState message="Les étapes de votre service seront bientôt disponibles." />
      ) : (
        <ol className="grid gap-4">
          {stepList.map((step) => (
            <li
              key={step.id_step}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-950">
                  {step.step_name}
                </h3>
                <span className="rounded-full bg-slate-950 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
                  {formatStatus(step.step_status)}
                </span>
              </div>

              {step.step_description && (
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.step_description}
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-sm leading-6 text-slate-600 shadow-sm">
      {message}
    </div>
  );
}
