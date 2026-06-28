/**
 * Halos lumineux ambiants (aurora) — décoratif, fixé en fond.
 * Composant serveur : aucune interactivité.
 */
export default function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -left-40 -top-60 h-[600px] w-[600px] rounded-full opacity-40 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.26), transparent 68%)" }}
      />
      <div
        className="absolute -right-64 top-[480px] h-[680px] w-[680px] rounded-full opacity-35 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(220,220,220,0.22), transparent 68%)" }}
      />
      <div
        className="absolute -left-44 top-[1700px] h-[640px] w-[640px] rounded-full opacity-35 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.2), transparent 68%)" }}
      />
      <div
        className="absolute -right-40 top-[3000px] h-[560px] w-[560px] rounded-full opacity-30 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(190,190,190,0.18), transparent 68%)" }}
      />
    </div>
  );
}
