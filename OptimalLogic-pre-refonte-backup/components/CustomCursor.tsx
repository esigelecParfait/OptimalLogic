"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf: number;
    let hovering = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      if (ringRef.current) {
        const size = hovering ? 60 : 40;
        const offset = size / 2;
        ringRef.current.style.transform = `translate(${ringX - offset}px, ${ringY - offset}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }

      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };

    const attachHovers = () => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animate);
    attachHovers();

    // Re-attach when DOM changes (navigation)
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

  if (!visible) return null;

  return (
    <>
      {/* Anneau qui suit avec lag */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-2 border-gray-900 transition-[width,height] duration-200 ease-out"
        style={{ willChange: "transform" }}
      />
      {/* Point qui suit exactement */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-gray-900"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
