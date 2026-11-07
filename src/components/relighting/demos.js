import { relightingScenes } from "@/data/relighting";
import { depthSmoothing } from "./effect/depth-map.js";
import { ambientLight, pointLight } from "./effect/light.js";
import {
  uDetailScale,
  uDisplacementScale,
  uNormalScale,
} from "./effect/nodes/normal.js";
import { uShadowIntensity, uShadowSoftness } from "./effect/nodes/shadow.js";

function portrait() {
  depthSmoothing.percent = 0.5;
  uDisplacementScale.value = 1.9;
  uNormalScale.value = 2.16;
  uDetailScale.value = 0.7;
  uShadowIntensity.value = 0.86;
  uShadowSoftness.value = 0.152;
  pointLight.color.set("#e7dcd0");
  pointLight.intensity = 10.1;
  pointLight.decay = 3.8;
  pointLight.position.set(1.2, 0.8, 1.97);
  ambientLight.intensity = 0.02;
}

export const SCENES = relightingScenes.map((scene) => ({
  ...scene,
  setUniforms: portrait,
}));

export function getDemo(id) {
  return SCENES.find((scene) => scene.id === id) ?? SCENES[0];
}
