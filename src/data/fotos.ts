/**
 * Fotos del curso. Son fotos oficiales de Nu México, tomadas de nu.com.mx y de su blog.
 * Nu confirmó que el sitio piloto puede usar su logo y su marca (ver CLAUDE.md).
 * Las usamos como identidad visual del curso: los textos siguen siendo neutrales
 * y no invitan a contratar ningún producto.
 *
 * Para cambiar una foto: reemplaza el .jpg en src/assets/fotos/ y actualiza aquí el texto
 * alternativo. Astro genera versiones ligeras (AVIF/WebP) al compilar.
 */
import type { ImageMetadata } from 'astro';
import type { ClaveModulo } from './temario';
import inicioTarjeta from '../assets/fotos/inicio-tarjeta.jpg';
import modulo1 from '../assets/fotos/modulo-1.jpg';
import modulo2 from '../assets/fotos/modulo-2.jpg';
import modulo3 from '../assets/fotos/modulo-3.jpg';
import modulo4 from '../assets/fotos/modulo-4.jpg';
import modulo5 from '../assets/fotos/modulo-5.jpg';
import hookTarjetas from '../assets/fotos/hook-tarjetas.jpg';

export interface Foto {
	src: ImageMetadata;
	/** Texto alternativo: qué se ve en la foto. */
	alt: string;
	autor: string;
	/** Página de donde se tomó la foto. */
	enlace: string;
	/** Qué parte de la foto se conserva al recortarla (CSS object-position). */
	foco?: string;
}

const autor = 'Nu México';

export const fotoInicio: Foto = {
	src: inicioTarjeta,
	alt: 'Un joven sonríe y sostiene su tarjeta morada.',
	autor,
	enlace: 'https://nu.com.mx/',
	foco: '55% 30%',
};

export const fotosModulo: Record<ClaveModulo, Foto> = {
	'gastos-y-ahorro': {
		src: modulo1,
		alt: 'Una calculadora morada que dice "ahorro" sobre unas libretas.',
		autor,
		enlace: 'https://blog.nu.com.mx/tag/ahorro/',
		foco: '62% 50%',
	},
	'primera-cuenta': {
		src: modulo2,
		alt: 'Una joven sonríe y muestra su tarjeta.',
		autor,
		enlace: 'https://nu.com.mx/',
		foco: '50% 30%',
	},
	'pagar-y-transferir': {
		src: modulo3,
		alt: 'Dos personas revisan algo juntas en una laptop.',
		autor,
		enlace: 'https://nu.com.mx/atencion-a-clientes/',
		foco: '50% 40%',
	},
	credito: {
		src: modulo4,
		alt: 'Una persona paga con tarjeta en una cafetería.',
		autor,
		enlace: 'https://nu.com.mx/tarjeta-garantizada/',
		foco: '42% 60%',
	},
	'historial-y-rendimiento': {
		src: modulo5,
		alt: 'Dos amigos sonríen mientras revisan un celular en un café.',
		autor,
		enlace: 'https://nu.com.mx/prestamo-personal/',
		foco: '62% 45%',
	},
};

/** Foto extra para el hook de entrada (las otras pantallas reusan fotos de arriba). */
export const fotoHookTarjetas: Foto = {
	src: hookTarjetas,
	alt: 'Dos manos se pasan tarjetas moradas sobre un fondo morado.',
	autor,
	enlace: 'https://nu.com.mx/',
	foco: '70% 50%',
};

export const todasLasFotos: Foto[] = [fotoInicio, ...Object.values(fotosModulo), fotoHookTarjetas];
