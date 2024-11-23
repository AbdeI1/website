import { useEffect, useRef } from "react";
import { Quaternion, Mesh, Vector3, Euler } from "three";

import { useFrame } from "@react-three/fiber";

const Laser = ({
  position = new Vector3(),
  rotation = new Euler(),
  remove = () => {},
}) => {
  const laser = useRef<Mesh>(null!);

  useEffect(() => {
    laser.current.rotateX(-Math.PI / 2);
  });

  useFrame((state, delta) => {
    laser.current.position.addScaledVector(
      new Vector3(state.pointer.x, state.pointer.y, 0),
      delta * -1
    );
    // laser.current.rotateX(Math.PI / 2);
    laser.current.translateY(delta * 1);

    // laser.current.position.set(state.pointer.x * 7, state.pointer.y * 4, 0);

    console.log(laser.current.position);

    if (
      laser.current.position.x < -10 ||
      laser.current.position.x > 10 ||
      laser.current.position.y < -5 ||
      laser.current.position.y > 5
    )
      remove();
  });

  return (
    <mesh ref={laser} scale={0.05} position={position} rotation={rotation}>
      <axesHelper args={[5]} />
      <cylinderGeometry args={[0.2, 0.2, 15]}></cylinderGeometry>
      <meshStandardMaterial
        color={[0, 1, 0]}
        emissive={[0, 2, 0]}
        toneMapped={false}
      />
    </mesh>
  );
};

export { Laser };
