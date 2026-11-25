/**
 * Banco de preguntas para medir cuánto aprenden.
 *
 * Cada pregunta es una situación con alguien de su edad. Se hace DOS veces, igual:
 *   1. En la encuesta inicial (antes del curso), con la opción extra "No sé".
 *   2. En el ejercicio final de su lección: <Ejercicio diagnostico="pago-minimo" />.
 * Al final, la página /resultados/ compara las dos respuestas.
 *
 * Hay una pregunta por tema clave (las tres primeras son las del indicador de aprendizaje
 * del piloto: pago mínimo, fecha de corte y buró). Para cambiar una pregunta, cámbiala
 * aquí: la encuesta y la lección se actualizan solas.
 *
 * Datos que sostienen cada respuesta correcta (verificar otra vez al escribir cada lección):
 *  - pago-minimo: Banxico, Circular 34/2010, numeral 4.1 (el mínimo incluye intereses).
 *  - fecha-corte: CONDUSEF. El corte cierra el periodo y define lo que debes pagar.
 *  - buro: CONDUSEF y Buró de Crédito. El historial guarda pagos puntuales y atrasos.
 *  - llamada: CONDUSEF. Ninguna institución pide NIP, contraseñas ni códigos por teléfono.
 *  - ahorro: CONDUSEF recomienda separar el ahorro en cuanto recibes tu dinero.
 */
import type { NombreIcono } from '../components/Icono.astro';

export interface PreguntaDiagnostico {
	id: string;
	/** Tema corto para la tarjeta de resultados. */
	tema: string;
	icono: NombreIcono;
	/** Lección donde se vuelve a preguntar (número del temario). */
	leccion: string;
	/** Una situación con una persona de su edad (lo pidieron en la evaluación del 22/11/2026). */
	pregunta: string;
	opciones: string[];
	/** Índice de la opción correcta (empieza en 0). */
	correcta: number;
	/** Por qué cada opción está bien o mal, en una frase. Mismo orden que `opciones`. */
	porque: string[];
	/** Qué respondieron los 25 jóvenes entrevistados. Texto EXACTO de CLAUDE.md, sección 3. */
	entrevistas: string;
}

export const preguntasDiagnostico: PreguntaDiagnostico[] = [
	{
		id: 'pago-minimo',
		tema: 'Pago mínimo',
		icono: 'hourglass-medium',
		leccion: '4.5',
		pregunta: 'Vale pagó con su tarjeta un boleto para un concierto. Debe $3,000 y este mes paga solo el mínimo, a tiempo. ¿Qué pasa?',
		opciones: [
			'Ya quedó al corriente y su deuda no crece',
			'Está al corriente, pero sigue pagando intereses por lo que debe',
			'Le cobran una multa por pagar poco',
		],
		correcta: 1,
		porque: [
			'Queda al corriente, pero lo que sigue debiendo genera intereses cada mes.',
			'Pagar el mínimo evita el atraso, pero no frena los intereses de lo que falta.',
			'Si paga el mínimo a tiempo no hay multa por atraso. El costo está en los intereses.',
		],
		entrevistas: '16 de 25 jóvenes no sabían que pagar solo el mínimo genera intereses.',
	},
	{
		id: 'fecha-corte',
		tema: 'Fecha de corte',
		icono: 'calendar-check',
		leccion: '4.4',
		pregunta: 'La fecha de corte de la tarjeta de Diego es el día 10. ¿Qué pasa ese día?',
		opciones: [
			'Se cierra el mes de su tarjeta y se calcula cuánto debe',
			'Es el último día que tiene para pagar',
			'Le bloquean la tarjeta si no ha pagado',
		],
		correcta: 0,
		porque: [
			'Ese día se suman sus compras del periodo y se calcula lo que debe pagar.',
			'Ese es otro día: la fecha límite de pago, que llega después del corte.',
			'El corte no bloquea la tarjeta. Solo cierra el periodo y hace la cuenta.',
		],
		entrevistas: 'Solo 6 de 25 jóvenes explicaron bien qué es la fecha de corte.',
	},
	{
		id: 'buro',
		tema: 'Buró de crédito',
		icono: 'file-text',
		leccion: '5.1',
		pregunta: 'Ana tiene una tarjeta de crédito y siempre la paga a tiempo. ¿Aparece en el buró de crédito?',
		opciones: [
			'No, solo aparecen las personas que no pagan',
			'No, solo aparecen las personas con mucho dinero',
			'Sí: ahí se guarda su historial, y pagar a tiempo le ayuda',
		],
		correcta: 2,
		porque: [
			'En el buró aparece todo el que ha tenido un crédito, pague bien o mal.',
			'No depende de cuánto dinero tienes, sino de si has tenido un crédito.',
			'El buró guarda tu historial completo. Pagar a tiempo deja un buen registro.',
		],
		entrevistas: 'Solo 2 de 25 jóvenes sabían que estar en el buró no siempre es malo.',
	},
	{
		id: 'llamada',
		tema: 'Llamadas falsas',
		icono: 'warning-circle',
		leccion: '3.3',
		pregunta: 'A Sofi le llaman "del banco" y le piden el código que le llegó por SMS. ¿Qué debe hacer?',
		opciones: [
			'Colgar y llamar ella al número que viene en su tarjeta o en la app',
			'Darlo si saben su nombre y su número de tarjeta',
			'Darlo si le dicen que es para proteger su cuenta',
		],
		correcta: 0,
		porque: [
			'Así habla con su banco de verdad. Ningún banco te pide códigos por teléfono.',
			'Quien estafa a veces ya tiene esos datos. Eso no prueba que sea el banco.',
			'"Es para protegerte" es el pretexto más común. El código nunca se comparte.',
		],
		entrevistas: '13 de 25 jóvenes conocen a alguien a quien intentaron estafar, casi siempre con una llamada que finge ser del banco.',
	},
	{
		id: 'ahorro',
		tema: 'Ahorrar',
		icono: 'piggy-bank',
		leccion: '1.4',
		pregunta: 'Leo recibe $500 cada semana y quiere juntar para unos tenis. ¿Qué le ayuda más a ahorrar?',
		opciones: [
			'Guardar lo que le sobre al final de la semana',
			'Guardar el efectivo en su cuarto',
			'Apartar una cantidad fija en cuanto recibe el dinero',
		],
		correcta: 2,
		porque: [
			'Casi nunca sobra: los antojos y las salidas se lo terminan comiendo.',
			'Tenerlo a la mano hace muy fácil gastarlo.',
			'Si lo apartas primero, ya no está disponible para gastarlo sin pensar.',
		],
		entrevistas: '20 de 25 jóvenes ahorran, pero solo 3 de esos 20 apartan una cantidad fija.',
	},
];

/** Pregunta de confianza (indicador del piloto: "Me siento capaz de usar una cuenta", de 1 a 5). */
export const preguntaConfianza = {
	pregunta: '¿Qué tan capaz te sientes de usar una cuenta o una tarjeta?',
	etiquetas: ['Nada', 'Poco', 'Más o menos', 'Bastante', 'Mucho'],
};

export function buscarPregunta(id: string) {
	return preguntasDiagnostico.find((p) => p.id === id);
}
