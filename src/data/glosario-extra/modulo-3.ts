/**
 * Palabras nuevas del glosario que salen en las lecciones del módulo 3.
 * Mismo formato y reglas que src/data/glosario.ts (definición de 1 o 2 frases, ejemplo de alguien
 * de 17 o 18 años, fuente oficial). Antes de agregar una, revisen que no exista ya en glosario.ts.
 */
import type { Palabra } from '../glosario';

export const palabras: Palabra[] = [
	{
		id: 'cep',
		palabra: 'CEP (Comprobante Electrónico de Pago)',
		definicion:
			'El comprobante oficial de una transferencia SPEI. Lo bajas gratis en la página de Banxico con la clave de rastreo, la fecha, los bancos, la cuenta y el monto.',
		ejemplo: 'Leo le transfirió a Sofi y ella dice que no le llegó. Leo baja su CEP y le muestra que el dinero sí se depositó.',
		fuente: { nombre: 'Banxico, Comprobante Electrónico de Pago', url: 'https://www.banxico.org.mx/cep/' },
		ver: ['spei', 'clabe'],
	},
	{
		id: 'tarjeta-digital',
		palabra: 'Tarjeta digital',
		definicion:
			'Una versión de tu tarjeta que vive en la app de tu banco. Sirve para pagar en línea y trae un código de seguridad que cambia (CVV dinámico).',
		ejemplo: 'Emi compra el pase de un videojuego con su tarjeta digital, no con los datos de su plástico.',
		fuente: {
			nombre: 'CONDUSEF, ¿Conoces las tarjetas virtuales?',
			url: 'https://www.uv.mx/iiesca/files/2023/08/EFI_H_Conoces-las-tarjetas-virtuales.pdf',
		},
		ver: ['cvv-dinamico', 'cvv'],
	},
	{
		id: 'cvv-dinamico',
		palabra: 'CVV dinámico',
		definicion:
			'Un código de seguridad que te da tu app y que cambia seguido. Dura pocos minutos: si alguien lo copia, después ya no le sirve.',
		ejemplo: 'Ana abre su app, ve su CVV dinámico y lo escribe en la tienda en línea. Más tarde, ese código ya caducó.',
		fuente: {
			nombre: 'CONDUSEF, ¿Conoces las tarjetas virtuales?',
			url: 'https://www.uv.mx/iiesca/files/2023/08/EFI_H_Conoces-las-tarjetas-virtuales.pdf',
		},
		ver: ['tarjeta-digital', 'cvv'],
	},
	{
		id: 'phishing',
		palabra: 'Phishing (suplantación)',
		definicion:
			'Un engaño en el que alguien finge ser tu banco o una empresa para robar tus datos. Por SMS se llama smishing; por llamada, vishing.',
		ejemplo: 'A Diego le llega un correo "del banco" con un link para "desbloquear" su cuenta. No lo abre: es phishing.',
		fuente: { nombre: 'CONDUSEF, Tipos de fraude', url: 'https://www.condusef.gob.mx/?p=tipos-de-fraude' },
		ver: ['codigos-y-nip'],
	},
	{
		id: 'aclaracion',
		palabra: 'Aclaración (reclamación)',
		definicion:
			'Lo que pides a tu banco cuando ves un cargo que no reconoces o un error. Te deben dar un número de folio y una respuesta.',
		ejemplo: 'Santi ve un cargo de una tienda donde nunca compró. Lo reporta en su app y guarda su folio.',
		fuente: {
			nombre: 'CONDUSEF, Proteja su Dinero: ¡No te calles!',
			url: 'https://revista.condusef.gob.mx/usuario-inteligente/2026/08/no-te-calles/',
		},
	},
	{
		id: 'wifi-publico',
		palabra: 'Wi-Fi público',
		definicion:
			'Internet gratis y abierto de un lugar como una plaza, un café o un aeropuerto. Se puede conectar cualquiera, por eso no es buen lugar para tu banco.',
		ejemplo: 'Vale está en la plaza y quiere revisar su saldo. Apaga el Wi-Fi gratis y usa sus datos.',
		fuente: {
			nombre: 'CONDUSEF, Proteja su Dinero: Ofertas irresistibles… y peligrosas',
			url: 'https://revista.condusef.gob.mx/usuario-inteligente/2026/07/ofertas-irresistibles-y-peligrosas/',
		},
	},
];
