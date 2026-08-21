import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  compact?: boolean;
  onClick?: () => void;
};

export default function Brand({ compact = false, onClick }: BrandProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group inline-flex min-h-11 items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      aria-label="OptimalLogic — Accueil"
    >
      <span className="brand-mark" aria-hidden="true">
        <Image
          src="/ol-logo-black.png"
          alt=""
          width={96}
          height={96}
          priority
          className="brand-mark-image"
        />
      </span>
      {!compact && (
        <span className="font-display text-[18px] font-semibold tracking-[-0.035em] text-ink sm:text-[19px]">
          OptimalLogic
        </span>
      )}
    </Link>
  );
}
