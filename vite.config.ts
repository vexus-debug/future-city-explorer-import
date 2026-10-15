// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  plugins: [
    {
      name: "strip-city-scene-source-markers",
      enforce: "pre",
      transform(code, id) {
        if (!id.replace(/\\/g, "/").includes("/src/components/city/CityScene.tsx")) return null;
        const withoutSourceMarkers = code.replace(/\sdata-tsd-source="[^"]*"/g, "");
        return withoutSourceMarkers === code ? null : withoutSourceMarkers;
      },
    },
  ],
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
