import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "https://propuestaprestige.lovable.app";
const PAGES = ["", "/about", "/services", "/projects", "/contact"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const now = new Date().toISOString();

        const urls = PAGES.map((page) =>
          [
            "  <url>",
            "    <loc>" + BASE_URL + page + "</loc>",
            "    <lastmod>" + now + "</lastmod>",
            "    <changefreq>weekly</changefreq>",
            "    <priority>" + (page === "" ? "1.0" : "0.8") + "</priority>",
            "  </url>",
          ].join("\n"),
        ).join("\n");

        const sitemap =
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          urls +
          "\n</urlset>";

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
