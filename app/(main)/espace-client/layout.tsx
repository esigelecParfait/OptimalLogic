import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/(main)/connexion/actions";

export const dynamic = "force-dynamic";

const navItems = [
  { href: "/espace-client", label: "Tableau de bord" },
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
    <main className="relative min-h-screen pt-28">
      <div className="border-b border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-6 lg:px-8">
          <div>
            <p className="eyebrow-grad text-sm font-semibold uppercase tracking-[0.25em]">Espace client</p>
            <h1 className="mt-2 font-display text-2xl font-semibold">Bonjour {client?.contact_first_name ?? ""}</h1>
          </div>
          <form action={logout}>
            <button type="submit" className="btn-ghost rounded-full px-5 py-2.5 text-sm font-semibold">Se déconnecter</button>
          </form>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-4 sm:px-6 lg:px-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-full border border-white/[0.13] px-4 py-2 text-sm font-semibold text-mut transition hover:border-indigo hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}
