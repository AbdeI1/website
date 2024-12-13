import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh, Vector3 } from "three";

const Mines = () => {
  const mine = useRef<Mesh>(null!);
  const mines = useRef<Group>(null!);

  const spawnInterval = 5;

  let spawnTimer = 0;

  const { scene } = useThree();
  scene.userData.minesRef = mines;

  useFrame(
    (
      {
        pointer,
        scene: {
          userData: { shipSpeed },
        },
      },
      delta
    ) => {
      spawnTimer += delta;

      if (spawnTimer > spawnInterval) {
        const m = mine.current.clone();
        m.position.set(0, 0, 0);
        m.rotation.z =
          pointer.angle() + ((Math.random() * Math.PI) / 3 - Math.PI / 6);
        m.translateX(5);
        m.visible = true;
        mines.current.add(m);

        spawnTimer = 0;
      }

      mines.current.children.forEach((mine) => {
        mine.position.addScaledVector(
          new Vector3(pointer.x, pointer.y, 0),
          delta * shipSpeed * -1
        );
        mine.position.addScaledVector(mine.position, delta * 0.1 * -1);
        mine.rotation.z += delta;
        mine.userData.timer += delta;

        if (mine.userData.timer >= 15) mine.parent?.remove(mine);
      });
    }
  );

  return (
    <group>
      <mesh
        ref={mine}
        visible={true}
        position={[100, 100, 100]}
        userData={{
          timer: 0,
        }}
      >
        <octahedronGeometry />
        <meshStandardMaterial />
      </mesh>
      <group ref={mines}></group>
    </group>
  );
};

export { Mines };
