import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

/**
 * Campos extra que puede llevar cada página.
 * Si a un byte le falta algo obligatorio, `npm run build` falla y dice qué falta.
 */
const fuente = z.object({
	nombre: z.string(),
	url: z.string().url(),
});

// Las reglas propias de los bytes (campos obligatorios, 1 a 2 minutos de lectura)
// las revisa scripts/revisar-bytes.mjs antes de cada build.
const extension = z.object({
		/** byte = lección de 1 a 2 minutos; tema = portada de un tema; pagina = todo lo demás. */
		tipo: z.enum(['byte', 'tema', 'pagina']).default('pagina'),
		/** Clave del tema: credito, buro, seguridad, ahorro, primera-cuenta. */
		tema: z.enum(['credito', 'buro', 'seguridad', 'ahorro', 'primera-cuenta']).optional(),
		/** Número del byte, como en contenido/bytes.md (por ejemplo "1.3"). */
		numero: z.string().optional(),
		/** Minutos de lectura (1 o 2). */
		minutos: z.number().int().min(1).max(2).optional(),
		/** La duda real con la que abre el byte: una cita de las entrevistas o un dato. */
		duda: z
			.object({
				texto: z.string(),
				/** Quién lo dijo (cita) o de dónde sale el dato. */
				quien: z.string(),
				clase: z.enum(['cita', 'dato']).default('cita'),
			})
			.optional(),
		/** La acción concreta de hoy. Se muestra como "Hoy: …". */
		accion: z.string().optional(),
		/** Fuentes oficiales de cada dato técnico del byte. */
		fuentes: z.array(fuente).optional(),
});

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema({ extend: extension }) }),
};
