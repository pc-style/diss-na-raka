import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://latwo-x-cancerfighters.pcstyle.dev/sitemap.xml",
    host: "https://latwo-x-cancerfighters.pcstyle.dev",
  };
}
