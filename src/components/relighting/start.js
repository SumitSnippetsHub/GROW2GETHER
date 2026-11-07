import {
  AgXToneMapping,
  Color,
  OrthographicCamera,
  Scene,
  WebGPURenderer,
} from "three/webgpu";
import { getDemo } from "./demos.js";
import { setLightView, setupLight } from "./effect/light.js";
import { createPlane } from "./effect/plane.js";
import { setupTextures } from "./effect/textures.js";

const MAX_PIXEL_RATIO = 2;
const VIEW_HEIGHT = 4;

export async function startRelighting(container, demoId = "maker") {
  if (!container) throw new Error("Missing relighting container");
  if (!navigator.gpu) throw new Error("WebGPU is not available");

  const renderer = new WebGPURenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, MAX_PIXEL_RATIO));
  renderer.toneMapping = AgXToneMapping;

  container.replaceChildren();
  container.append(renderer.domElement);
  await renderer.init();

  const demo = getDemo(demoId);
  demo.setUniforms?.();
  await setupTextures(demo);

  const scene = new Scene();
  scene.background = new Color("#000000");

  const camera = new OrthographicCamera();
  camera.position.set(0, 0, 5);

  const disposeLight = setupLight(scene, camera);

  const plane = createPlane();
  scene.add(plane);

  function viewRect() {
    const rect = renderer.domElement.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) return rect;
    return container.getBoundingClientRect();
  }

  function onResize() {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    const aspect = width / height;

    renderer.setPixelRatio(Math.min(devicePixelRatio, MAX_PIXEL_RATIO));
    renderer.setSize(width, height);

    camera.top = VIEW_HEIGHT * 0.5;
    camera.bottom = -camera.top;
    camera.right = camera.top * aspect;
    camera.left = -camera.right;
    camera.updateProjectionMatrix();
    plane.scale.set(VIEW_HEIGHT * aspect, VIEW_HEIGHT, 1);

    const rect = viewRect();
    setLightView({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    });
  }

  onResize();

  const observer = new ResizeObserver(onResize);
  observer.observe(container);
  addEventListener("resize", onResize);

  renderer.setAnimationLoop(() => {
    const rect = viewRect();
    setLightView({
      left: rect.left,
      top: rect.top,
      width: rect.width || 1,
      height: rect.height || 1,
    });
    renderer.render(scene, camera);
  });

  let loadToken = 0;

  return {
    async setDemo(id) {
      const token = ++loadToken;
      const next = getDemo(id);
      next.setUniforms?.();
      await setupTextures(next);
      if (token !== loadToken) return;
    },
    dispose() {
      loadToken += 1;
      renderer.setAnimationLoop(null);
      observer.disconnect();
      removeEventListener("resize", onResize);
      disposeLight();
      scene.remove(plane, ...scene.children);
      plane.geometry.dispose();
      plane.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
