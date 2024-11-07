import { defineConfig } from 'astro/config'
import tailwind from "@astrojs/tailwind"
import netlify from "@astrojs/netlify"
import svelte from "@astrojs/svelte"
import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), svelte(), mdx()],
	output: "server",
	adapter: netlify(),
	prefetch: true,
});