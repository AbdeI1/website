"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Color,
  Layers,
  Material,
  Mesh,
  MeshBasicMaterial,
  ShaderMaterial,
  Vector2,
  Vector3,
} from "three";
import {
  EffectComposer,
  OutputPass,
  RenderPass,
  ShaderPass,
  UnrealBloomPass,
} from "three/examples/jsm/Addons.js";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";

const BloomPipeline = () => {
  const { gl: renderer, scene, camera } = useThree();

  const bloomLayer = new Layers();
  bloomLayer.set(1);

  const renderScene = new RenderPass(scene, camera);

  const bloomPass = new UnrealBloomPass(
    new Vector2(window.innerWidth, window.innerHeight),
    0.5,
    0.1,
    0
  );

  const bloomComposer = new EffectComposer(renderer);
  bloomComposer.renderToScreen = false;
  bloomComposer.addPass(renderScene);
  bloomComposer.addPass(bloomPass);

  const mixPass = new ShaderPass(
    new ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D baseTexture;
        uniform sampler2D bloomTexture;
        varying vec2 vUv;
        void main() {
          gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
        }
      `,
      defines: {},
    }),
    "baseTexture"
  );
  mixPass.needsSwap = true;

  const outputPass = new OutputPass();

  const finalComposer = new EffectComposer(renderer);
  finalComposer.addPass(renderScene);
  finalComposer.addPass(mixPass);
  finalComposer.addPass(outputPass);

  const transparentMaterial = new MeshBasicMaterial({
    opacity: 0,
    transparent: true,
  });

  useFrame(({ scene }) => {
    const materials: { [key: string]: Material | Material[] } = {};
    scene.traverse((obj) => {
      const mesh = obj as Mesh;
      if (mesh.isMesh && !bloomLayer.test(mesh.layers)) {
        materials[mesh.uuid] = mesh.material;
        mesh.material = transparentMaterial;
      }
    });
    bloomComposer.render();
    scene.traverse((obj) => {
      const mesh = obj as Mesh;
      if (materials[mesh.uuid]) {
        mesh.material = materials[mesh.uuid];
      }
    });
    finalComposer.render();
  }, 2);

  return <></>;
};

const Star = ({
  position = new Vector3(0, 0, 0),
  velocity = new Vector3(0, 0, 0),
  scale = 1,
  color = new Color(1, 1, 1),
}: {
  position?: Vector3;
  velocity?: Vector3;
  scale?: number;
  color?: Color;
}) => {
  const star = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    star.current.position.x += velocity.x * delta;
    star.current.position.y += velocity.y * delta;
    if (star.current.position.x < -10) star.current.position.x = 10;
    if (star.current.position.x > 10) star.current.position.x = -10;
    if (star.current.position.y < -5) star.current.position.y = 5;
    if (star.current.position.y > 5) star.current.position.y = -5;
  });

  const bloomLayer = new Layers();
  bloomLayer.enable(1);
  return (
    <mesh ref={star} layers={bloomLayer} scale={scale} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
};

export default function SpaceInvaders() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw", background: "black" }}>
      <ambientLight intensity={2} />
      <BloomPipeline />
      {Array.from({ length: 500 }).map((_, i) => (
        <Star
          key={i}
          scale={Math.random() * 0.02 + 0.01}
          position={
            new Vector3(Math.random() * 20 - 10, Math.random() * 10 - 5, 0)
          }
          velocity={new Vector3(
            Math.random() * 0.5 - 0.25,
            Math.random() * 0.5 - 0.25,
            0
          ).multiplyScalar(2)}
          color={
            new Color(
              Math.random() * 0.5 + 0.7,
              Math.random() * 0.5 + 0.7,
              Math.random() * 0.5 + 0.7
            )
          }
        />
      ))}
    </Canvas>
  );
}
