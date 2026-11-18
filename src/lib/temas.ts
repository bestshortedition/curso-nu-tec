/**
 * Los 5 temas del curso, en el orden único de CLAUDE.md (sección 4).
 * Para activar un tema nuevo: cambien `activo` a true y creen su carpeta en src/content/docs/.
 */
export type ClaveTema = 'credito' | 'buro' | 'seguridad' | 'ahorro' | 'primera-cuenta';
export type NombreIcono = 'credit-card' | 'file-clock' | 'shield-check' | 'piggy-bank' | 'key-round';

export interface Tema {
	clave: ClaveTema;
	numero: number;
	titulo: string;
	resumen: string;
	icono: NombreIcono;
	activo: boolean;
}

export const temas: Tema[] = [
	{
		clave: 'credito',
		numero: 1,
		titulo: 'Crédito: tarjeta y préstamo personal',
		resumen: 'Límite, fecha de corte, pago mínimo, CAT, meses sin intereses y préstamo personal.',
		icono: 'credit-card',
		activo: true,
	},
	{
		clave: 'buro',
		numero: 2,
		titulo: 'Buró de crédito',
		resumen: 'Qué es, cómo empezar tu historial y qué lo mejora o lo daña.',
		icono: 'file-clock',
		activo: false,
	},
	{
		clave: 'seguridad',
		numero: 3,
		titulo: 'Seguridad',
		resumen: 'Llamadas falsas, transferir sin miedo, reclamar un cargo y bloquear tu tarjeta.',
		icono: 'shield-check',
		activo: false,
	},
	{
		clave: 'ahorro',
		numero: 4,
		titulo: 'Ahorro',
		resumen: 'Apartar antes de gastar, ahorrar con meta, rendimiento y gastos hormiga.',
		icono: 'piggy-bank',
		activo: false,
	},
	{
		clave: 'primera-cuenta',
		numero: 5,
		titulo: 'Tu primera cuenta a los 18',
		resumen: 'Qué necesitas, débito contra crédito y cómo elegir.',
		icono: 'key-round',
		activo: false,
	},
];

export const temaPorClave = (clave?: string) => temas.find((t) => t.clave === clave);

/**
 * Enlace al cuestionario anónimo de Google Forms (antes y después del piloto).
 * Déjenlo vacío hasta tener el formulario: el botón no se muestra.
 * El formulario NO debe pedir nombre, correo, teléfono ni otros datos personales.
 */
export const FORMULARIO_PILOTO = '';
