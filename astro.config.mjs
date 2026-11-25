// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Dirección pública del sitio en GitHub Pages.
// Cuando se publique desde la cuenta del Tec, cambien SITE por https://<usuario>.github.io
const SITE = 'https://bestshortedition.github.io';
const BASE = '/curso-nu-tec';

export default defineConfig({
	site: SITE,
	base: BASE,
	trailingSlash: 'always',
	integrations: [mdx(), sitemap()],
});
