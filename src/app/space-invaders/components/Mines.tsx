import { useFrame, useThree } from "@react-three/fiber";
import { InstancedRigidBodies, RapierRigidBody, vec3, quat, euler, RigidBody } from "@react-three/rapier";
import { RefObject, useMemo, useRef, useState, createRef } from "react";
import { Euler, Group, Mesh, Vector3 } from "three";

const Mines = () => {
  // const mine = useRef<Mesh>(null!);

  const [mines, setMines] = useState<any[]>([]);

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

      const remove = new Set()
      mines.forEach(m => {
        if (m.ref.current.userData == undefined) m.ref.current.userData = { timer: 0 };
        m.ref.current.userData.timer += delta;
        if (m.ref.current.userData.timer >= 15) remove.add(m.key)
      })

      let refreshMines = remove.size > 0;
      let newMines = mines.filter(m => !remove.has(m.key))

      spawnTimer += delta;

      if (spawnTimer > spawnInterval) {
        refreshMines = true;
        newMines.push({
          key: crypto.randomUUID(),
          ref: createRef<RapierRigidBody>()
        });
        spawnTimer = 0;
      }
      console.log(newMines.length)

      if (refreshMines) setMines(newMines);
    }
  );

  return (
    <group>
      {
        mines.map(m => 
          <RigidBody key={m.key} ref={m.ref} type="fixed">
            <mesh>
              <octahedronGeometry />
              <meshStandardMaterial />
            </mesh>
          </RigidBody>
        )
      }
      {/* <InstancedRigidBodies
        ref={rigidBodies}
        type="fixed"
        instances={mines}
      >
        <instancedMesh args={[null!, null!, 20]}>
          <octahedronGeometry />
          <meshStandardMaterial />
        </instancedMesh>
      </InstancedRigidBodies> */}
      {/* <mesh
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
      <RigidBody>
        <mesh
          visible={true}
          position={[0, 0, 0]}
          userData={{
            timer: 0,
          }}
        >
          <octahedronGeometry />
          <meshStandardMaterial />
        </mesh>
        <group ref={mines}></group>
      </RigidBody> */}
    </group>
  );
};

export { Mines };
