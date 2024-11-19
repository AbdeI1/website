import { useRef } from "react";
import { Color, Mesh, Vector3 } from "three";

import { useFrame } from "@react-three/fiber";

const Star = ({
  position = new Vector3(0, 0, 0),
  velocity = new Vector3(0, 0, 0),
  scale = 1,
  color = new Color(1, 1, 1),
}) => {
  const star = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    delta = Math.min(delta, 0.1);

    star.current.position.addScaledVector(
      new Vector3(state.pointer.x, state.pointer.y, 0),
      delta * scale * -300
    );
    star.current.position.addScaledVector(velocity, delta);

    if (star.current.position.x < -10) star.current.position.x = 10;
    if (star.current.position.x > 10) star.current.position.x = -10;
    if (star.current.position.y < -5) star.current.position.y = 5;
    if (star.current.position.y > 5) star.current.position.y = -5;
  });

  return (
    <mesh ref={star} scale={scale} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        toneMapped={false}
      />
    </mesh>
  );
};

export { Star };
