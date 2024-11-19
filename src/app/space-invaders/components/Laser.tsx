import { useRef } from "react";
import { Euler, Mesh, Vector3 } from "three";

import { useFrame } from "@react-three/fiber";

const Laser = ({
  position = new Vector3(),
  rotation = new Euler(),
  remove = () => {},
}) => {
  const laser = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    laser.current.position.addScaledVector(
      new Vector3(state.pointer.x, state.pointer.y, 0),
      delta * -1
    );
    laser.current.translateZ(delta * 10);

    if (
      laser.current.position.x < -10 ||
      laser.current.position.x > 10 ||
      laser.current.position.y < -5 ||
      laser.current.position.y > 5
    )
      remove();
  });

  return (
    <mesh
      ref={laser}
      scale={0.05}
      position={position}
      rotation={rotation}
      up={[0, 0, 1]}
    >
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
