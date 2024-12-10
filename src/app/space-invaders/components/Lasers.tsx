import { MutableRefObject, useRef } from "react";
import { Mesh, Vector3, Group, Raycaster } from "three";

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
      // const r = new Raycaster();
      // const worldY = new Vector3();
      // l.matrixWorld.extractBasis(new Vector3(), worldY, new Vector3());
      // r.set(l.getWorldPosition(new Vector3()), worldY);
      // let i = r.intersectObjects(state.scene.children);
      // console.log(i);
      // i.forEach((o) => o.object.parent?.remove(o.object));
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
