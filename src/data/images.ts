import type { ImageAsset } from "@/lib/types";

const unsplash = (id: string, width: number, height: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;

export const images = {
  /** Open Graph / Twitter card: the hero photo cropped to 1200×630. */
  og: {
    src: unsplash("photo-1497366216548-37526070297c", 1200, 630),
    width: 1200,
    height: 630,
    alt: "grow2gether — websites, shops and apps.",
    credit: "Unsplash",
    isPlaceholder: true,
  },
  /** Decorative section backgrounds: empty alt so screen readers skip them. */
  why: {
    src: unsplash("photo-1618221195710-dd6b41faaea6", 2400, 1600),
    width: 2400,
    height: 1600,
    alt: "",
    credit: "Unsplash",
    isPlaceholder: true,
  },
} satisfies Record<string, ImageAsset>;

export const projectStills = {
  seatsBrokers: shot("/projects/seats-brokers.jpg", "SeatsBrokers homepage — technology powering professional broker operations"),
  seatsConnect: shot("/projects/seats-connect.jpg", "SeatsConnect homepage — global events, one B2B connection"),
  silverStitch: shot("/projects/silver-stitch.jpg", "The Silver Stitch homepage — The Collection of handcrafted designer blouses"),
  tyagRaj: shot("/projects/tyag-raj-law-firm.png", "Tyag Raj Law Firm homepage — advocates Sumit Tyagi and Vishaw Pratap"),
  tyagiAssociates: shot("/projects/tyagi-and-associates.png", "Tyagi & Associates homepage — advocates and legal consultants in Delhi NCR"),
  zenmen: shot("/projects/zenmen.jpg", "Zenmen homepage — Command Every Room, bespoke tailoring"),
  blessingMens: shot("/projects/blessing-mens.jpg", "Blessings Mens Boutique homepage — Crafted for the Modern Groom"),
  anuraagKaushik: shot("/projects/anuraag-kaushik.png", "Anuraag Kaushik homepage — bridal beauty, gilded with quiet drama"),
  seatsGroup: shot("/projects/seats-group.jpg", "SeatsGroup homepage — powering the future of ticketing and live experiences"),
  zynovate: shot("/projects/zynovate.jpg", "Zynovate homepage — Build. Launch. Evolve."),
} satisfies Record<string, ImageAsset>;

function shot(src: string, alt: string): ImageAsset {
  return { src, width: 1920, height: 1080, alt };
}
