import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Cada lección es un archivo .mdx en src/content/lecciones/<modulo>/<slug>.mdx
 * El nombre del archivo debe ser el mismo `slug` que tiene en src/data/temario.ts.
 * Si falta un campo obligatorio, `npm run build` falla y dice cuál.
 */
const lecciones = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/lecciones' }),
	schema: z.object({
		/** Número de la lección en el temario, por ejemplo "4.5". */
		numero: z.string().regex(/^[1-5]\.\d+$/, 'Usa el formato "4.5"'),
		/** Una frase para la vista previa de WhatsApp. */
		descripcion: z.string().max(160),
		/** Minutos de lectura: 1 o 2. */
		minutos: z.union([z.literal(1), z.literal(2)]),
		/** La primera pantalla: de qué trata el tema y qué duda se va a resolver. */
		duda: z.object({
			/** La duda, como pregunta corta. */
			pregunta: z.string().max(90),
			/** El tema en general, en 1 o 2 frases. */
			tema: z.string().max(220),
			/** Cita TEXTUAL de un joven entrevistado (CLAUDE.md, sección 3). No inventar citas. */
			cita: z.object({ texto: z.string(), quien: z.string() }).optional(),
			/** Cuántos de los 25 entrevistados tienen esta duda. Texto EXACTO de CLAUDE.md, sección 3. */
			cifra: z
				.object({
					texto: z.string(),
					/** Cuántos tienen la duda (para dibujar las personas). */
					n: z.number().int().min(0),
					/** De cuántos. */
					de: z.number().int().min(1),
				})
				.optional(),
		}),
		/** La acción concreta de hoy. */
		accion: z.string(),
		/** "En corto": lo más importante de la lección en 2 o 3 frases cortas. Va al final. */
		resumen: z.array(z.string().max(120)).min(2).max(3),
		/** Palabras del glosario (src/data/glosario.ts) que se pueden consultar en cualquier pantalla. */
		palabras: z.array(z.string()).default([]),
		/** Fuentes oficiales de los datos técnicos (Banxico, CONDUSEF, DOF, IPAB). */
		fuentes: z
			.array(z.object({ nombre: z.string(), url: z.string().url() }))
			.min(1, 'Cada lección necesita al menos una fuente oficial.'),
	}),
});

export const collections = { lecciones };
