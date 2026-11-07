import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

/**
 * Local development plugin: mocks Vercel's /api/geo endpoint on localhost.
 * Defaults to 'ID', but respects ?country=AU or ?geo=CA query parameters for easy testing.
 */
function devGeoPlugin(): Plugin {
  return {
    name: "dev-geo-api",
    configureServer(server) {
      server.middlewares.use("/api/geo", (req, res) => {
        const url = new URL(
          req.url || "",
          `http://${req.headers.host || "localhost"}`
        );
        const override =
          url.searchParams.get("country") || url.searchParams.get("geo");
        const country = (override || "ID").toUpperCase();
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ country }));
      });
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), react(), devGeoPlugin()],
});
