/**
 * Palabras nuevas del glosario que salen en las lecciones del módulo 5.
 * Mismo formato y reglas que src/data/glosario.ts (definición de 1 o 2 frases, ejemplo de alguien
 * de 17 o 18 años, fuente oficial). Antes de agregar una, revisen que no exista ya en glosario.ts.
 */
import type { Palabra } from '../glosario';

const banxicoGlosario = {
	nombre: 'Banxico, Glosario',
	url: 'https://www.banxico.org.mx/divulgacion/glosario/glosario.html',
};

export const palabras: Palabra[] = [
	{
		id: 'reporte-de-credito-especial',
		palabra: 'Reporte de Crédito Especial',
		definicion:
			'El documento con tu historial de crédito y quién lo ha consultado. Puedes pedirlo gratis una vez cada 12 meses.',
		ejemplo: 'Ana cumple un año con su primera tarjeta. Pide su reporte gratis para revisar que todo esté bien.',
		fuente: {
			nombre: 'CONDUSEF, alerta sobre páginas que ofrecen borrar el historial',
			url: 'https://www.gob.mx/condusef/prensa/alerta-condusef-sobre-pagina-web-que-ofrece-borrar-el-historial-del-buro-de-credito',
		},
		ver: ['buro-de-credito', 'historial-crediticio'],
	},
	{
		id: 'inflacion',
		palabra: 'Inflación',
		definicion:
			'Cuánto suben, en promedio, los precios de un periodo a otro. Con inflación, el mismo dinero alcanza para menos cosas.',
		ejemplo: 'Hace un año, Leo pagaba $50 por su torta en la prepa. Hoy la misma torta cuesta más.',
		fuente: banxicoGlosario,
		ver: ['poder-de-compra', 'rendimiento'],
	},
	{
		id: 'poder-de-compra',
		palabra: 'Poder de compra',
		definicion: 'Cuántas cosas puedes comprar con tu dinero. Cuando los precios suben, tu poder de compra baja.',
		ejemplo: 'Mariana guarda $500 en un cajón. En unos años siguen siendo $500, pero compran menos.',
		fuente: {
			nombre: 'Banxico, Política monetaria (material educativo)',
			url: 'https://educa.banxico.org.mx/recursos/pdf/%7B444C789D-42FD-F521-24C3-5C1B56C6D569%7D.pdf',
		},
		ver: ['inflacion'],
	},
	{
		id: 'interes-compuesto',
		palabra: 'Interés compuesto',
		definicion:
			'Cuando lo que gana tu dinero se suma a tu ahorro y también empieza a ganar. Así tu dinero crece cada vez más rápido.',
		ejemplo: 'Vale aparta cada mes desde los 18. El rendimiento de cada mes se suma y el siguiente mes gana sobre más dinero.',
		fuente: banxicoGlosario,
		ver: ['rendimiento', 'gat'],
	},
	{
		id: 'esquema-piramidal',
		palabra: 'Esquema piramidal',
		definicion:
			'Una estafa donde el dinero de los que van entrando paga a los que ya estaban. Por eso te presionan para invitar a más personas.',
		ejemplo: 'A Santi le prometen ganancias si mete $1,000 e invita a tres amigos. Es una pirámide: no entra.',
		fuente: {
			nombre: 'CONDUSEF, Protégete y evita perder tu dinero',
			url: 'https://www.gob.mx/condusef/articulos/protegete-y-evita-perder-tu-dinero?idiom=es',
		},
		ver: ['sipres'],
	},
];
