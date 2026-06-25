import type { Metadata } from "next";
import RDVBooking from "@/components/clients/delices-de-leon/RDVBooking";
import ChatWidgetLeon from "@/components/clients/delices-de-leon/ChatWidgetLeon";

export const metadata: Metadata = {
  title: "Commander en ligne — Les Délices de Léon",
  description: "Gâteaux d'anniversaire, pièces montées, buffets pâtissiers : commandez en ligne auprès des Délices de Léon, boulangerie artisanale Lyon 3e.",
  robots: { index: false, follow: false },
};

export default function CommandePage() {
  return (
    <main className="min-h-screen bg-amber-50/40">
      <div className="border-b border-amber-100 bg-white px-5 py-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800 mb-2">Boulangerie Pâtisserie</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-amber-900">Les Délices de Léon</h1>
        <p className="mt-2 text-sm text-slate-500">MOF Pâtissier 2019 · Artisan boulanger depuis 25 ans · Lyon 3e</p>
      </div>

      <div className="mx-auto max-w-xl px-5 py-12">
        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <p className="text-sm font-semibold text-amber-900">Commande urgente ?</p>
          <p className="mt-1 text-sm text-amber-800">
            Appelez-nous au <a href="tel:0478623317" className="font-bold underline underline-offset-2">04 78 62 33 17</a> — du mardi au samedi, 6h30 à 19h30.
          </p>
        </div>
        <RDVBooking />
      </div>

      <div className="border-t border-amber-100 bg-white px-5 py-6 text-center text-xs text-slate-400">
        <p>27 rue du Faubourg Saint-Antoine · 69003 Lyon</p>
        <p className="mt-1">
          <a href="mailto:contact@delicesdeleon.fr" className="hover:text-slate-700">contact@delicesdeleon.fr</a>
          {" · "}
          <a href="tel:0478623317" className="hover:text-slate-700">04 78 62 33 17</a>
        </p>
      </div>

      <ChatWidgetLeon />
    </main>
  );
}
