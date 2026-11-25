/**
 * Contenido de la sección "Practica" (/practica/): juegos, retos y plantillas.
 * Lo pidieron los jóvenes en la evaluación del 22/11/2026: menos leer, más practicar,
 * con situaciones de su edad (domingo, salidas, videojuegos, primer trabajo).
 *
 * Todas las cantidades son EJEMPLOS ILUSTRATIVOS. Los datos técnicos de "Mito o realidad"
 * vienen de las mismas fuentes que las lecciones (Banxico y CONDUSEF).
 */
import type { NombreIcono } from '../components/Icono.astro';

/* ---------- Juego 1: ¿Mito o realidad? ---------- */

export interface Afirmacion {
	frase: string;
	esMito: boolean;
	explicacion: string;
	/** De dónde sale el dato. */
	fuente: string;
}

export const mitoRealidad: Afirmacion[] = [
	{
		frase: 'Si pago el mínimo de mi tarjeta, mi deuda ya no crece.',
		esMito: true,
		explicacion: 'Pagar el mínimo evita el atraso, pero lo que sigues debiendo genera intereses cada mes, más IVA.',
		fuente: 'Banxico, Términos de tarjetas de crédito',
	},
	{
		frase: 'Estar en el buró de crédito siempre es malo.',
		esMito: true,
		explicacion: 'En el buró aparece todo el que ha tenido un crédito. Si pagas a tiempo, ahí queda un buen historial.',
		fuente: 'CONDUSEF y Buró de Crédito',
	},
	{
		frase: 'Si pago el total de mi tarjeta antes de la fecha límite, no pago intereses por mis compras.',
		esMito: false,
		explicacion: 'Así es. Por eso conviene pagar el total cada mes, no solo el mínimo.',
		fuente: 'Banxico, Términos de tarjetas de crédito',
	},
	{
		frase: 'La fecha de corte es el último día que tengo para pagar.',
		esMito: true,
		explicacion: 'El corte cierra el periodo y calcula lo que debes. Para pagar tienes hasta la fecha límite, que llega después.',
		fuente: 'Banxico, Términos de tarjetas de crédito',
	},
	{
		frase: 'Un banco nunca te va a pedir por teléfono tu NIP ni el código que te llega por SMS.',
		esMito: false,
		explicacion: 'Si alguien te los pide, cuelga y llama tú al número que viene en tu tarjeta o en la app.',
		fuente: 'CONDUSEF',
	},
	{
		frase: 'La mensualidad de una compra a meses sin intereses ya viene incluida en el pago mínimo.',
		esMito: true,
		explicacion: 'No viene incluida. Tienes que pagar el mínimo más la mensualidad, o esa parte genera intereses.',
		fuente: 'Banxico, Términos de tarjetas de crédito',
	},
	{
		frase: 'Ahorrar "lo que sobre" al final de la semana es la forma más fácil de juntar dinero.',
		esMito: true,
		explicacion: 'Casi nunca sobra. Funciona mejor apartar una cantidad fija en cuanto recibes tu dinero.',
		fuente: 'CONDUSEF',
	},
];

/* ---------- Juego 2: Tu mes con tu domingo (decisiones con consecuencias) ---------- */

export interface Decision {
	semana: number;
	icono: NombreIcono;
	situacion: string;
	opciones: {
		texto: string;
		/** Cuánto apartas para tu meta esa semana. */
		ahorro: number;
		consecuencia: string;
	}[];
}

