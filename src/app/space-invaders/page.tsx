import Script from "next/script";

export default function SpaceInvaders() {
  return (
    <>
      <Script type="module" src="./index.js"></Script>
      <canvas id="gfxCanvas"></canvas>
    </>
  );
}
