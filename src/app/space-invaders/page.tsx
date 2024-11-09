"use client";
import { Canvas } from "@react-three/fiber";

export default function SpaceInvaders() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw", background: "black" }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
    </Canvas>
  );
}
