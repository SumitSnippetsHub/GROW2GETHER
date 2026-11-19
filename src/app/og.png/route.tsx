import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const dynamic = "force-static";

export async function GET() {
  const logo = await readFile(join(process.cwd(), "public", site.logo.src));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const domain = new URL(site.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#111111",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={300} height={74} alt="" />
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#6b6b6b" }}>
            India · Delhi-NCR
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1.04, letterSpacing: -3, fontWeight: 600, maxWidth: 980 }}>
            Websites, shops & apps, built individually.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#555555" }}>
            Fixed price before we start · Free 30-minute call
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #111111",
            paddingTop: 28,
            fontSize: 28,
          }}
        >
          <div style={{ display: "flex" }}>{domain}</div>
          <div style={{ display: "flex", background: "#111111", color: "#ffffff", padding: "12px 28px", borderRadius: 999 }}>
            {"Let's build it together"}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
