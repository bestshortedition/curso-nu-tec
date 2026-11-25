/**
 * Temario oficial del curso (Temario.pdf, noviembre de 2026).
 * 5 módulos y 31 lecciones, en este orden.
 *
 * Una lección aparece como "disponible" cuando existe su archivo en
 * src/content/lecciones/<modulo>/<slug>.mdx. Si no existe, se muestra como "Próximamente".
 */
import type { NombreIcono } from '../components/Icono.astro';

export type ClaveModulo =
	| 'gastos-y-ahorro'
	| 'primera-cuenta'
	| 'pagar-y-transferir'
	| 'credito'
	| 'historial-y-rendimiento';

export interface LeccionTemario {
	numero: string;
	slug: string;
	titulo: string;
	/** "De qué trata", del temario oficial. */
	resumen: string;
	/** Ícono de Phosphor que representa la lección. */
	icono: NombreIcono;
}

export interface Modulo {
	clave: ClaveModulo;
	numero: number;
	titulo: string;
	/** Una frase para la portada del módulo. */
	promesa: string;
	/** Dos frases que presentan el módulo antes de la lista de lecciones. */
	intro: string;
	/** Nombre del ícono de Phosphor (ver src/components/Icono.astro). */
	icono: NombreIcono;
	lecciones: LeccionTemario[];
}

