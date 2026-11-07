"use client";

import { useEffect, useRef, useState } from "react";
import { relightingScenes, type RelightingSceneId } from "@/data/relighting";

type RelightingApi = {
  setDemo: (id: string) => Promise<void>;
  dispose: () => void;
};

export function RelightingImages() {
  const appRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<RelightingApi | null>(null);
  const [sceneId, setSceneId] = useState<RelightingSceneId>(relightingScenes[0].id);
  const [failed, setFailed] = useState(false);
  const scene = relightingScenes.find((item) => item.id === sceneId) ?? relightingScenes[0];

  useEffect(() => {
    const container = appRef.current;
    if (!container) return;

    let cancelled = false;

    void (async () => {
      try {
        const { startRelighting } = await import("@/components/relighting/start.js");
        const api = await startRelighting(container, sceneId);
        if (cancelled) {
          api.dispose();
          return;
        }
        apiRef.current = api;
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      apiRef.current?.dispose();
      apiRef.current = null;
    };
    // Start once; scene changes go through setDemo on the running renderer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="relighting" className="relighting" aria-label="Light the work">
      <div ref={appRef} className="relighting-app" />
      {failed ? <img className="relighting-fallback" src={scene.map} alt="" /> : null}
      <p className="relighting-brand">grow2gether</p>
      <div className="relighting-copy">
        <h2>{scene.title}</h2>
        <p>{scene.hint}</p>
      </div>
      <nav className="relighting-nav" aria-label="Work to light">
        {relightingScenes.map((item) => (
          <a
            key={item.id}
            href="#relighting"
            className={item.id === sceneId ? "active" : undefined}
            onClick={(event) => {
              event.preventDefault();
              setSceneId(item.id);
              void apiRef.current?.setDemo(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </section>
  );
}
