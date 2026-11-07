export const relightingScenes = [
  {
    id: "maker",
    label: "Maker",
    map: "/textures/sumit.jpg",
    depth: "/textures/sumit-depth.png",
    title: "The work has a face.",
    hint: "Your cursor is the torch.",
  },
  {
    id: "anuraag",
    label: "Anuraag",
    map: "/textures/anuraag.jpg",
    depth: "/textures/anuraag-depth.png",
    title: "Look closer.",
    hint: "The portrait waits in the dark.",
  },
] as const;

export type RelightingSceneId = (typeof relightingScenes)[number]["id"];
