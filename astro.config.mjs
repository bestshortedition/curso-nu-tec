// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Dirección pública del sitio en GitHub Pages.
// Si cambian el nombre del repositorio, cambien también `base`.
const SITE = 'https://bestshortedition.github.io';
const BASE = '/curso-nu-tec';

export default defineConfig({
	site: SITE,
	base: BASE,
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'Bytes de dinero',
			description:
				'Curso corto de educación financiera para jóvenes que están por cumplir 18. Nu × Tec de Monterrey.',
			defaultLocale: 'root',
			locales: { root: { label: 'Español', lang: 'es-MX' } },
			logo: { src: './src/assets/nu_purple.png', alt: 'Nu' },
			// Un byte se lee en 1 a 2 minutos: no hace falta índice ni buscador.
			tableOfContents: false,
			pagefind: false,
			credits: false,
			customCss: ['@fontsource-variable/inter', './src/styles/nu.css'],
			head: [
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#820AD1' } },
				{ tag: 'link', attrs: { rel: 'icon', href: `${BASE}/favicon.svg`, type: 'image/svg+xml' } },
			],
			routeMiddleware: './src/route-middleware.ts',
			components: {
				ThemeProvider: './src/overrides/ThemeProvider.astro',
				ThemeSelect: './src/overrides/ThemeSelect.astro',
				SiteTitle: './src/overrides/SiteTitle.astro',
				PageTitle: './src/overrides/PageTitle.astro',
				Footer: './src/overrides/Footer.astro',
			},
			// Menú lateral. Para agregar un tema nuevo, copien el bloque de Crédito.
			sidebar: [
				{ label: 'Inicio', link: '/' },
				{
					label: '1. Crédito: tarjeta y préstamo',
					items: [
						{ label: 'Empieza aquí', link: '/credito/' },
						{ slug: 'credito/limite' },
						{ slug: 'credito/fecha-de-corte' },
						{ slug: 'credito/pago-minimo' },
						{ slug: 'credito/intereses-y-cat' },
						{ slug: 'credito/meses-sin-intereses' },
						{ slug: 'credito/prestamo-personal' },
						{ slug: 'credito/cierre' },
					],
				},
				{ label: 'Fuentes', link: '/fuentes/' },
				{ label: 'Sobre el curso', link: '/sobre-el-curso/' },
			],
		}),
	],
});
