"use client";

import type { ReactNode } from "react";
import NeuralBackground from "@/components/fx/NeuralBackground";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-45">
        <NeuralBackground />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-20 z-0 h-[min(72vw,560px)] w-[min(72vw,560px)] -translate-x-1/2 rounded-full blur-[110px]"
        style={{ background: "rgba(255,255,255,0.14)" }}
      />

      <div className="relative z-[1] mx-auto flex min-h-[calc(100vh-14rem)] w-full max-w-[520px] items-center">
        <section className="surface-card relative w-full overflow-hidden rounded-[30px] p-7 shadow-[0_40px_120px_-80px_rgba(255,255,255,0.35)] sm:p-9">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-[90px]"
            style={{ background: "var(--grad)" }}
          />
          <div className="relative">
            <p className="eyebrow-grad text-xs font-semibold uppercase tracking-[0.22em]">
              {eyebrow}
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-ink">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-mut">{description}</p>

            <div className="mt-8">{children}</div>

            {footer ? <div className="mt-6 text-center text-sm text-mut">{footer}</div> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
