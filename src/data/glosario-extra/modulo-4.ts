/**
 * Palabras nuevas del glosario que salen en las lecciones del módulo 4.
 * Mismo formato y reglas que src/data/glosario.ts (definición de 1 o 2 frases, ejemplo de alguien
 * de 17 o 18 años, fuente oficial). Antes de agregar una, revisen que no exista ya en glosario.ts.
 */
import type { Palabra } from '../glosario';

export const palabras: Palabra[] = [
	{
		id: 'intereses-moratorios',
		palabra: 'Intereses moratorios',
		definicion: 'Intereses extra que te pueden cobrar cuando no haces ni el pago mínimo a tiempo. Son distintos de los intereses normales.',
		ejemplo: 'Leo no pagó ni el mínimo de su tarjeta. Por atrasarse, le pueden cobrar intereses moratorios.',
		fuente: {
			nombre: 'Banxico, Términos de tarjetas de crédito',
			url: 'https://comparador.banxico.org.mx/ComparadorCrediticio/terminos-tarjeta-de-credito.jsp',
		},
		ver: ['interes', 'pago-minimo'],
	},
	{
		id: 'despacho-de-cobranza',
		palabra: 'Despacho de cobranza',
		definicion:
			'Una empresa que contrata un banco o financiera para cobrar deudas atrasadas. Tiene reglas: debe tratarte con respeto y no puede amenazarte.',
		ejemplo: 'A Santi le llaman de un despacho de cobranza. Pide su nombre, de qué institución viene y cuánto debe.',
		fuente: {
			nombre: 'CONDUSEF, Consulta el REDECO',
			url: 'https://www.condusef.gob.mx/?p=contenido&idc=1622&idcat=1',
		},
	},
	{
		id: 'sipres',
		palabra: 'SIPRES',
		definicion:
			'El registro de CONDUSEF donde aparecen las instituciones financieras que existen legalmente. Si quien te ofrece un préstamo no está ahí, no es una entidad financiera.',
		ejemplo: 'Antes de pedir un préstamo en una app, Mariana busca el nombre de la empresa en el SIPRES.',
		fuente: {
			nombre: 'CONDUSEF, alerta sobre suplantación de financieras',
			url: 'https://www.condusef.gob.mx/?idc=2376&idcat=1&p=contenido',
		},
		ver: ['prestamo-personal'],
	},
];
