"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Curseur personnalisé premium : un point net + un anneau qui suit avec
 * inertie, en `mix-blend-mode: difference` (s'inverse sur les fonds clairs).
 * Désactivé sur les pointeurs grossiers (tactile).
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let hovering = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      hovering = true;
      ringRef.current?.classList.add("cc-hover");
    };
    const onLeave = () => {
      hovering = false;
      ringRef.current?.classList.remove("cc-hover");
    };
    void hovering;

    const attachHovers = () => {
      document.querySelectorAll("a, button, [role='button'], input, select, textarea").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animate);
    attachHovers();

    const observer = new MutationObserver(attachHovers);
    observer.observe(document.body, { childList: true, subtree: true });
    document.documentElement.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="cc-ring pointer-events-none fixed left-0 top-0 z-[9999] h-[38px] w-[38px] rounded-full border-[1.5px] border-white transition-[width,height,background] duration-200 ease-out"
        style={{ mixBlendMode: "difference", willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[7px] w-[7px] rounded-full bg-white"
        style={{ mixBlendMode: "difference", willChange: "transform" }}
      />
      <style>{`.cc-ring.cc-hover{width:64px;height:64px;background:rgba(255,255,255,0.12);border-color:transparent;}`}</style>
    </>
  );
}
