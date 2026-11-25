/**
 * Glosario: palabras difíciles con una definición sencilla y un ejemplo de la vida diaria.
 * Lo pidieron los jóvenes en la evaluación del 22/11/2026 ("una definición que puedas consultar al momento").
 *
 * Se usa en tres lugares:
 *   1. La página /glosario/ (todas las palabras).
 *   2. Dentro del texto de una lección: <Termino id="pago-minimo">pago mínimo</Termino>
 *   3. El botón "Palabras" de cada lección (campo `palabras` en el frontmatter de la lección).
 *
 * Reglas: definición de 1 o 2 frases cortas, sin jerga. El ejemplo es una situación de alguien
 * de 17 o 18 años. Las cantidades de los ejemplos son ilustrativas. Cada palabra cita su fuente.
 */

export interface Fuente {
	nombre: string;
	url: string;
}

export interface Palabra {
	id: string;
	palabra: string;
	definicion: string;
	ejemplo: string;
	fuente: Fuente;
	/** Otras palabras del glosario relacionadas (ids). */
	ver?: string[];
}

const banxicoTarjetas: Fuente = {
	nombre: 'Banxico, Términos de tarjetas de crédito',
	url: 'https://comparador.banxico.org.mx/ComparadorCrediticio/terminos-tarjeta-de-credito.jsp',
};
const banxicoGlosario: Fuente = {
	nombre: 'Banxico, Glosario',
	url: 'https://www.banxico.org.mx/divulgacion/glosario/glosario.html',
};
const condusef: Fuente = { nombre: 'CONDUSEF', url: 'https://www.condusef.gob.mx/' };
const buro: Fuente = { nombre: 'Buró de Crédito', url: 'https://www.burodecredito.com.mx/' };

