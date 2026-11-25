/**
 * Palabras nuevas del glosario que salen en las lecciones del módulo 1.
 * Mismo formato y reglas que src/data/glosario.ts (definición de 1 o 2 frases, ejemplo de alguien
 * de 17 o 18 años, fuente oficial). Antes de agregar una, revisen que no exista ya en glosario.ts.
 */
import type { Palabra } from '../glosario';

export const palabras: Palabra[] = [
	{
		id: 'presupuesto',
		palabra: 'Presupuesto',
		definicion: 'Un plan por escrito de cuánto dinero recibes y en qué lo vas a usar. Incluye tu ahorro.',
		ejemplo: 'Diego recibe $500 a la semana. Anota $250 para básicos, $150 para gustos y $100 para ahorro.',
		fuente: {
			nombre: 'CONDUSEF, Presupuesto: toma el control de tu dinero',
			url: 'https://www.condusef.gob.mx/documentos/275532_PRESUPUESTO_versi_n_electr_nica__4_hojas_menos_.pdf',
		},
		ver: ['gasto-hormiga', 'apartado-de-ahorro'],
	},
	{
		id: 'fondo-de-emergencia',
		palabra: 'Fondo de emergencia',
		definicion: 'Dinero que guardas solo para imprevistos reales, como una consulta médica. Te ayuda a no pedir prestado.',
		ejemplo: 'Se descompone el celular de Emi y lo necesita para la escuela. Lo arregla con su fondo, sin pedir prestado.',
		fuente: {
			nombre: 'CONDUSEF, ¿Un fondo de ahorro para emergencias?',
			url: 'https://www.condusef.gob.mx/?p=contenido&idc=2345&idcat=3',
		},
		ver: ['apartado-de-ahorro', 'presupuesto'],
	},
];
