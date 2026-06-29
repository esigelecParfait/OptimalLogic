import ActivateForm from "./ActivateForm";

export default function ActiverPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #7c5cff, transparent 70%)", filter: "blur(80px)" }}
        />
      </div>
      <div className="relative z-10 w-full">
        <ActivateForm />
      </div>
    </main>
  );
}
