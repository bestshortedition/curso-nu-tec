/**
 * Compara la encuesta inicial con lo que contestaron en cada lección.
 * Todo se calcula en el navegador con lo guardado en localStorage (ver progreso.ts).
 */
import { leer, type Estado } from './progreso';
import { preguntasDiagnostico, type PreguntaDiagnostico } from '../data/diagnostico';

export type Resultado = 'bien' | 'mal' | 'nose';

export interface Comparacion {
	pregunta: PreguntaDiagnostico;
	/** Respuesta en la encuesta inicial (null si no la contestó). */
	antes: Resultado | null;
	/** Primera respuesta en la lección (null si aún no llega). Es la que mide el piloto. */
	despues: 'bien' | 'mal' | null;
	/** La falló en la lección, pero al repasar la contestó bien. Solo cambia lo que se le muestra. */
	repasada: boolean;
}

export interface Resumen {
	tieneEncuesta: boolean;
	items: Comparacion[];
	/** Aciertos en la encuesta inicial, sobre el total de preguntas. */
	antesBien: number;
	/** Temas que ya respondió en una lección. */
	vistos: number;
	/** De esos temas: cuántos sabía antes y cuántos sabe ahora. */
	antesBienVistos: number;
	ahoraBienVistos: number;
	confianzaAntes?: number;
	confianzaDespues?: number;
}

export function resumir(e: Estado = leer()): Resumen {
	const r = e.diagnostico?.respuestas ?? {};
	const items = preguntasDiagnostico.map((p): Comparacion => {
		const a = r[p.id];
		const antes: Resultado | null = a === undefined ? null : a === -1 ? 'nose' : a === p.correcta ? 'bien' : 'mal';
		const d = e.respuestas?.[p.id];
		const repasada = !!d && !d.bien && !!e.repaso?.[p.id]?.bien;
		return { pregunta: p, antes, despues: d ? (d.bien ? 'bien' : 'mal') : null, repasada };
	});
	const vistos = items.filter((i) => i.despues);
	return {
		tieneEncuesta: !!e.diagnostico,
		items,
		antesBien: items.filter((i) => i.antes === 'bien').length,
		vistos: vistos.length,
		antesBienVistos: vistos.filter((i) => i.antes === 'bien').length,
		ahoraBienVistos: vistos.filter((i) => i.despues === 'bien' || i.repasada).length,
		confianzaAntes: e.diagnostico?.confianza,
		confianzaDespues: e.confianzaFinal,
	};
}
