"use client";

import { useEffect, useRef } from "react";

/**
 * Fond "réseau neuronal" animé sur canvas (clin d'œil à l'IA).
 * Les nœuds se déplacent, se connectent et réagissent à la souris.
 * À placer dans un conteneur en `position: relative` (remplit son parent).
 */
export default function NeuralBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let connectionDistance = 140;
    let mouseDistance = 120;

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent!.offsetWidth;
      h = parent!.offsetHeight;
      connectionDistance = Math.max(72, Math.min(140, w * 0.18));
      mouseDistance = Math.max(72, Math.min(120, w * 0.2));
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function build() {
      const area = w * h;
      const count = Math.max(18, Math.min(Math.floor(area / 11500), 90));
      const speed = w < 640 ? 0.24 : 0.4;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }));
    }

    function onMove(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }

    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const dxm = n.x - mouse.x;
        const dym = n.y - mouse.y;
        const dm = Math.hypot(dxm, dym);
        if (dm > 0 && dm < mouseDistance) {
          n.x += (dxm / dm) * 1.2;
          n.y += (dym / dm) * 1.2;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < connectionDistance) {
            const o = (1 - d / connectionDistance) * 0.34;
            ctx!.strokeStyle = `rgba(255,255,255,${o})`;
            ctx!.lineWidth = 0.7;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const near = dm < mouseDistance;
        ctx!.fillStyle = near ? "rgba(255,255,255,0.86)" : "rgba(220,220,220,0.52)";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, near ? 2.4 : w < 640 ? 1.25 : 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    size();
    build();
    draw();

    const onResize = () => {
      size();
      build();
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(parent);

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`absolute inset-0 ${className}`} />;
}
