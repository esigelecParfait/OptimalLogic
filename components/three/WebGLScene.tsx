"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group, Mesh } from "three";

import styles from "./three-d.module.css";

function Geometry({ variantId, index }: { variantId: string; index: number }) {
  if (variantId === "webgl-rings")
    return <torusGeometry args={[0.7 + index * 0.18, 0.035, 10, 48]} />;
  if (variantId === "webgl-object")
    return <icosahedronGeometry args={[0.95 - index * 0.1, index === 0 ? 2 : 1]} />;
  if (variantId === "webgl-particles")
    return <sphereGeometry args={[0.07 + (index % 3) * 0.025, 10, 10]} />;
  if (variantId === "webgl-flow")
    return <octahedronGeometry args={[0.15 + index * 0.012, 0]} />;
  return (
    <boxGeometry
      args={variantId === "webgl-architecture" ? [0.7, 0.18, 0.46] : [0.22, 0.22, 0.22]}
    />
  );
}

function Scene({ variantId, paused }: { variantId: string; paused: boolean }) {
  const group = useRef<Group>(null);
  const focus = useRef<Mesh>(null);
  const elapsed = useRef(0);
  const count =
    variantId === "webgl-particles" ? 20 : variantId === "webgl-flow" ? 12 : 7;

  useEffect(() => {
    elapsed.current = 0;
  }, [variantId]);
  useFrame((state, delta) => {
    if (paused || elapsed.current > 10) return;
    elapsed.current += delta;
    if (group.current) group.current.rotation.y += delta * 0.18;
    if (focus.current) focus.current.rotation.x = state.clock.elapsedTime * 0.18;
  });

  return (
    <group ref={group}>
      {Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2;
        const radius =
          variantId === "webgl-object"
            ? 0
            : variantId === "webgl-architecture"
              ? 0.72
              : 0.75 + (index % 4) * 0.22;
        const position: [number, number, number] =
          variantId === "webgl-flow"
            ? [-1.6 + index * 0.29, Math.sin(index * 0.8) * 0.42, Math.cos(index) * 0.3]
            : variantId === "webgl-architecture"
              ? [
                  ((index % 3) - 1) * 0.82,
                  (Math.floor(index / 3) - 1) * 0.48,
                  (index % 2) * 0.42,
                ]
              : [
                  Math.cos(angle) * radius,
                  Math.sin(angle * 2) * 0.48,
                  Math.sin(angle) * radius,
                ];
        return (
          <mesh
            ref={index === 0 ? focus : undefined}
            position={position}
            rotation={[angle * 0.25, angle, angle * 0.12]}
            key={index}
          >
            <Geometry variantId={variantId} index={index} />
            <meshStandardMaterial
              color={index % 3 === 0 ? "#67e8f9" : index % 2 ? "#a78bfa" : "#fb923c"}
              roughness={0.24}
              metalness={0.5}
              transparent
              opacity={0.92}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function WebGLScene({
  variantId,
  paused,
}: {
  variantId: string;
  paused: boolean;
}) {
  return (
    <div
      className={styles.webgl}
      aria-label="Scène WebGL interactive"
      data-webgl-scene={variantId}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], fov: 40 }}
        frameloop={paused ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[3, 4, 5]} intensity={3.2} />
        <pointLight position={[-3, -2, 2]} intensity={2.4} color="#a78bfa" />
        <Scene variantId={variantId} paused={paused} />
      </Canvas>
    </div>
  );
}
