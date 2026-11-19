import { projectStills } from "@/data/images";
import type { ImageAsset } from "@/lib/types";

export const serviceCovers: Record<string, { category: string; image: ImageAsset }> = {
  "website-development": { category: "Websites", image: projectStills.zenmen },
  "web-design": { category: "Websites", image: projectStills.anuraagKaushik },
  "website-redesign": { category: "Websites", image: projectStills.tyagiAssociates },
  "website-development-delhi": { category: "Websites", image: projectStills.tyagRaj },
  "ecommerce-development": { category: "Shops", image: projectStills.silverStitch },
  "shopify-development": { category: "Shops", image: projectStills.blessingMens },
  "web-application-development": { category: "Apps", image: projectStills.seatsBrokers },
  "custom-software-development": { category: "Apps", image: projectStills.seatsConnect },
  "nextjs-development": { category: "Apps", image: projectStills.zynovate },
  "ui-ux-design": { category: "Apps", image: projectStills.anuraagKaushik },
  "business-automation": { category: "Ongoing", image: projectStills.seatsGroup },
  "website-maintenance": { category: "Ongoing", image: projectStills.zenmen },
};