const base: Palabra[] = [
	{
		id: 'apartado-de-ahorro',
		palabra: 'Apartado de ahorro',
		definicion: 'Un espacio dentro de tu cuenta para separar dinero con una meta. Así no se mezcla con lo que usas para gastar.',
		ejemplo: 'Mariana crea un apartado para el boleto de un concierto y le pasa $150 cada vez que le dan su domingo.',
		fuente: condusef,
		ver: ['rendimiento'],
	},
	{
		id: 'buro-de-credito',
		palabra: 'Buró de crédito',
		definicion:
			'Una empresa que guarda tu historial de crédito: cuánto te han prestado y cómo has pagado. Estar ahí no es malo: también se guardan los pagos a tiempo.',
		ejemplo: 'Ana paga su tarjeta a tiempo cada mes. Eso queda en el buró y le ayuda a que le presten después.',
		fuente: buro,
		ver: ['historial-crediticio'],
	},
	{
		id: 'cat',
		palabra: 'CAT (Costo Anual Total)',
		definicion:
			'Un porcentaje que junta todo lo que cuesta un crédito: intereses y comisiones. Sirve para comparar créditos: entre más bajo, más barato.',
		ejemplo: 'Comparas dos tarjetas. Si no vas a pagar el total cada mes, te conviene la de CAT más bajo.',
		fuente: banxicoGlosario,
		ver: ['interes', 'comision'],
	},
	{
		id: 'clabe',
		palabra: 'CLABE',
		definicion: 'Un número de 18 dígitos que identifica tu cuenta. Sirve para que te manden transferencias desde otro banco.',
		ejemplo: 'Te pagan por ayudar en un evento el fin de semana. Le das tu CLABE a quien te paga y el dinero llega a tu cuenta.',
		fuente: condusef,
		ver: ['spei'],
	},
	{
		id: 'codigos-y-nip',
		palabra: 'NIP y códigos de verificación',
		definicion:
			'Claves secretas para usar tu tarjeta o confirmar una operación, como el código que te llega por SMS. Nadie del banco te los va a pedir por teléfono.',
		ejemplo: 'Te llaman "del banco" y te piden el código que te acaba de llegar. Cuelgas: es un intento de fraude.',
		fuente: condusef,
	},
	{
		id: 'comision',
		palabra: 'Comisión',
		definicion: 'Lo que te cobra un banco por un servicio, como tener una tarjeta (anualidad) o sacar efectivo con tu tarjeta de crédito.',
		ejemplo: 'Antes de abrir tu primera cuenta, revisas qué comisiones cobra y cuándo.',
		fuente: banxicoTarjetas,
		ver: ['cat'],
	},
	{
		id: 'credito',
		palabra: 'Crédito',
		definicion: 'Dinero que te prestan y que tienes que devolver, casi siempre con intereses.',
		ejemplo: 'Una tarjeta de crédito y un préstamo personal son dos tipos de crédito.',
		fuente: banxicoTarjetas,
		ver: ['tarjeta-de-credito', 'prestamo-personal'],
	},
	{
		id: 'estado-de-cuenta',
		palabra: 'Estado de cuenta',
		definicion: 'El resumen de cada mes de tu tarjeta o cuenta: qué compraste, cuánto debes, el pago mínimo y las fechas para pagar.',
		ejemplo: 'Después de la fecha de corte te llega tu estado de cuenta en la app o por correo.',
		fuente: banxicoTarjetas,
		ver: ['fecha-de-corte'],
	},
	{
		id: 'fecha-de-corte',
		palabra: 'Fecha de corte',
		definicion:
			'El día del mes en que se cierra el periodo de tu tarjeta de crédito. Ese día se suman tus compras y se calcula cuánto debes.',
		ejemplo:
			'El corte de Diego es el día 10. Lo que compró del 11 de octubre al 10 de noviembre aparece en su estado de cuenta de noviembre.',
		fuente: banxicoTarjetas,
		ver: ['fecha-limite-de-pago', 'estado-de-cuenta'],
	},
	{
		id: 'fecha-limite-de-pago',
		palabra: 'Fecha límite de pago',
		definicion: 'El último día para pagar tu tarjeta sin atrasarte. Llega hasta 20 días después de la fecha de corte.',
		ejemplo: 'Corte el día 10, límite de pago el día 30. Si Diego paga todo antes del 30, no paga intereses.',
		fuente: banxicoTarjetas,
		ver: ['fecha-de-corte', 'pago-para-no-generar-intereses'],
	},
	{
		id: 'gasto-hormiga',
		palabra: 'Gasto hormiga',
		definicion: 'Gastos chiquitos de todos los días que casi no notas, pero que juntos suman mucho.',
		ejemplo: 'Un refresco de $25 cada día en la prepa suma unos $750 al mes.',
		fuente: condusef,
	},
	{
		id: 'gat',
		palabra: 'GAT (Ganancia Anual Total)',
		definicion:
			'Un porcentaje que te dice cuánto puede ganar tu dinero en un año si lo guardas en una cuenta de ahorro. Sirve para comparar: entre más alta, más gana tu dinero.',
		ejemplo: 'Dos cuentas te pagan por guardar tu dinero. Comparas su GAT para ver cuál te da más.',
		fuente: banxicoGlosario,
		ver: ['rendimiento'],
	},
	{
		id: 'historial-crediticio',
		palabra: 'Historial crediticio',
		definicion: 'El registro de cómo has pagado tus créditos. Se guarda en el buró de crédito.',
		ejemplo: 'Si pagas a tiempo tu primera tarjeta durante un año, empiezas un buen historial.',
		fuente: buro,
		ver: ['buro-de-credito', 'tarjeta-garantizada'],
	},
	{
		id: 'interes',
		palabra: 'Intereses',
		definicion:
			'Lo que pagas por usar dinero prestado. En las tarjetas de crédito, a los intereses se les suma IVA.',
		ejemplo: 'Vale debe $3,000 y solo paga una parte. El mes siguiente debe lo que faltó, más intereses.',
		fuente: banxicoTarjetas,
		ver: ['cat', 'pago-minimo'],
	},
	{
		id: 'limite-de-credito',
		palabra: 'Límite de crédito',
		definicion: 'Lo máximo que te presta el banco en tu tarjeta de crédito. No es dinero tuyo: lo que uses lo tienes que pagar.',
		ejemplo: 'Con un límite de $5,000, si gastas $3,000 te quedan $2,000 disponibles.',
		fuente: banxicoTarjetas,
		ver: ['tarjeta-de-credito'],
	},
	{
		id: 'meses-sin-intereses',
		palabra: 'Meses sin intereses',
		definicion:
			'Pagar una compra en partes iguales durante varios meses, sin intereses. Solo funciona si pagas cada mensualidad completa y a tiempo.',
		ejemplo:
			'Una consola de $6,000 a 6 meses: pagas $1,000 cada mes. Ojo: esa mensualidad no viene incluida en el pago mínimo.',
		fuente: banxicoTarjetas,
		ver: ['pago-minimo'],
	},
	{
		id: 'pago-minimo',
		palabra: 'Pago mínimo',
		definicion: 'Lo menos que puedes pagar en tu tarjeta para no atrasarte. Lo que no pagas sigue generando intereses.',
		ejemplo: 'Vale debe $3,000 y paga solo el mínimo. Queda al corriente, pero su deuda baja muy poco.',
		fuente: banxicoTarjetas,
		ver: ['pago-para-no-generar-intereses', 'interes'],
	},
	{
		id: 'pago-para-no-generar-intereses',
		palabra: 'Pago para no generar intereses',
		definicion: 'Todo lo que gastaste en el periodo. Si lo pagas completo antes de la fecha límite, no pagas intereses por esas compras.',
		ejemplo: 'Este mes gastaste $800 con tu tarjeta. Pagas los $800 antes de la fecha límite y no pagas ni un peso de intereses.',
		fuente: banxicoTarjetas,
		ver: ['pago-minimo', 'fecha-limite-de-pago'],
	},
	{
		id: 'prestamo-personal',
		palabra: 'Préstamo personal',
		definicion: 'Te prestan una cantidad fija y la devuelves en pagos iguales, con intereses, durante un plazo acordado.',
		ejemplo: 'Antes de pedir un préstamo, sumas todos los pagos para ver cuánto devolverías en total.',
		fuente: condusef,
		ver: ['credito', 'cat'],
	},
	{
		id: 'rendimiento',
		palabra: 'Rendimiento',
		definicion: 'El dinero extra que te paga una institución por guardar tu dinero con ella.',
		ejemplo: 'Guardas lo de tu primer sueldo en una cuenta con rendimiento y crece un poco sin que hagas nada.',
		fuente: banxicoGlosario,
		ver: ['gat', 'apartado-de-ahorro'],
	},
	{
		id: 'spei',
		palabra: 'SPEI (transferencia)',
		definicion: 'El sistema del Banco de México para mandar dinero de un banco a otro casi al instante.',
		ejemplo: 'Le pasas a tu amigo lo de la pizza por transferencia, con su CLABE o su número de tarjeta de débito.',
		fuente: banxicoGlosario,
		ver: ['clabe'],
	},
	{
		id: 'tarjeta-de-credito',
		palabra: 'Tarjeta de crédito',
		definicion: 'Pagas con dinero que te presta el banco y luego lo devuelves. Si no pagas el total a tiempo, pagas intereses.',
		ejemplo: 'Compras unos tenis con tu tarjeta de crédito. Esos tenis los pagas después, al banco.',
		fuente: banxicoTarjetas,
		ver: ['tarjeta-de-debito', 'limite-de-credito'],
	},
	{
		id: 'tarjeta-de-debito',
		palabra: 'Tarjeta de débito',
		definicion: 'Pagas con tu propio dinero, el que tienes en tu cuenta. Si no tienes saldo, el pago no pasa.',
		ejemplo: 'Te depositan tu pago del fin de semana y pagas el cine con tu tarjeta de débito.',
		fuente: condusef,
		ver: ['tarjeta-de-credito'],
	},
	{
		id: 'tarjeta-garantizada',
		palabra: 'Tarjeta de crédito garantizada',
		definicion:
			'Una tarjeta de crédito para la que dejas un depósito como garantía. Sirve para empezar tu historial crediticio.',
		ejemplo: 'Aún no tienes historial. Con una tarjeta garantizada que pagas a tiempo, empiezas a construirlo.',
		fuente: condusef,
		ver: ['historial-crediticio'],
	},
];

// Palabras que agregó cada módulo (src/data/glosario-extra/).
import { palabras as m1 } from './glosario-extra/modulo-1';
import { palabras as m2 } from './glosario-extra/modulo-2';
import { palabras as m3 } from './glosario-extra/modulo-3';
import { palabras as m4 } from './glosario-extra/modulo-4';
import { palabras as m5 } from './glosario-extra/modulo-5';

export const glosario: Palabra[] = [...base, ...m1, ...m2, ...m3, ...m4, ...m5];

const repetidas = glosario.map((p) => p.id).filter((id, i, todas) => todas.indexOf(id) !== i);
if (repetidas.length) throw new Error(`Palabras repetidas en el glosario: ${repetidas.join(', ')}`);

export const porId = new Map(glosario.map((p) => [p.id, p]));

export function buscarPalabra(id: string) {
	const p = porId.get(id);
	if (!p) throw new Error(`No existe la palabra "${id}" en src/data/glosario.ts`);
	return p;
}
