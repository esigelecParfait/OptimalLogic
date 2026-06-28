import Link from "next/link";

const columns = [
  
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-[2] mt-16 border-t border-white/[0.07] pb-6 pt-10">
      <div className="mx-auto max-w-[1250px] px-7">

        <div className="mb-12 flex flex-col gap-11 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl font-display text-base font-bold text-black" style={{ background: "var(--grad)" }}>OL</span>
              <span className="font-display text-[19px] font-semibold text-ink">Optimal<span className="text-white">Logic</span></span>
            </Link>
            <p className="mt-[18px] max-w-[300px] text-[14.5px] text-mut">
              Digital, IA &amp; acquisition client.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:text-right">
              <h5 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-mut-2"></h5>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:justify-end">
                {col.links.map((link) => (
                  <Link key={link.label} href={link.href} className="text-[14.5px] text-mut transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </footer>
  );
}
