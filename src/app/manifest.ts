import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.metaDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "en-IN",
    icons: [
      { src: "/favicon.png", sizes: "64x64", type: "image/png" },
      { src: "/brand/grow2gether-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
