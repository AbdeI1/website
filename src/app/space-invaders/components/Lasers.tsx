import { MutableRefObject, useRef } from "react";
import { Mesh, Vector3, Group, Raycaster } from "three";

import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

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

  const { scene } = useThree();
  scene.userData.lasersRef = lasers;

  useFrame(
    (
      {
        pointer,
        scene: {
          userData: {
            minesRef: { current: mines },
            shipSpeed,
          },
        },
      },
      delta
    ) => {
      lasers.current.children.forEach((l) => {
        l.position.addScaledVector(
          new Vector3(pointer.x, pointer.y, 0),
          delta * shipSpeed * -1
        );
        l.translateY(delta * 10);
        // const r = new Raycaster();
        // const worldY = new Vector3();
        // l.matrixWorld.extractBasis(new Vector3(), worldY, new Vector3());
        // r.set(l.getWorldPosition(new Vector3()), worldY);
        // console.log(mines);
        // const i = r.intersectObjects(mines.children);
        // console.log(i);
        // i.forEach((o) => o.object.parent?.remove(o.object));
        // if (
        //   l.position.x < -10 ||
        //   l.position.x > 10 ||
        //   l.position.y < -5 ||
        //   l.position.y > 5
        // )
        //   l.parent?.remove(l);
      });
    }
  );

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
      <RigidBody>
        <group ref={lasers}></group>
      </RigidBody>
    </group>
  );
};

export { Lasers };
