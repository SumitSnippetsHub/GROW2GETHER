import localFont from "next/font/local";

// Self-hosted latin files. Vercel never has to fetch Google Fonts at build time.
export const monaSans = localFont({
  src: "./fonts/mona-sans.woff2",
  weight: "200 900",
  display: "swap",
  variable: "--font-mona",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const jost = localFont({
  src: [
    { path: "./fonts/jost.woff2", weight: "400 600", style: "normal" },
    { path: "./fonts/jost-italic.woff2", weight: "400 600", style: "italic" },
  ],
  display: "swap",
  variable: "--font-jost",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const instrumentSerif = localFont({
  src: [
    { path: "./fonts/instrument-serif.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-italic.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
  variable: "--font-instrument",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono.woff2",
  weight: "400 500",
  display: "swap",
  variable: "--font-jetbrains",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
