import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { logoutAdmin } from "../connexion/actions";

export const dynamic = "force-dynamic";

const nav = [
  { href: "/admin", label: "Tableau de bord", icon: "▦" },
  { href: "/admin/prospects", label: "Prospects", icon: "◎" },
  { href: "/admin/clients", label: "Clients", icon: "◉" },
  { href: "/admin/metrics", label: "Métriques", icon: "▴" },
  { href: "/admin/google-setup", label: "Google Business", icon: "⊕" },
];

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/connexion");

  const { data: admin } = await supabaseAdmin
    .from("administrateurs")
    .select("first_name, last_name, role")
    .eq("email", user.email!)
    .eq("is_active", true)
    .maybeSingle();

  if (!admin) redirect("/admin/connexion");

  return (
    <div className="flex min-h-screen bg-[#0d0d0f] text-ink">
      <aside className="w-56 shrink-0 flex flex-col border-r border-white/[0.07]">
        <div className="p-5 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <div
              className="h-8 w-8 shrink-0 rounded-lg grid place-items-center text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg,#7c5cff,#b14dff 50%,#1fd5f0)" }}
            >
              OL
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-ink truncate">OptimalLogic</p>
              <p className="text-[10px] text-mut">Administration</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-mut hover:text-ink hover:bg-white/[0.05] transition-colors"
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/[0.07]">
          <p className="text-xs font-medium text-ink truncate">{admin.first_name} {admin.last_name}</p>
          <p className="text-[10px] text-mut mt-0.5 mb-3 capitalize">{admin.role}</p>
          <form action={logoutAdmin}>
            <button type="submit" className="text-xs text-mut hover:text-ink transition-colors">
              Se déconnecter →
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
