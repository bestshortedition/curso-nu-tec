// Genera, renderiza y exporta videos al sitio: public/videos/<archivo>.mp4 y su portada .jpg (720×1280).
// Uso (desde la carpeta videos):  node exportar.mjs efecto-hormiga [otro …]   |   node exportar.mjs --todos
import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const SITIO = join(AQUI, '..', 'public', 'videos');
const FFMPEG = join(AQUI, 'node_modules', 'ffmpeg-static', 'ffmpeg');
const args = process.argv.slice(2);
const nombres = args.includes('--todos')
	? readdirSync(join(AQUI, 'guiones')).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''))
	: args;

for (const n of nombres) {
	execFileSync('node', [join(AQUI, 'generar.mjs'), n], { stdio: 'inherit' });
	const mp4 = join(SITIO, `${n}.mp4`);
	execFileSync('npm', ['run', 'render', '--', n, '-o', mp4], { cwd: AQUI, stdio: ['ignore', 'ignore', 'inherit'] });
	// Portada: el gancho del inicio, ya con las dos frases en pantalla.
	execFileSync(FFMPEG, ['-y', '-loglevel', 'error', '-ss', '2.5', '-i', mp4, '-frames:v', '1', '-vf', 'scale=720:1280', '-q:v', '4', join(SITIO, `${n}.jpg`)]);
	console.log(`  → public/videos/${n}.mp4 y .jpg`);
}
