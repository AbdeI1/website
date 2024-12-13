import { useRef } from "react";
import { Mesh, Vector3 } from "three";

import { useFrame, useLoader, useThree } from "@react-three/fiber";

import { Lasers } from "./Lasers";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Clone } from "@react-three/drei";

const Ship = () => {
  const ship = useRef<Mesh>(null!);

  const gltf = useLoader(GLTFLoader, "shipModel/scene.txt");

  const { scene } = useThree();
  scene.userData.shipRef = ship;

  useFrame(({ pointer }) => {
    ship.current.lookAt(new Vector3(pointer.x, pointer.y, 1));
  });

  return (
    <group>
      <mesh ref={ship} up={[0, 0, 1]} position={[0, 0, 1]} scale={0.4}>
        <Clone object={gltf.scene} />
      </mesh>
      <Lasers ship={ship} />
    </group>
  );
};

export { Ship };
