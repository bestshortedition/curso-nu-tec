/**
 * Avance del curso guardado SOLO en este navegador (localStorage).
 * Sin cuentas ni datos personales. Si el navegador no deja guardar, todo sigue funcionando.
 */
const CLAVE = 'bytes-de-dinero:v1';

export interface Estado {
	/** Lecciones terminadas: número → fecha (AAAA-MM-DD). */
	terminadas: Record<string, string>;
	/** Respuesta a "¿Te sirvió?" por lección. */
	sirvio: Record<string, 'si' | 'masomenos' | 'no'>;
	/** Ya vio el hook de entrada (para no repetirlo si cierra a media encuesta). */
	hookVisto?: boolean;
	/** Encuesta inicial. respuestas: id de pregunta → índice elegido (-1 = "No sé"). */
	diagnostico?: { fecha: string; respuestas: Record<string, number>; confianza: number };
	/** Primera respuesta en el ejercicio de cada lección (id de pregunta del diagnóstico). Es la que mide. */
	respuestas: Record<string, { i: number; bien: boolean; fecha: string }>;
	/** Última respuesta, si la volvió a intentar al repasar. Solo se muestra; no cambia la medición. */
	repaso?: Record<string, { i: number; bien: boolean; fecha: string }>;
	/** Confianza al final, de 1 a 5. */
	confianzaFinal?: number;
}

const vacio = (): Estado => ({ terminadas: {}, sirvio: {}, respuestas: {} });
const hoy = () => new Date().toISOString().slice(0, 10);

export function leer(): Estado {
	try {
		const crudo = localStorage.getItem(CLAVE);
		return crudo ? { ...vacio(), ...JSON.parse(crudo) } : vacio();
	} catch {
		return vacio();
	}
}

function guardar(e: Estado) {
	try {
		localStorage.setItem(CLAVE, JSON.stringify(e));
	} catch {
		/* modo privado o almacenamiento bloqueado: no pasa nada */
	}
}

export function terminar(numero: string) {
	const e = leer();
	if (!e.terminadas[numero]) {
		e.terminadas[numero] = hoy();
		guardar(e);
	}
}

export function marcarSirvio(numero: string, valor: Estado['sirvio'][string]) {
	const e = leer();
	e.sirvio[numero] = valor;
	guardar(e);
}

export function marcarHookVisto() {
	const e = leer();
	e.hookVisto = true;
	guardar(e);
}

export function guardarDiagnostico(respuestas: Record<string, number>, confianza: number) {
	const e = leer();
	e.diagnostico = { fecha: hoy(), respuestas, confianza };
	guardar(e);
}

/**
 * La PRIMERA respuesta es la que sirve para medir si aprendió y no se cambia.
 * Si vuelve a intentar (al repasar), se guarda aparte como `repaso`.
 */
export function responder(id: string, i: number, bien: boolean) {
	const e = leer();
	const r = { i, bien, fecha: hoy() };
	if (!e.respuestas[id]) e.respuestas[id] = r;
	else e.repaso = { ...e.repaso, [id]: r };
	guardar(e);
}

export function guardarConfianzaFinal(valor: number) {
	const e = leer();
	e.confianzaFinal = valor;
	guardar(e);
}
