import { useRef } from "react";
import { Euler, Mesh, Quaternion, Vector3 } from "three";

import { useFrame, useLoader } from "@react-three/fiber";

import { Lasers } from "./Lasers";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Clone, Sphere } from "@react-three/drei";

const Ship = () => {
  const ship = useRef<Mesh>(null!);
  const rigid = useRef<RapierRigidBody>(null);

  const gltf = useLoader(GLTFLoader, "shipModel/scene.txt");

  useFrame((state) => {
    ship.current.lookAt(new Vector3(state.pointer.x, state.pointer.y, 1));

    rigid.current?.setTranslation(ship.current.position, true);
    rigid.current?.setRotation(ship.current.quaternion, true);
  });

  return (
    <group>
      <group position={[0, 0, 1]} scale={0.4}>
        <RigidBody
          ref={rigid}
          includeInvisible
          sensor
          colliders="hull"
          onCollisionEnter={(payload) => console.log(payload)}
          onCollisionExit={(payload) => console.log(payload)}
        >
          <Clone object={gltf.scene} visible={false} />
        </RigidBody>
        <mesh ref={ship} up={[0, 0, 1]}>
          <Clone object={gltf.scene} />
        </mesh>
      </group>
      <Lasers ship={ship} />
    </group>
  );
};

export { Ship };
