// Revisa que cada lección se haga en unos 2 minutos: el texto que se ve + lo que dura el video.
// El texto del video ("Leer el video en texto") no se cuenta: va cerrado y es lo mismo que el video.
// Los campos obligatorios y las fuentes ya los revisa Astro (src/content.config.ts).
// Uso: npm run revisar   (también corre solo antes de `npm run build`)
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const RAIZ = 'src/content/lecciones';
const PALABRAS_POR_MINUTO = 180; // lectura en celular, aproximada
const LIMITE = 2.2; // la lección modelo 4.5 da 2.1: texto corto + video de ~30 s

async function archivos(dir) {
	const out = [];
	for (const e of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
		const p = join(dir, e.name);
		if (e.isDirectory()) out.push(...(await archivos(p)));
		else if (e.name.endsWith('.mdx')) out.push(p);
	}
	return out;
}

let errores = 0;
for (const f of await archivos(RAIZ)) {
	const txt = await readFile(f, 'utf8');
	const [, fm = '', cuerpo = ''] = txt.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];
	const visible = [
		...(fm.match(/^\s*(cita|dato|accion|pregunta|tema|texto):\s*(.*)$/gm) ?? []),
		...(fm.match(/^\s+- (?!nombre:|url:)(.*)$/gm) ?? []).filter((l) => !/^\s+- [a-z0-9-]+$/.test(l)),
		cuerpo
			.replace(/^import .*$/gm, '')
			.replace(/<VideoReel[\s\S]*?<\/VideoReel>/g, ' ')
			.replace(/<[^>]+>/g, ' ')
			.replace(/\{[^}]*\}/g, ' '),
		...(cuerpo.match(/(pregunta)="[^"]*"/g) ?? []),
		// Textos entre comillas de los componentes, sin nombres internos (íconos, tonos: 'check-circle', 'bien').
		...(cuerpo.match(/'[^']{3,}'/g) ?? []).filter((t) => !/^'[a-z0-9-]+'$/.test(t)),
	].join(' ');
	const palabras = visible.split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length;
	const video = Number(cuerpo.match(/<VideoReel[^>]*segundos=\{(\d+)\}/)?.[1] ?? 0);
	const min = palabras / PALABRAS_POR_MINUTO + video / 60;
	console.log(`${min > LIMITE ? '✗' : '✓'} ${f}: ${palabras} palabras + video de ${video} s (~${min.toFixed(1)} min)`);
	if (min > LIMITE) {
		console.error('  → Es muy larga. Recorten texto o pártanla en dos lecciones.');
		errores++;
	}
}
if (errores) process.exit(1);
