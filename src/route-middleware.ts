import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

/**
 * Agrega la imagen de vista previa (Open Graph) que ve la gente cuando
 * alguien manda un byte por WhatsApp. Hay una imagen por tema en public/og/.
 */
export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const tema = route.entry.data.tema ?? 'general';
	const imagen = new URL(`${import.meta.env.BASE_URL}og/${tema}.png`, context.site).href;
	route.head.push(
		{ tag: 'meta', attrs: { property: 'og:image', content: imagen } },
		{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
		{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
		{ tag: 'meta', attrs: { property: 'og:image:alt', content: route.entry.data.title } },
		{ tag: 'meta', attrs: { name: 'twitter:image', content: imagen } },
	);
});
