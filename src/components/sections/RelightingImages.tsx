"use client";

import { useEffect, useRef, useState } from "react";

const DEMOS = [
  { id: "demo1", label: "demo 1" },
  { id: "demo2", label: "demo 2" },
  { id: "demo3", label: "demo 3" },
] as const;

type RelightingApi = {
  setDemo: (id: string) => Promise<void>;
  dispose: () => void;
};

export function RelightingImages() {
  const appRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<RelightingApi | null>(null);
  const [demo, setDemo] = useState<(typeof DEMOS)[number]["id"]>("demo1");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = appRef.current;
    if (!container) return;

    let cancelled = false;

    void (async () => {
      try {
        const { startRelighting } = await import("@/components/relighting/start.js");
        const api = await startRelighting(container, demo);
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
    // Start once; demo changes go through setDemo on the running renderer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="relighting" className="relighting" aria-label="Relightning Images">
      <div ref={appRef} className="relighting-app" />
      {failed ? (
        <img className="relighting-fallback" src="/textures/wall.jpg" alt="" />
      ) : null}
      <aside className="relighting-info">
        <h2>Relightning Images by Dominik Fojcik</h2>
        <nav className="relighting-project-links" aria-label="Project links">
          <a href="https://tympanus.net/codrops/?p=119000" target="_blank" rel="noreferrer">
            Article
          </a>
          <a href="https://github.com/DGFX/codrops-relightning-images" target="_blank" rel="noreferrer">
            Code
          </a>
          <a href="https://tympanus.net/codrops/demos/" target="_blank" rel="noreferrer">
            All Demos
          </a>
        </nav>
        <nav className="relighting-tags" aria-label="Tags">
          <a href="https://tympanus.net/codrops/demos/?tag=3d" target="_blank" rel="noreferrer">
            #3d
          </a>
          <a href="https://tympanus.net/codrops/demos/?tag=three-js" target="_blank" rel="noreferrer">
            #three.js
          </a>
        </nav>
      </aside>
      <nav className="relighting-nav" aria-label="Relightning demos">
        {DEMOS.map((item) => (
          <a
            key={item.id}
            href="#relighting"
            className={item.id === demo ? "active" : undefined}
            onClick={(event) => {
              event.preventDefault();
              setDemo(item.id);
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
