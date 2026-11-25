/**
 * La ruta del curso: qué está terminado, qué sigue y qué está disponible.
 *
 * Regla: todas las lecciones publicadas están abiertas. Cada quien elige el tema que le
 * interesa (lo pidieron los jóvenes en la evaluación del 22/11/2026).
 * El temario sugiere un orden: "siguiente" es la primera lección publicada que no has
 * terminado, y es a donde lleva el botón "Continuar".
 */
import { leer } from './progreso';

export interface DatosRuta {
	modulos: { numero: number; lecciones: { numero: string; publicada: boolean; href: string }[] }[];
}

export type EstadoLeccion = 'hecha' | 'siguiente' | 'disponible' | 'pronto';
export type EstadoModulo = 'hecho' | 'actual' | 'disponible' | 'pronto';

export interface Ruta {
	lecciones: Record<string, EstadoLeccion>;
	modulos: Record<number, { estado: EstadoModulo; hechas: number; publicadas: number }>;
	/** La primera lección publicada que no has terminado. */
	siguiente?: { numero: string; href: string };
	totalHechas: number;
}

export function leerDatos(): DatosRuta | null {
	const el = document.getElementById('datos-ruta');
	if (!el?.textContent) return null;
	try {
		return JSON.parse(el.textContent);
	} catch {
		return null;
	}
}

export function calcular(datos: DatosRuta): Ruta {
	const { terminadas } = leer();
	const lecciones: Ruta['lecciones'] = {};
	const modulos: Ruta['modulos'] = {};
	let siguiente: Ruta['siguiente'];
	let totalHechas = 0;

	for (const m of datos.modulos) {
		let hechas = 0;
		let publicadas = 0;
		let tieneSiguiente = false;
		for (const l of m.lecciones) {
			if (!l.publicada) {
				lecciones[l.numero] = 'pronto';
				continue;
			}
			publicadas++;
			if (terminadas[l.numero]) {
				lecciones[l.numero] = 'hecha';
				hechas++;
				totalHechas++;
			} else if (!siguiente) {
				lecciones[l.numero] = 'siguiente';
				siguiente = { numero: l.numero, href: l.href };
				tieneSiguiente = true;
			} else {
				lecciones[l.numero] = 'disponible';
			}
		}
		const estado: EstadoModulo =
			publicadas === 0 ? 'pronto' : hechas === publicadas ? 'hecho' : tieneSiguiente ? 'actual' : 'disponible';
		modulos[m.numero] = { estado, hechas, publicadas };
	}
	return { lecciones, modulos, siguiente, totalHechas };
}
