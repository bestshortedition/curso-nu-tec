/**
 * Palabras nuevas del glosario que salen en las lecciones del módulo 2.
 * Mismo formato y reglas que src/data/glosario.ts (definición de 1 o 2 frases, ejemplo de alguien
 * de 17 o 18 años, fuente oficial). Antes de agregar una, revisen que no exista ya en glosario.ts.
 */
import type { Palabra } from '../glosario';

export const palabras: Palabra[] = [
	{
		id: 'sofipo',
		palabra: 'Sofipo',
		definicion:
			'Sociedad Financiera Popular: una institución que recibe ahorro y presta dinero. Su seguro de depósito protege hasta 25 mil UDIS por persona, menos que en un banco.',
		ejemplo: 'Antes de guardar su dinero en una app, Sofi revisa en el SIPRES si es banco, Sofipo u otra cosa.',
		fuente: { nombre: 'CONDUSEF, Seguros de depósito del sector financiero', url: 'https://www.condusef.gob.mx/?p=contenido&idc=709&idcat=1' },
		ver: ['ipab', 'sipres'],
	},
	{
		id: 'ipab',
		palabra: 'IPAB (seguro de depósito)',
		definicion:
			'El instituto que protege tu dinero en un banco. Si el banco quiebra, te regresa hasta 400 mil UDIS por persona y por banco.',
		ejemplo: 'Leo guarda lo de su trabajo de fin de semana en su cuenta de banco. Ese dinero tiene la protección del IPAB.',
		fuente: { nombre: 'CONDUSEF, Seguros de depósito del sector financiero', url: 'https://www.condusef.gob.mx/?p=contenido&idc=709&idcat=1' },
		ver: ['sipres'],
	},
	{
		id: 'cvv',
		palabra: 'CVV',
		definicion:
			'El código de 3 o 4 números que está atrás de tu tarjeta. Te lo piden para comprar por internet o por teléfono, así que no se comparte.',
		ejemplo: 'Una página de un sorteo le pide a Emi su CVV. Emi cierra la página: es un intento de fraude.',
		fuente: { nombre: 'Banxico, Buenas prácticas de cuentas de débito', url: 'https://comparador.banxico.org.mx/ComparadorCrediticio/recomendaciones-cuentas-deposito.jsp' },
		ver: ['codigos-y-nip'],
	},
	{
		id: 'cuenta-basica',
		palabra: 'Cuenta básica',
		definicion:
			'Una cuenta que por ley todos los bancos deben ofrecer sin comisiones. Incluye tarjeta de débito y retiros en los cajeros de tu banco.',
		ejemplo: 'Santi quiere una cuenta para recibir su pago del fin de semana sin que le cobren por tenerla. Pregunta por la cuenta básica.',
		fuente: { nombre: 'Banxico, Términos de cuentas de débito', url: 'https://comparador.banxico.org.mx/ComparadorCrediticio/terminos-cuentas-deposito.jsp' },
		ver: ['comision', 'saldo-promedio-minimo'],
	},
	{
		id: 'saldo-promedio-minimo',
		palabra: 'Saldo promedio mínimo',
		definicion:
			'Lo que en promedio debes tener en tu cuenta durante el mes. Si alguna cuenta lo pide y no lo cumples, te puede cobrar una comisión.',
		ejemplo: 'La cuenta que vio Mariana pide un saldo promedio mínimo. Ella pregunta cuánto es antes de abrirla.',
		fuente: { nombre: 'Banxico, Términos de cuentas de débito', url: 'https://comparador.banxico.org.mx/ComparadorCrediticio/terminos-cuentas-deposito.jsp' },
		ver: ['comision', 'cuenta-basica'],
	},
];
