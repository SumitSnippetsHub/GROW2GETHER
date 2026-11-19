import type { ImageAsset } from "@/lib/types";

export const projectStills = {
  seatsBrokers: shot("/projects/seats-brokers.webp", "SeatsBrokers homepage — technology powering professional broker operations"),
  seatsConnect: shot("/projects/seats-connect.webp", "SeatsConnect homepage — global events, one B2B connection"),
  silverStitch: shot("/projects/silver-stitch.webp", "The Silver Stitch homepage — The Collection of handcrafted designer blouses"),
  tyagRaj: shot("/projects/tyag-raj-law-firm.webp", "Tyag Raj Law Firm homepage — advocates Sumit Tyagi and Vishaw Pratap"),
  tyagiAssociates: shot("/projects/tyagi-and-associates.webp", "Tyagi & Associates homepage — advocates and legal consultants in Delhi NCR"),
  zenmen: shot("/projects/zenmen.webp", "Zenmen homepage — Command Every Room, bespoke tailoring"),
  blessingMens: shot("/projects/blessing-mens.webp", "Blessings Mens Boutique homepage — Crafted for the Modern Groom"),
  anuraagKaushik: shot("/projects/anuraag-kaushik.webp", "Anuraag Kaushik homepage — bridal beauty, gilded with quiet drama"),
  seatsGroup: shot("/projects/seats-group.webp", "SeatsGroup homepage — powering the future of ticketing and live experiences"),
  zynovate: shot("/projects/zynovate.webp", "Zynovate homepage — Build. Launch. Evolve."),
} satisfies Record<string, ImageAsset>;

function shot(src: string, alt: string): ImageAsset {
  return { src, width: 1920, height: 1080, alt };
}
