import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatStatus } from "@/lib/format-status";
import TicketForm from "./TicketForm";

export const dynamic = "force-dynamic";

type SupportTicket = {
  id_ticket: string;
  subject: string;
  description: string;
  ticket_status: string;
  created_at: string;
};

export default async function SupportPage() {
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

  const { data: tickets } = client
    ? await supabase
        .from("support_tickets")
        .select("id_ticket, subject, description, ticket_status, created_at")
        .eq("id_client", client.id_client)
        .order("created_at", { ascending: false })
    : { data: null };

  const ticketList = (tickets as SupportTicket[] | null) ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Support
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
          Nouveau ticket
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Une question, un problème ? Décrivez votre demande, notre équipe
          vous répondra rapidement.
        </p>

        <div className="mt-6">
          <TicketForm />
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Historique
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
          Mes tickets
        </h2>

        {ticketList.length === 0 ? (
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Vous n'avez pas encore envoyé de ticket.
          </p>
        ) : (
          <ul className="mt-6 grid gap-4">
            {ticketList.map((ticket) => (
              <li key={ticket.id_ticket} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-950">
                    {ticket.subject}
                  </h3>
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {formatStatus(ticket.ticket_status)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {ticket.description}
                </p>
                <p className="mt-3 text-xs text-slate-400">
                  {new Date(ticket.created_at).toLocaleDateString("fr-FR")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
