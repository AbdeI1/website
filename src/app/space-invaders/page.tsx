"use client";
import { Canvas } from "@react-three/fiber";
import { Color, Vector3 } from "three";

import { BloomPipeline } from "./components/BloomPipeline";
import { Star } from "./components/Star";

export default function SpaceInvaders() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw", background: "black" }}>
      <ambientLight intensity={2} />
      <BloomPipeline size={3} />
      {Array.from({ length: 500 }).map((_, i) => (
        <Star
          key={i}
          scale={Math.random() * 0.02 + 0.01}
          position={
            new Vector3(Math.random() * 20 - 10, Math.random() * 10 - 5, 0)
          }
          velocity={new Vector3(
            Math.random() * 0.5 - 0.25,
            Math.random() * 0.5 - 0.25,
            0
          ).multiplyScalar(2)}
          color={
            new Color(
              Math.random() + 0.5,
              Math.random() + 0.5,
              Math.random() + 0.5
            )
          }
        />
      ))}
    </Canvas>
  );
}
