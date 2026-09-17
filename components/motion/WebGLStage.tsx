"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group, Mesh } from "three";

import styles from "./motion.module.css";

function Scene({
  variant,
  paused,
  speed,
}: {
  variant: string;
  paused: boolean;
  speed: number;
}) {
  const group = useRef<Group>(null);
  const wave = useRef<Mesh>(null);
  const elapsed = useRef(0);
  useEffect(() => {
    elapsed.current = 0;
  }, [variant]);
  useFrame((state, delta) => {
    if (paused || elapsed.current >= 6) return;
    elapsed.current += delta;
    if (group.current) group.current.rotation.y += delta * 0.32 * speed;
    if (wave.current)
      wave.current.rotation.z = Math.sin(state.clock.elapsedTime * speed) * 0.18;
  });
  const count = variant === "webgl-network" ? 7 : variant === "webgl-stack" ? 5 : 3;
  return (
    <group ref={group}>
      {Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2;
        const radius = variant === "webgl-stack" ? 0.25 : 1.15;
        const position: [number, number, number] =
          variant === "webgl-stack"
            ? [0, (index - 2) * 0.38, 0]
            : [
                Math.cos(angle) * radius,
                Math.sin(angle) * 0.55,
                Math.sin(angle) * radius,
              ];
        return (
          <mesh
            ref={index === 0 ? wave : undefined}
            position={position}
            rotation={[angle * 0.15, angle, angle * 0.08]}
            key={index}
          >
            <boxGeometry
              args={
                variant === "webgl-wave"
                  ? [1.2, 0.08, 0.45]
                  : variant === "webgl-stack"
                    ? [1.35, 0.18, 0.9]
                    : [0.34, 0.34, 0.34]
              }
            />
            <meshStandardMaterial
              color={index % 2 ? "#73dcf0" : "#934329"}
              roughness={0.28}
              metalness={0.25}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function WebGLStage({
  variant,
  paused,
  speed,
}: {
  variant: string;
  paused: boolean;
  speed: number;
}) {
  return (
    <div className={styles.webgl} aria-label="Démonstration 3D interactive">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], fov: 42 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[3, 4, 5]} intensity={3} />
        <Scene variant={variant} paused={paused} speed={speed} />
      </Canvas>
      <noscript>
        <p>Composition 3D disponible sous forme statique.</p>
      </noscript>
    </div>
  );
}
