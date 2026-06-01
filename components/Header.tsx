import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#f7f4ef]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          DigitSoluce
        </Link>

        <div className="hidden items-center gap-8 text-sm text-neutral-700 md:flex">
          <Link href="/services" className="hover:text-black">
            Services
          </Link>
          <Link href="/tarifs" className="hover:text-black">
            Tarifs
          </Link>
          <Link href="/prise-de-rdv" className="hover:text-black">
            Prise de RDV
          </Link>
          <Link href="/contact" className="hover:text-black">
            Contact
          </Link>
        </div>

        <Link
          href="/prise-de-rdv"
          className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Appel gratuit
        </Link>
      </nav>
    </header>
  );
}