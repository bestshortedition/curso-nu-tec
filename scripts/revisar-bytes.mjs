// Revisa que cada byte cumpla las reglas del curso antes de publicar.
// Uso: npm run revisar   (también corre solo antes de `npm run build`)
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const RAIZ = 'src/content/docs';
const PALABRAS_POR_MINUTO = 180; // lectura en celular, aproximada
const OBLIGATORIOS = ['tema:', 'numero:', 'minutos:', 'duda:', 'accion:', 'fuentes:'];

async function archivos(dir) {
	const out = [];
	for (const e of await readdir(dir, { withFileTypes: true })) {
		const p = join(dir, e.name);
		if (e.isDirectory()) out.push(...(await archivos(p)));
		else if (/\.mdx?$/.test(e.name)) out.push(p);
	}
	return out;
}

let errores = 0;
for (const f of await archivos(RAIZ)) {
	const txt = await readFile(f, 'utf8');
	const [, fm = '', cuerpo = ''] = txt.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];
	if (!/^tipo:\s*byte\s*$/m.test(fm)) continue;

	for (const campo of OBLIGATORIOS) {
		if (!fm.includes(campo)) {
			console.error(`✗ ${f}: le falta "${campo.replace(':', '')}"`);
			errores++;
		}
	}
	if (!/url:\s*["']?https:\/\/[^\s]*(banxico\.org\.mx|condusef\.gob\.mx|gob\.mx|dof\.gob\.mx)/.test(fm)) {
		console.error(`✗ ${f}: necesita al menos una fuente de Banxico, CONDUSEF o DOF`);
		errores++;
	}
	// Texto que se lee: frontmatter visible + cuerpo, sin código ni etiquetas.
	const visible = [
		...(fm.match(/^\s*(title|texto|accion):\s*(.*)$/gm) ?? []),
		cuerpo.replace(/^import .*$/gm, '').replace(/<[^>]+>/g, ' ').replace(/\{[^}]*\}/g, ' '),
		...(cuerpo.match(/(pregunta|opciones)=("[^"]*"|\{[^}]*\})/g) ?? []),
	].join(' ');
	const palabras = visible.split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length;
	const minutos = palabras / PALABRAS_POR_MINUTO;
	const marca = minutos > 2 ? '✗' : '✓';
	console.log(`${marca} ${f}: ${palabras} palabras (~${minutos.toFixed(1)} min)`);
	if (minutos > 2) {
		console.error(`  → Pasa de 2 minutos. Pártanlo en dos bytes.`);
		errores++;
	}
}
if (errores) {
	console.error(`\n${errores} problema(s). Corríjanlos antes de publicar.`);
	process.exit(1);
}
console.log('\nTodos los bytes cumplen las reglas.');
