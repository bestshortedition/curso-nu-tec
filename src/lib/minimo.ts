/**
 * Cálculo del simulador "El mínimo no alcanza". EJEMPLO ILUSTRATIVO.
 *
 * Supuestos (se explican en la página):
 * - No se hacen compras nuevas mientras se paga la deuda.
 * - Cada mes se cobran intereses sobre el saldo y IVA (16%) sobre esos intereses.
 * - Pago mínimo según la regla de Banxico: el mayor entre
 *   (a) 1.5% del saldo + intereses + IVA, y
 *   (b) 1.25% del límite de crédito.
 * - No incluye comisiones ni seguros.
 */
export const IVA = 0.16;

export interface Entrada {
	deuda: number;
	/** Tasa de interés anual, en decimal (0.6 = 60%). Ilustrativa. */
	tasaAnual: number;
	limite: number;
	/** Monto fijo al mes. Si es null, se paga solo el mínimo. */
	pagoFijo: number | null;
}

export interface Resultado {
	meses: number;
	/** Intereses + IVA pagados en total. */
	intereses: number;
	pagado: number;
	primerPago: number;
	/** true si con ese pago la deuda nunca baja. */
	nuncaTermina: boolean;
}

export function pagoMinimo(saldo: number, interes: number, limite: number): number {
	return Math.max(saldo * 0.015 + interes * (1 + IVA), limite * 0.0125);
}

export function simular({ deuda, tasaAnual, limite, pagoFijo }: Entrada): Resultado {
	const tasaMensual = tasaAnual / 12;
	let saldo = deuda;
	let meses = 0;
	let intereses = 0;
	let pagado = 0;
	let primerPago = 0;

	while (saldo > 0.005 && meses < 600) {
		const interes = saldo * tasaMensual;
		const conIntereses = saldo + interes * (1 + IVA);
		let pago = pagoFijo ?? pagoMinimo(saldo, interes, limite);
		if (pago >= conIntereses) pago = conIntereses;
		if (pagoFijo !== null && pago <= interes * (1 + IVA)) {
			return { meses: Infinity, intereses: Infinity, pagado: Infinity, primerPago: pago, nuncaTermina: true };
		}
		if (meses === 0) primerPago = pago;
		intereses += interes * (1 + IVA);
		pagado += pago;
		saldo = conIntereses - pago;
		meses++;
	}
	return { meses, intereses, pagado, primerPago, nuncaTermina: false };
}

export const pesos = (n: number) =>
	n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

export const tiempo = (meses: number) => {
	if (meses <= 1) return '1 mes';
	if (meses < 24) return `${meses} meses`;
	const a = Math.floor(meses / 12);
	const m = meses % 12;
	return m === 0 ? `${a} años` : `${a} años y ${m} ${m === 1 ? 'mes' : 'meses'}`;
};