export const temario: Modulo[] = [
	{
		clave: 'gastos-y-ahorro',
		numero: 1,
		titulo: 'Organizar gastos y ahorrar',
		promesa: 'Saber a dónde se va tu dinero y guardar antes de gastar.',
		intro:
			'Antes de tener tarjeta, conviene saber a dónde se va tu dinero. Aquí vas a ver cómo gastar con intención y ahorrar sin dejarlo a lo que sobre.',
		icono: 'piggy-bank',
		lecciones: [
			{
				numero: '1.1',
				slug: 'efecto-hormiga',
				icono: 'coins',
				titulo: 'El efecto hormiga y las suscripciones fantasma',
				resumen:
					'Cómo los gastos chiquitos y diarios, y las suscripciones que olvidaste cancelar, suman cientos o miles de pesos al mes sin que te des cuenta.',
			},
			{
				numero: '1.2',
				slug: 'necesidad-vs-antojo',
				icono: 'scales',
				titulo: 'Necesidad vs. antojo: la regla de las 24 horas',
				resumen:
					'Diferenciar lo que realmente necesitas de una compra impulsiva de redes sociales, esperando un día completo antes de pagar.',
			},
			{
				numero: '1.3',
				slug: 'presupuesto-50-30-20',
				icono: 'chart-pie-slice',
				titulo: 'El presupuesto 50/30/20 adaptado a ti',
				resumen:
					'Una fórmula visual para repartir tu mesada, domingo o primer sueldo: 50% básicos, 30% gustos y 20% ahorro.',
			},
			{
				numero: '1.4',
				slug: 'pagate-primero',
				icono: 'hand-coins',
				titulo: 'Págate a ti primero',
				resumen:
					'Por qué ahorrar "lo que sobre" no funciona y cómo apartar tu ahorro apenas recibes dinero.',
			},
			{
				numero: '1.5',
				slug: 'metas-de-ahorro',
				icono: 'target',
				titulo: 'Metas de ahorro con nombre y apellido',
				resumen:
					'Objetivos concretos y con fecha (un concierto, unos tenis, un viaje) para no perder la motivación.',
			},
			{
				numero: '1.6',
				slug: 'fondo-de-emergencia',
				icono: 'lifebuoy',
				titulo: 'Tu primer fondo de emergencia',
				resumen:
					'Un colchón solo para imprevistos reales, para no tener que pedir prestado.',
			},
		],
	},
	{
		clave: 'primera-cuenta',
		numero: 2,
		titulo: 'Conocer la primera cuenta',
		promesa: 'Entender cómo funciona tu dinero digital antes de abrir tu cuenta.',
		intro:
			'A los 18 ya puedes abrir una cuenta a tu nombre. Aquí vas a entender qué es, cómo leerla y qué cobros revisar antes de elegir.',
		icono: 'bank',
		lecciones: [
			{
				numero: '2.1',
				slug: 'que-es-una-cuenta',
				icono: 'bank',
				titulo: '¿Qué es realmente una cuenta bancaria o fintech?',
				resumen:
					'Tu dinero no está en una caja con tu nombre: está respaldado en una institución regulada para que lo muevas desde tu celular.',
			},
			{
				numero: '2.2',
				slug: 'debito-vs-credito',
				icono: 'arrows-left-right',
				titulo: 'Débito vs. crédito: la diferencia vital',
				resumen:
					'La de débito usa tu propio dinero; la de crédito usa dinero prestado que tienes que devolver.',
			},
			{
				numero: '2.3',
				slug: 'anatomia-de-tu-tarjeta',
				icono: 'identification-card',
				titulo: 'Anatomía de tu tarjeta y datos prohibidos',
				resumen:
					'Qué significa cada número del plástico y qué datos nunca compartes: NIP, CVV, contraseñas y códigos por SMS.',
			},
			{
				numero: '2.4',
				slug: 'clabe-tarjeta-cuenta',
				icono: 'hash',
				titulo: 'CLABE, número de tarjeta y número de cuenta',
				resumen:
					'Para qué sirve cada número y cuál compartir cuando alguien te quiere hacer una transferencia o depósito.',
			},
			{
				numero: '2.5',
				slug: 'estado-de-cuenta',
				icono: 'receipt',
				titulo: 'Tu estado de cuenta, sin lenguaje aburrido',
				resumen:
					'Leer tu resumen mensual en 30 segundos: saldo, movimientos, fecha límite y pago para no generar intereses.',
			},
			{
				numero: '2.6',
				slug: 'comisiones',
				icono: 'magnifying-glass',
				titulo: 'Comisiones ocultas y cómo evitarlas',
				resumen:
					'Qué son los cobros por manejo de cuenta o saldo mínimo, y qué revisar para no pagarlos.',
			},
		],
	},
	{
		clave: 'pagar-y-transferir',
		numero: 3,
		titulo: 'Pagar y transferir con seguridad',
		promesa: 'Mover tu dinero sin miedo y reconocer una estafa a tiempo.',
		intro:
			'Mandar dinero es fácil, pero hay errores y trampas comunes. Aquí aprendes a transferir sin miedo y a proteger tus cuentas.',
		icono: 'shield-check',
		lecciones: [
			{
				numero: '3.1',
				slug: 'anatomia-de-una-transferencia',
				icono: 'paper-plane-tilt',
				titulo: 'Anatomía de una transferencia',
				resumen:
					'Cómo enviar dinero por SPEI, qué poner en el concepto y revisar siempre el nombre de quien recibe antes de confirmar.',
			},
			{
				numero: '3.2',
				slug: 'tarjeta-digital',
				icono: 'device-mobile',
				titulo: 'Tarjetas digitales para comprar en línea',
				resumen:
					'Por qué no usar los datos de tu tarjeta física en tiendas en línea o videojuegos, y qué es una tarjeta digital con CVV dinámico.',
			},
			{
				numero: '3.3',
				slug: 'estafas-para-jovenes',
				icono: 'warning-circle',
				titulo: 'Estafas diseñadas para jóvenes',
				resumen:
					'Identificar mensajes falsos por WhatsApp, Instagram o correo: "ganaste un premio", "tu paquete no se entregó", "tu cuenta fue bloqueada".',
			},
			{
				numero: '3.4',
				slug: 'candados-de-seguridad',
				icono: 'fingerprint',
				titulo: 'Candados de seguridad en tu app',
				resumen:
					'Tres ajustes rápidos: huella o rostro, apagar tus tarjetas cuando no las usas y un límite de gasto diario.',
			},
			{
				numero: '3.5',
				slug: 'wifi-publico',
				icono: 'wifi-high',
				titulo: 'El riesgo de usar Wi-Fi público para entrar a tu banco',
				resumen:
					'Por qué abrir tu app bancaria en el internet gratis de una plaza o café expone tus contraseñas.',
			},
		],
	},
	{
		clave: 'credito',
		numero: 4,
		titulo: 'Entender el crédito',
		promesa: 'Usar tu primera tarjeta sin pagar de más.',
		intro:
			'Una tarjeta de crédito no es dinero extra: es dinero prestado. Aquí vas a ver cómo usarla sin pagar de más.',
		icono: 'credit-card',
		lecciones: [
			{
				numero: '4.1',
				slug: 'por-que-evitar-deudas',
				icono: 'hand-palm',
				titulo: '¿Por qué evitar las deudas?',
				resumen:
					'Pedir prestado no aumenta tus ingresos: le quitas dinero a tu "yo" del próximo mes.',
			},
			{
				numero: '4.2',
				slug: 'que-son-los-intereses',
				icono: 'percent',
				titulo: '¿Qué son los intereses?',
				resumen:
					'El interés es la renta que te cobran por prestarte dinero. Si te atrasas, la deuda crece cada mes.',
			},
			{
				numero: '4.3',
				slug: 'msi-vs-pagos-chiquitos',
				icono: 'calendar-dots',
				titulo: 'Meses sin intereses vs. pagos chiquitos',
				resumen:
					'Cuándo conviene dividir una compra a MSI y por qué los "pagos chiquitos" pueden hacer que pagues mucho más.',
			},
			{
				numero: '4.4',
				slug: 'fecha-de-corte-y-fecha-limite',
				icono: 'calendar-check',
				titulo: 'Fecha de corte vs. fecha límite de pago',
				resumen:
					'La regla de oro: el corte suma lo que gastaste; la fecha límite es el último día para pagar sin intereses.',
			},
			{
				numero: '4.5',
				slug: 'la-trampa-del-pago-minimo',
				icono: 'hourglass-medium',
				titulo: 'La trampa del pago mínimo',
				resumen:
					'Pagar el mínimo no te salva: sigues pagando intereses y tu deuda parece eterna.',
			},
			{
				numero: '4.6',
				slug: 'prestamos-rapidos-y-bnpl',
				icono: 'lightning',
				titulo: 'Apps de préstamos rápidos y "compra ahora, paga después"',
				resumen:
					'Los peligros de las apps de préstamos informales y cómo no perder el control con los pagos a plazos.',
			},
			{
				numero: '4.7',
				slug: 'si-no-pagas-tu-tarjeta',
				icono: 'seal-warning',
				titulo: '¿Qué pasa si no pagas tu tarjeta de crédito?',
				resumen:
					'Las consecuencias reales: bloqueo, intereses moratorios, llamadas de cobranza y un historial negativo.',
			},
		],
	},
	{
		clave: 'historial-y-rendimiento',
		numero: 5,
		titulo: 'Comprender el historial y el rendimiento',
		promesa: 'Construir tu historial desde los 18 y hacer que tu dinero crezca.',
		intro:
			'Lo que haces hoy con tu crédito y tu ahorro te acompaña por años. Aquí vas a entender tu historial y cómo puede crecer tu dinero.',
		icono: 'chart-line-up',
		lecciones: [
			{
				numero: '5.1',
				slug: 'historial-crediticio',
				icono: 'file-text',
				titulo: 'Tu historial crediticio',
				resumen:
					'Qué es el Buró de Crédito (no es una lista negra) y por qué un buen historial te abre puertas de adulto.',
			},
			{
				numero: '5.2',
				slug: 'historial-desde-cero',
				icono: 'steps',
				titulo: 'Cómo construir un buen historial desde cero',
				resumen:
					'Pasos seguros para empezar a demostrar que eres confiable apenas cumples 18.',
			},
			{
				numero: '5.3',
				slug: 'inflacion',
				icono: 'trend-down',
				titulo: 'La inflación, el monstruo que encoge tus billetes',
				resumen:
					'Por qué $500 guardados bajo el colchón por 3 años alcanzan para menos cosas.',
			},
			{
				numero: '5.4',
				slug: 'guardar-vs-multiplicar',
				icono: 'plant',
				titulo: '¿Por qué invertir? Guardar vs. multiplicar',
				resumen:
					'La diferencia entre ahorrar para metas cercanas y poner tu dinero a trabajar para ganarle a la inflación.',
			},
			{
				numero: '5.5',
				slug: 'empezar-a-invertir',
				icono: 'shield-check',
				titulo: 'Cómo empezar a invertir fácil y seguro',
				resumen:
					'Opciones reguladas y de bajo riesgo en México donde puedes empezar con poco dinero.',
			},
			{
				numero: '5.6',
				slug: 'interes-compuesto',
				icono: 'trend-up',
				titulo: 'El interés compuesto: tu superpoder por edad',
				resumen:
					'Cómo las ganancias generan nuevas ganancias, y por qué empezar a los 18 con poco puede superar empezar a los 35 con mucho.',
			},
			{
				numero: '5.7',
				slug: 'cuidado-con-los-gurus',
				icono: 'megaphone',
				titulo: 'Cuidado con los "gurús" de internet',
				resumen:
					'Señales para detectar estafas piramidales, falsos expertos en cripto y promesas de dinero fácil.',
			},
		],
	},
];

export const totalLecciones = temario.reduce((n, m) => n + m.lecciones.length, 0);

export const moduloPorClave = (clave: string) => temario.find((m) => m.clave === clave);

/** Busca la lección por su número ("4.5") y devuelve también su módulo. */
export function buscarLeccion(numero: string) {
	for (const modulo of temario) {
		const leccion = modulo.lecciones.find((l) => l.numero === numero);
		if (leccion) return { modulo, leccion };
	}
	return undefined;
}

/**
 * Enlace al cuestionario anónimo de Google Forms (antes y después del piloto).
 * Déjenlo vacío hasta tenerlo. El formulario NO debe pedir correo, nombre ni teléfono.
 */
export const FORMULARIO_PILOTO = '';
