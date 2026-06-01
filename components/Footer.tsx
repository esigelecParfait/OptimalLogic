import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#f7f4ef] px-6 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-neutral-600 md:flex-row">
        <p>© 2026 DigitSoluce. Tous droits réservés.</p>

        <div className="flex gap-6">
          <Link href="/mentions-legales" className="hover:text-black">
            Mentions légales
          </Link>
          <Link href="/confidentialite" className="hover:text-black">
            Confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}