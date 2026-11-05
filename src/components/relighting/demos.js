import { depthSmoothing } from "./effect/depth-map.js";
import { ambientLight, pointLight } from "./effect/light.js";
import {
  uDetailScale,
  uDisplacementScale,
  uNormalScale,
} from "./effect/nodes/normal.js";
import { uShadowIntensity, uShadowSoftness } from "./effect/nodes/shadow.js";

function resetShared() {
  uShadowIntensity.value = 0.86;
  pointLight.intensity = 2.35;
  pointLight.position.x = 1.2;
  pointLight.position.y = 0.8;
}

const DEMOS = {
  demo1: {
    map: "/textures/wall.jpg",
    depth: "/textures/wall-depth.webp",
    setUniforms() {
      resetShared();
      depthSmoothing.percent = 1.3;
      uDisplacementScale.value = 4;
      uNormalScale.value = 3;
      uDetailScale.value = 3;
      uShadowSoftness.value = 0.092;
      pointLight.color.set("#e1ded1");
      pointLight.decay = 1;
      pointLight.position.z = 0.9;
      ambientLight.intensity = 0.3;
    },
  },
  demo2: {
    map: "/textures/relief.jpg",
    depth: "/textures/relief-depth.webp",
    setUniforms() {
      resetShared();
      depthSmoothing.percent = 0.6;
      uDisplacementScale.value = 0.905;
      uNormalScale.value = 0.86;
      uDetailScale.value = 0.83;
      uShadowIntensity.value = 0.55;
      uShadowSoftness.value = 0.164;
      pointLight.color.set("#ffcb8f");
      pointLight.decay = 2.95;
      pointLight.position.z = 0.77;
      ambientLight.intensity = 0;
    },
  },
  demo3: {
    map: "/textures/mother.jpg",
    depth: "/textures/mother-depth.webp",
    setUniforms() {
      resetShared();
      depthSmoothing.percent = 0.5;
      uDisplacementScale.value = 1.9;
      uNormalScale.value = 2.16;
      uDetailScale.value = 0.7;
      uShadowSoftness.value = 0.152;
      pointLight.color.set("#e7dcd0");
      pointLight.intensity = 10.1;
      pointLight.decay = 3.8;
      pointLight.position.z = 1.97;
      ambientLight.intensity = 0.02;
    },
  },
};

export function getDemo(id) {
  return DEMOS[id] ?? DEMOS.demo1;
}
