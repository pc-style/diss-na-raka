import type { MetadataRoute } from "next";

const BASE_URL = "https://latwo-x-cancerfighters.pcstyle.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