export const juegoMes = {
	porSemana: 500,
	meta: 1000,
	metaNombre: 'el boleto del concierto',
	decisiones: [
		{
			semana: 1,
			icono: 'hand-coins',
			situacion: 'Te dan tus $500 de la semana. ¿Qué haces primero?',
			opciones: [
				{
					texto: 'Aparto $300 para el concierto en cuanto me los dan',
					ahorro: 300,
					consecuencia: 'Ese dinero ya no está a la vista. Te quedan $200 y alcanzan para la semana.',
				},
				{
					texto: 'Los gasto normal y el domingo aparto lo que sobre',
					ahorro: 50,
					consecuencia: 'Un antojo aquí, un refresco allá. El domingo solo sobraron $50.',
				},
			],
		},
		{
			semana: 2,
			icono: 'users-three',
			situacion: 'Tus amigos van al cine y luego a cenar. Todo junto sale en $350.',
			opciones: [
				{
					texto: 'Voy al cine ($150) y ceno en mi casa',
					ahorro: 250,
					consecuencia: 'Saliste con tus amigos y todavía apartaste $250.',
				},
				{
					texto: 'Voy a todo: cine y cena',
					ahorro: 50,
					consecuencia: 'Estuvo bien, pero esta semana solo apartaste $50.',
				},
			],
		},
		{
			semana: 3,
			icono: 'game-controller',
			situacion: 'Sale un pase nuevo para tu videojuego favorito: $250. Y en la prepa se te antoja todo.',
			opciones: [
				{
					texto: 'Me espero 24 horas antes de comprar el pase',
					ahorro: 300,
					consecuencia: 'Al día siguiente ya no se te antojaba tanto. Apartaste $300.',
				},
				{
					texto: 'Lo compro ya y también los antojos',
					ahorro: 0,
					consecuencia: 'Entre el pase y los antojos se fue toda la semana. Apartaste $0.',
				},
			],
		},
		{
			semana: 4,
			icono: 'coins',
			situacion: 'Te pagan $400 por ayudar el sábado en un evento. Es tu primer dinero ganado.',
			opciones: [
				{
					texto: 'Aparto la mitad de lo que gané y $250 de mi domingo',
					ahorro: 450,
					consecuencia: 'Tu primer pago ya trabaja para tu meta: apartaste $450.',
				},
				{
					texto: 'Me lo gasto ese mismo día para celebrar',
					ahorro: 150,
					consecuencia: 'Celebraste, pero de todo lo de esta semana solo apartaste $150.',
				},
			],
		},
	] satisfies Decision[],
};

/* ---------- Reto: 3 días anotando tus gastos ---------- */

export const categoriasGasto: { id: string; nombre: string; icono: NombreIcono }[] = [
	{ id: 'comida', nombre: 'Comida y antojos', icono: 'coins' },
	{ id: 'salidas', nombre: 'Salidas', icono: 'users-three' },
	{ id: 'juegos', nombre: 'Videojuegos y apps', icono: 'game-controller' },
	{ id: 'transporte', nombre: 'Transporte', icono: 'map-trifold' },
	{ id: 'escuela', nombre: 'Escuela', icono: 'book-open-text' },
	{ id: 'otro', nombre: 'Otro', icono: 'receipt' },
];

/* ---------- Meta de ahorro ---------- */

export const ideasMeta: { nombre: string; monto: number; icono: NombreIcono }[] = [
	{ nombre: 'Un concierto', monto: 1500, icono: 'ticket' },
	{ nombre: 'Unos tenis', monto: 1800, icono: 'sneaker' },
	{ nombre: 'Un videojuego', monto: 1200, icono: 'game-controller' },
	{ nombre: 'Un viaje con amigos', monto: 3000, icono: 'map-trifold' },
];

/* ---------- Plantillas para descargar (archivos en public/plantillas/) ---------- */

export const plantillas: { archivo: string; titulo: string; texto: string }[] = [
	{
		archivo: 'presupuesto-50-30-20.csv',
		titulo: 'Presupuesto 50/30/20',
		texto: 'Escribe cuánto recibes al mes y ve cuánto va a básicos, gustos y ahorro.',
	},
	{
		archivo: 'ingresos-y-gastos.csv',
		titulo: 'Ingresos y gastos del mes',
		texto: 'Anota lo que entra y lo que sale. Al final ves cuánto te queda.',
	},
	{
		archivo: 'calculadora-de-intereses.csv',
		titulo: 'Calculadora de intereses de tarjeta',
		texto: 'Pon una deuda y cuánto pagas al mes. Ve cuánto se va en intereses. Ejemplo ilustrativo.',
	},
];
