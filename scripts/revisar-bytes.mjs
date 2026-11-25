// Revisa que cada lección se lea en 2 minutos o menos.
// Los campos obligatorios y las fuentes ya los revisa Astro (src/content.config.ts).
// Uso: npm run revisar   (también corre solo antes de `npm run build`)
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const RAIZ = 'src/content/lecciones';
const PALABRAS_POR_MINUTO = 180; // lectura en celular, aproximada

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
		...(fm.match(/^\s*(cita|dato|accion):\s*(.*)$/gm) ?? []),
		cuerpo.replace(/^import .*$/gm, '').replace(/<[^>]+>/g, ' ').replace(/\{[^}]*\}/g, ' '),
		...(cuerpo.match(/(pregunta)="[^"]*"/g) ?? []),
		...(cuerpo.match(/'[^']{3,}'/g) ?? []),
	].join(' ');
	const palabras = visible.split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length;
	const min = palabras / PALABRAS_POR_MINUTO;
	console.log(`${min > 2 ? '✗' : '✓'} ${f}: ${palabras} palabras (~${min.toFixed(1)} min)`);
	if (min > 2) {
		console.error('  → Pasa de 2 minutos. Pártanla en dos lecciones.');
		errores++;
	}
}
if (errores) process.exit(1);
