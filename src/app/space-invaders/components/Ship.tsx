import { useRef, useState } from "react";
import { Euler, Mesh, Quaternion, Vector3 } from "three";

import { useFrame, useLoader } from "@react-three/fiber";

import { Laser } from "./Laser";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const Ship = () => {
  const ship = useRef<Mesh>(null!);

  const [lasers, setLasers] = useState<
    { position?: Vector3; rotation?: Euler; remove?: () => void }[]
  >([]);

  const gltf = useLoader(GLTFLoader, "shipModel/scene.txt");

  window.addEventListener("click", () => {
    setLasers([
      ...lasers,
      {
        position: ship.current.position,
        rotation: ship.current.rotation,
      },
    ]);
  });

  useFrame((state) => {
    ship.current.lookAt(new Vector3(state.pointer.x, state.pointer.y, 1));
  });

  return (
    <>
      {lasers.map((props, i) => (
        <Laser key={i} {...props} />
      ))}
      <mesh ref={ship} position={[0, 0, 1]} up={[0, 0, 1]} scale={0.4}>
        <axesHelper args={[5]} />
        <primitive object={gltf.scene} />
      </mesh>
    </>
  );
};

export { Ship };
