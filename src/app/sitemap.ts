import type { MetadataRoute } from "next";
import { clinic } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/modern", "/noir"].map((p, i) => ({
    url: `${clinic.website}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: i === 0 ? 1 : 0.6,
  }));
}
