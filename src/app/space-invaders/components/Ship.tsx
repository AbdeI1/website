import { useRef } from "react";
import { Mesh, Vector3 } from "three";

import { useFrame, useLoader } from "@react-three/fiber";

import { Lasers } from "./Lasers";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const Ship = () => {
  const ship = useRef<Mesh>(null!);

  const gltf = useLoader(GLTFLoader, "shipModel/scene.txt");

  useFrame((state) => {
    ship.current.lookAt(new Vector3(state.pointer.x, state.pointer.y, 1));
  });

  return (
    <group>
      <mesh ref={ship} position={[0, 0, 1]} up={[0, 0, 1]} scale={0.4}>
        <primitive object={gltf.scene} />
      </mesh>
      <Lasers ship={ship} />
    </group>
  );
};

export { Ship };
