import { MutableRefObject, useRef } from "react";
import { Mesh, Vector3, Group } from "three";

import { useFrame } from "@react-three/fiber";

const Lasers = ({ ship }: { ship: MutableRefObject<Mesh> }) => {
  const laser = useRef<Mesh>(null!);
  const lasers = useRef<Group>(null!);

  window.addEventListener("click", () => {
    const l = laser.current.clone();
    l.visible = true;
    l.rotation.set(...ship.current.rotation.toArray());
    l.rotateX(Math.PI / 2);
    lasers.current.add(l);
  });

  useFrame((state, delta) => {
    lasers.current.children.forEach((l) => {
      l.position.addScaledVector(
        new Vector3(state.pointer.x, state.pointer.y, 0),
        delta * -1
      );
      l.translateY(delta * 10);
      if (
        l.position.x < -10 ||
        l.position.x > 10 ||
        l.position.y < -5 ||
        l.position.y > 5
      )
        l.parent?.remove(l);
    });
  });

  return (
    <group>
      <mesh ref={laser} scale={0.05} visible={false}>
        <cylinderGeometry args={[0.2, 0.2, 15]}></cylinderGeometry>
        <meshStandardMaterial
          color={[0, 1, 0]}
          emissive={[0, 2, 0]}
          toneMapped={false}
        />
      </mesh>
      <group ref={lasers}></group>
    </group>
  );
};

export { Lasers };
