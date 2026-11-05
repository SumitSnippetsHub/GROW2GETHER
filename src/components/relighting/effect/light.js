import { frameGroup, uniform } from "three/tsl";
import { AmbientLight, PointLight } from "three/webgpu";
import { gui } from "../debug.js";

const MAX_DECAY = 4;

export const pointLight = new PointLight("#e1ded1", 2.35, 0, 1);
pointLight.position.set(1.2, 0.8, 0.9);
Object.defineProperty(pointLight.userData, "radius", {
  get: () => MAX_DECAY - pointLight.decay,
  set: (radius) => {
    pointLight.decay = MAX_DECAY - radius;
  },
});

export const ambientLight = new AmbientLight("#ffffff", 0.3);

export const uLightPosition = uniform(pointLight.position).setGroup(frameGroup);

let view = { left: 0, top: 0, width: 1, height: 1 };
let cameraRef = null;
const pointer = { x: 0, y: 0, has: false };

function applyPointer() {
  if (!cameraRef || !pointer.has || view.width === 0 || view.height === 0) return;

  const x = (pointer.x - view.left) / view.width;
  const y = (pointer.y - view.top) / view.height;
  const ndcX = x * 2 - 1;
  const ndcY = -(y * 2 - 1);
  pointLight.position.x = ndcX * cameraRef.right;
  pointLight.position.y = ndcY * cameraRef.top;
}

export function setLightView(next) {
  view = next;
  applyPointer();
}

export function setupLight(scene, camera) {
  cameraRef = camera;
  scene.add(pointLight, ambientLight);

  const onMove = (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.has = true;
    applyPointer();
  };

  addEventListener("pointermove", onMove);
  addEventListener("pointerdown", onMove);

  const light = gui.addFolder("Light").close();
  light.addColor(pointLight, "color").name("color");
  light.add(pointLight, "intensity", 0, 12, 0.05).name("brightness");
  light.add(pointLight.userData, "radius", 0, MAX_DECAY, 0.05).name("radius");
  light.add(pointLight.position, "z", -0.5, 4, 0.01).name("elevation");
  light.add(ambientLight, "intensity", 0, 4, 0.05).name("ambient");

  return () => {
    cameraRef = null;
    pointer.has = false;
    removeEventListener("pointermove", onMove);
    removeEventListener("pointerdown", onMove);
  };
}
