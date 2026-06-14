import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/connexion/actions";

export const dynamic = "force-dynamic";

const navItems = [
  { href: "/espace-client", label: "Tableau de bord" },
  { href: "/espace-client/suivi", label: "Suivi d'avancement" },
  { href: "/espace-client/support", label: "Support" },
  { href: "/espace-client/mon-compte", label: "Mes informations" },
];

export default async function EspaceClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const { data: client } = await supabase
    .from("clients")
    .select("contact_first_name")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Espace client
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              Bonjour {client?.contact_first_name ?? ""}
            </h1>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
            >
              Se déconnecter
            </button>
          </form>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-4 sm:px-6 lg:px-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}
