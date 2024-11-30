import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh } from "three";

const Mines = () => {
  const mine = useRef<Mesh>(null!);
  const mines = useRef<Group>(null!);

  const spawnInterval = 5;

  let spawnTimer = 0;

  useFrame((state, delta) => {
    spawnTimer += delta;

    if (spawnTimer > spawnInterval) {
      const m = mine.current.clone();
      m.position.set(0, 0, 0);
      m.rotation.z =
        state.pointer.angle() + ((Math.random() * Math.PI) / 3 - Math.PI / 6);
      m.translateX(5);
      m.visible = true;
      mines.current.add(m);

      spawnTimer = 0;
    }

    mines.current.children.forEach((mine) => {
      mine.rotation.z += delta;
      mine.userData.timer += delta;

      if (mine.userData.timer >= 15) mine.parent?.remove(mine);
    });
  });

  return (
    <group>
      <mesh
        ref={mine}
        visible={false}
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