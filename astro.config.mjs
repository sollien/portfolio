import { defineConfig, passthroughImageService } from 'astro/config'
import tailwind from "@astrojs/tailwind"
import svelte from "@astrojs/svelte"
import mdx from "@astrojs/mdx"
import { fileURLToPath } from "node:url"

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), svelte(), mdx()],
	output: "static",
	vite: {
		resolve: {
			alias: {
				$lib: fileURLToPath(new URL("./src/lib", import.meta.url)),
			},
		},
	},
	image: {
		service: passthroughImageService(),
	},
	prefetch: true,
});