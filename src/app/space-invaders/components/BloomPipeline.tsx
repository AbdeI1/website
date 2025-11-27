import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

const BloomPipeline = ({
  size = KernelSize.MEDIUM,
  intensity = 30,
  threshold = 1,
}) => (
  <EffectComposer>
    <Bloom
      intensity={intensity}
      luminanceThreshold={threshold}
      kernelSize={size}
    />
  </EffectComposer>
);

export { BloomPipeline };
