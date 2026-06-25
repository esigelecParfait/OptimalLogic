"use client";

import { useEffect, useState } from "react";

type Star = { id: number; x: number; y: number; size: number; delay: number; duration: number };

export default function Starfield({ count = 140 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 0.3,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ${star.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}
