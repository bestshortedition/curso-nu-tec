// Genera las imágenes de vista previa para WhatsApp (1200×630) en public/og/.
// Uso: node scripts/generar-og.mjs   (solo hace falta cuando cambia un tema)
import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';

const temas = [
	{ clave: 'general', linea1: 'Lo básico del dinero,', linea2: 'en bytes de 1 a 2 minutos', icono: 'piggy-bank' },
	{ clave: 'credito', linea1: 'Crédito: tarjeta', linea2: 'y préstamo personal', icono: 'credit-card' },
	{ clave: 'buro', linea1: 'Buró de crédito', linea2: '', icono: 'file-clock' },
	{ clave: 'seguridad', linea1: 'Seguridad', linea2: '', icono: 'shield-check' },
	{ clave: 'ahorro', linea1: 'Ahorro', linea2: '', icono: 'piggy-bank' },
	{ clave: 'primera-cuenta', linea1: 'Tu primera cuenta', linea2: 'a los 18', icono: 'key-round' },
];

await mkdir('public/og', { recursive: true });
const logo = await sharp('src/assets/nu_white.png').resize({ width: 150 }).png().toBuffer();

for (const t of temas) {
	const svgIcono = (await readFile(`node_modules/lucide-static/icons/${t.icono}.svg`, 'utf8'))
		.replace(/<!--.*?-->/s, '')
		.replace(/width="\d+"/, 'width="200"')
		.replace(/height="\d+"/, 'height="200"')
		.replace(/stroke="currentColor"/, 'stroke="#EFE3FA"')
		.replace(/stroke-width="2"/, 'stroke-width="1.5"');
	const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#820AD1"/>
  <text x="250" y="108" font-family="Inter, Helvetica, Arial, sans-serif" font-size="34" font-weight="600" fill="#EFE3FA">× Tec · Bytes de dinero</text>
  <text x="80" y="330" font-family="Inter, Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="#FFFFFF">${t.linea1}</text>
  <text x="80" y="420" font-family="Inter, Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="#FFFFFF">${t.linea2}</text>
  <text x="80" y="550" font-family="Inter, Helvetica, Arial, sans-serif" font-size="30" fill="#EFE3FA">Curso para jóvenes por cumplir 18 · Contenido educativo</text>
</svg>`;
	await sharp(Buffer.from(svg))
		.composite([
			{ input: logo, top: 52, left: 80 },
			{ input: Buffer.from(svgIcono), top: 230, left: 920 },
		])
		.png()
		.toFile(`public/og/${t.clave}.png`);
	console.log('og/' + t.clave + '.png');
}
