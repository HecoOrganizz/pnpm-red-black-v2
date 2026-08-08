import type { MetadataRoute } from "next";

const SITE_URL = "https://heco.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/search"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
