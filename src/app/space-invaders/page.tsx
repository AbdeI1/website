"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Layers,
  Material,
  Mesh,
  MeshBasicMaterial,
  ShaderMaterial,
  Vector2,
} from "three";
import {
  EffectComposer,
  OutputPass,
  RenderPass,
  ShaderPass,
  UnrealBloomPass,
} from "three/examples/jsm/Addons.js";
import { OrbitControls } from "@react-three/drei";

const BloomPipeline = () => {
  const { gl: renderer, scene, camera } = useThree();

  const bloomLayer = new Layers();
  bloomLayer.set(1);

  const renderScene = new RenderPass(scene, camera);

  const bloomPass = new UnrealBloomPass(
    new Vector2(window.innerWidth, window.innerHeight),
    1,
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
  }, 1);

  return <></>;
};

export default function SpaceInvaders() {
  const bloomLayer = new Layers();
  bloomLayer.enable(1);
  return (
    <Canvas style={{ height: "100vh", width: "100vw", background: "black" }}>
      <ambientLight intensity={1} />
      <directionalLight color="white" intensity={1} position={[1, 1, 1]} />
      <directionalLight color="white" intensity={1} />
      <BloomPipeline />
      <OrbitControls />
      <mesh layers={bloomLayer} scale={0.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial color="#60efff" />
      </mesh>
    </Canvas>
  );
}
