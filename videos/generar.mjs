// Arma un video estilo reel (HTML para HyperFrames) a partir de un guion en JSON.
// Mismo estilo que el video hecho a mano de la lección 4.5 (videos/pago-minimo).
//
// Uso (desde la carpeta videos):
//   node generar.mjs efecto-hormiga        → crea videos/efecto-hormiga/index.html
//   node generar.mjs --todos               → todos los guiones de videos/guiones/
// Luego:  npm run render -- efecto-hormiga
//
// Guion: videos/guiones/<archivo>.json
// {
//   "aviso": "Ejemplo ilustrativo",            (opcional: se ve arriba durante el video)
//   "escenas": [ { "tipo": "...", "dur": 4, ... }, ... ]
// }
// Tipos de escena (todas aceptan "sobre": texto chico arriba):
//   gancho   { a, b }                              Dos frases grandes. Siempre va primero.
//   tarjeta  { etiqueta, monto, pie }              Tarjeta oscura con un monto que sube.
//   cifra    { valor, pie, color }                 Un número grande (si es "$1,234" o "64%", cuenta).
//   barra    { total, partes:[{valor,texto,etq}] } Una barra partida en dos o tres.
//   comparar { columnas:[{valor,texto,etq,resaltar}], remate }  Dos columnas que crecen.
//   lista    { items:[{tono,texto}], numerada }    2 a 4 ideas que aparecen una por una.
//   puntos   { total, llenos, leyenda, remate }    Puntos que se llenan (personas, meses).
//   chat     { de, texto, alerta }                 Un mensaje en el celular (estafas).
//   cierre   { a, b, c, destacado }                Pantalla oscura final.
import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const esc = (t = '') => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** "$1,234" → { pre:'$', n:1234, suf:'' } para animar el conteo. */
function numero(t) {
	const m = String(t).match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
	if (!m) return null;
	return { pre: m[1], n: Number(m[2].replace(/,/g, '')), suf: m[3], dec: m[2].includes('.') ? m[2].split('.')[1].length : 0 };
}
const ICONOS = {
	bien: '<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/>',
	mal: '<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>',
	neutro: '<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,144a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"/>',
	alerta: '<path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/>',
};
const svg = (n, cls = '') => `<svg class="${cls}" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">${ICONOS[n] ?? ICONOS.neutro}</svg>`;

function escena(e, i, t0) {
	const id = `e${i + 1}`;
	const sobre = e.sobre ? `<p class="sobre ap" data-t="0">${esc(e.sobre)}</p>` : '';
	let html = '';
	const anim = []; // [selector, tipo, retraso]
	switch (e.tipo) {
		case 'gancho':
			html = `<div class="caja caja--gancho"><p class="titulo gan-a">${esc(e.a)}</p><p class="titulo gan-b">${esc(e.b)}</p></div>`;
			break;
		case 'tarjeta':
			html = `<div class="caja">${sobre}<div class="tarjeta ap" data-t="0.15" data-anim="tarjeta"><div class="chip"></div><p class="tar-etq">${esc(e.etiqueta)}</p><p class="tar-monto cifra" data-cuenta="${esc(e.monto)}">${esc(e.monto)}</p></div>${e.pie ? `<p class="pie ap" data-t="2">${esc(e.pie)}</p>` : ''}</div>`;
			break;
		case 'cifra':
			html = `<div class="caja">${sobre}<p class="grande cifra ap ${e.color === 'morado' ? 'morado' : ''}" data-t="0.2" data-anim="pop" data-cuenta="${esc(e.valor)}">${esc(e.valor)}</p>${e.pie ? `<p class="pie titulo ap" data-t="1.6">${esc(e.pie)}</p>` : ''}</div>`;
			break;
		case 'barra': {
			const suma = e.partes.reduce((n, p) => n + p.valor, 0);
			const colores = ['var(--morado)', 'var(--tinta)', 'var(--lila)'];
			html = `<div class="caja">${sobre}${e.total ? `<p class="medio cifra ap" data-t="0.15" data-anim="pop">${esc(e.total)}</p>` : ''}<div class="barra ap" data-t="0.8">${e.partes
				.map((p, j) => `<span class="parte" style="flex:${p.valor / suma};background:${colores[j]}" data-t="${1.1 + j * 1.1}"></span>`)
				.join('')}</div><div class="barra-etqs">${e.partes
				.map((p, j) => `<p class="barra-etq ap" data-t="${1.5 + j * 1.1}" style="color:${j === 0 ? 'var(--morado)' : 'var(--tinta)'}"><b class="cifra">${esc(p.texto)}</b>${esc(p.etq)}</p>`)
				.join('')}</div></div>`;
			break;
		}
		case 'comparar': {
			const max = Math.max(...e.columnas.map((c) => c.valor));
			html = `<div class="caja caja--comparar">${sobre}<div class="cols">${e.columnas
				.map(
					(c, j) =>
						`<div class="col"><p class="col-num cifra ap" data-t="${0.9 + j * 1.2}">${esc(c.texto)}</p><div class="col-bar ${c.resaltar ? 'resalta' : ''}" style="height:${Math.max(40, (c.valor / max) * 640)}px" data-t="${0.5 + j * 1.2}"></div><p class="col-etq ap ${c.resaltar ? 'morado' : ''}" data-t="0.3">${esc(c.etq)}</p></div>`,
				)
				.join('')}</div>${e.remate ? `<p class="remate titulo ap" data-t="${0.9 + e.columnas.length * 1.2}">${esc(e.remate)}</p>` : ''}</div>`;
			break;
		}
		case 'lista':
			html = `<div class="caja">${sobre}<ul class="lista ${e.numerada ? 'numerada' : ''}">${e.items
				.map(
					(it, j) =>
						`<li class="ap ${it.tono ?? 'neutro'}" data-t="${0.5 + j * 1.0}">${e.numerada ? `<span class="num cifra">${j + 1}</span>` : svg(it.tono ?? 'neutro', 'ico')}<span>${esc(it.texto)}</span></li>`,
				)
				.join('')}</ul></div>`;
			break;
		case 'puntos':
			html = `<div class="caja">${sobre}<div class="puntos ap" data-t="0.3" data-total="${e.total}" data-llenos="${e.llenos}" style="grid-template-columns:repeat(${e.total > 50 ? 12 : e.total > 20 ? 7 : 5},1fr)">${'<span></span>'.repeat(e.total)}</div>${e.leyenda ? `<p class="leyenda ap" data-t="0.6">${esc(e.leyenda)}</p>` : ''}${e.remate ? `<p class="remate titulo ap" data-t="${(e.dur ?? 5) - 2}">${esc(e.remate)}</p>` : ''}</div>`;
			break;
		case 'chat':
			html = `<div class="caja">${sobre}<div class="cel ap" data-t="0.2" data-anim="tarjeta"><p class="cel-de">${esc(e.de)}</p><p class="burbuja">${esc(e.texto)}</p></div>${e.alerta ? `<p class="alerta ap" data-t="2.2" data-anim="pop">${svg('alerta', 'ico')}<span>${esc(e.alerta)}</span></p>` : ''}</div>`;
			break;
		case 'cierre':
			html = `<div class="caja caja--cierre"><p class="titulo cie-a ap" data-t="0.1">${esc(e.a)}</p>${e.b ? `<p class="titulo cie-b ap" data-t="1.0">${esc(e.b)}</p>` : ''}<span class="raya ap" data-t="1.9" data-anim="raya"></span>${e.c ? `<p class="titulo cie-c ap" data-t="2.2">${esc(e.c)}</p>` : ''}${e.destacado ? `<p class="destacado ap" data-t="2.9" data-anim="pop">${esc(e.destacado)}</p>` : ''}</div>`;
			break;
		default:
			throw new Error(`Tipo de escena desconocido: ${e.tipo}`);
	}
	return `<section id="${id}" class="escena clip ${e.tipo === 'cierre' ? 'oscura' : ''}" data-tipo="${e.tipo}" data-start="${t0}" data-duration="${e.dur}" data-track-index="0">${html}</section>`;
}

const CSS = `
@font-face{font-family:'Geist';src:url('assets/fonts/geist-latin-wght-normal.woff2') format('woff2');font-weight:100 900}
@font-face{font-family:'Geist Mono';src:url('assets/fonts/geist-mono-latin-wght-normal.woff2') format('woff2');font-weight:100 900}
@font-face{font-family:'Hanken Grotesk';src:url('assets/fonts/hanken-grotesk-latin-wght-normal.woff2') format('woff2');font-weight:100 900}
:root{--morado:#820ad1;--morado-claro:#efe3fa;--lila:#c79af0;--tinta:#1f1a24;--gris:#5f5966;--linea:#e8e3ee;--fondo:#fff;--fondo-2:#faf9fb;--verde:#1b7f4a;--rojo:#a3262e;--f-titulo:'Geist',sans-serif;--f-texto:'Hanken Grotesk',sans-serif;--f-cifra:'Geist Mono',monospace}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:var(--fondo)}
#root{position:relative;width:100%;height:100%;font-family:var(--f-texto);color:var(--tinta);background:var(--fondo)}
.escena{position:absolute;inset:0;padding:0 110px}
.oscura{background:var(--tinta);color:#fff}
.caja{position:absolute;left:110px;right:110px;top:300px;bottom:220px;display:flex;flex-direction:column;justify-content:center;gap:56px}
.titulo{font-family:var(--f-titulo);font-weight:600;letter-spacing:-0.045em;line-height:1.04}
.cifra{font-family:var(--f-cifra);font-variant-numeric:tabular-nums;letter-spacing:-0.04em}
.morado{color:var(--morado)}
.sobre{font-size:44px;font-weight:600;color:var(--gris);letter-spacing:-0.01em;line-height:1.2}
.caja--gancho{gap:90px}
.gan-a,.gan-b{font-size:132px}
.gan-b{color:var(--morado)}
.tarjeta{width:860px;height:520px;border-radius:44px;background:var(--tinta);color:#fff;padding:64px;box-shadow:0 40px 80px -30px rgb(31 26 36/.45)}
.chip{width:110px;height:84px;border-radius:18px;background:linear-gradient(135deg,#d9c27a,#b79a4e)}
.tar-etq{margin-top:90px;font-size:40px;font-weight:600;color:#c9c3cf}
.tar-monto{margin-top:6px;font-size:140px;font-weight:500;line-height:1}
.pie{font-size:60px;line-height:1.2;font-weight:500;letter-spacing:-0.02em}
.pie.titulo{font-size:80px;font-weight:600}
.grande{font-size:240px;font-weight:500;line-height:1}
.medio{font-size:170px;font-weight:500;line-height:1}
.barra{display:flex;width:860px;height:120px;border-radius:28px;background:var(--fondo-2);box-shadow:inset 0 0 0 3px var(--linea);overflow:hidden}
.parte{display:block;height:100%;transform-origin:left center}
.barra-etqs{display:flex;justify-content:space-between;gap:40px}
.barra-etq{font-size:40px;font-weight:600;line-height:1.25}
.barra-etq:last-child{text-align:right}
.barra-etq b{display:block;font-size:76px;font-weight:500}
.caja--comparar{justify-content:flex-start;gap:40px}
.cols{display:flex;gap:120px;align-items:flex-end;height:900px;border-bottom:4px solid var(--tinta);margin-top:20px}
.col{flex:1;display:flex;flex-direction:column;justify-content:flex-end;position:relative}
.col-num{font-size:72px;font-weight:500;margin-bottom:18px}
.col-bar{border-radius:24px 24px 0 0;background:var(--tinta);transform-origin:center bottom}
.col-bar.resalta{background:var(--morado)}
.col-etq{position:absolute;top:100%;margin-top:28px;font-size:40px;font-weight:600;line-height:1.2}
.remate{font-size:92px;color:var(--morado);margin-top:110px}
.lista{list-style:none;display:flex;flex-direction:column;gap:44px}
.lista li{display:flex;gap:34px;align-items:flex-start;font-family:var(--f-titulo);font-size:68px;font-weight:600;line-height:1.12;letter-spacing:-0.03em}
.lista .ico{flex:none;width:84px;height:84px;margin-top:2px}
.lista .bien .ico{color:var(--verde)}.lista .mal .ico{color:var(--rojo)}.lista .neutro .ico{color:var(--morado)}
.lista .num{flex:none;display:flex;align-items:center;justify-content:center;width:84px;height:84px;border-radius:50%;background:var(--morado);color:#fff;font-size:44px;font-weight:600}
.puntos{display:grid;gap:22px 14px;width:860px}
.puntos span{display:block;aspect-ratio:1;border-radius:50%;background:var(--linea)}
.puntos span.lleno{background:var(--morado)}
.leyenda{font-size:34px;color:var(--gris);font-weight:600}
.cel{width:860px;border-radius:44px;background:var(--fondo-2);box-shadow:inset 0 0 0 3px var(--linea);padding:56px}
.cel-de{font-size:38px;font-weight:700;color:var(--gris)}
.burbuja{margin-top:24px;padding:40px 44px;border-radius:12px 40px 40px 40px;background:#fff;box-shadow:0 20px 50px -24px rgb(31 26 36/.35);font-size:52px;line-height:1.25;font-weight:500}
.alerta{display:flex;gap:28px;align-items:center;padding:34px 44px;border-radius:999px;background:#fbeaeb;color:var(--rojo);font-family:var(--f-titulo);font-size:52px;font-weight:600;letter-spacing:-0.02em;width:fit-content}
.alerta .ico{width:64px;height:64px;flex:none}
.caja--cierre{gap:60px}
.cie-a,.cie-b{font-size:108px}
.cie-b{color:var(--lila)}
.raya{display:block;width:860px;height:3px;background:rgb(255 255 255/.2);transform-origin:left center}
.cie-c{font-size:62px;line-height:1.15}
.destacado{display:inline-flex;width:fit-content;padding:24px 44px;border-radius:999px;background:var(--morado);font-family:var(--f-titulo);font-size:56px;font-weight:600}
#avance{position:absolute;top:120px;left:110px;right:110px;height:8px;border-radius:8px;background:rgb(130 10 209/.14);overflow:hidden;z-index:20}
#avance-barra{width:100%;height:100%;background:var(--morado);transform-origin:left center}
#aviso{position:absolute;left:110px;right:110px;top:160px;display:flex;align-items:center;gap:18px;font-size:30px;font-weight:600;color:var(--gris);z-index:20}
#aviso i{display:block;width:14px;height:14px;border-radius:50%;background:var(--morado)}
`;

const JS = `
const tl = gsap.timeline({ paused: true });
const sale = 'power3.out';
const total = Number(document.getElementById('root').dataset.duration);
tl.fromTo('#avance-barra', { scaleX: 0 }, { scaleX: 1, duration: total, ease: 'none' }, 0);
const fmt = (n, p) => p.pre + n.toLocaleString('en-US', { minimumFractionDigits: p.dec, maximumFractionDigits: p.dec }) + p.suf;
const parsear = (t) => { const m = String(t).match(/^([^\\d]*)([\\d,]+(?:\\.\\d+)?)(.*)$/); return m ? { pre: m[1], n: Number(m[2].replace(/,/g, '')), suf: m[3], dec: m[2].includes('.') ? m[2].split('.')[1].length : 0 } : null; };
document.querySelectorAll('.escena').forEach((s) => {
  const t0 = Number(s.dataset.start), dur = Number(s.dataset.duration), tipo = s.dataset.tipo;
  if (tipo === 'gancho') {
    const [a, b] = s.querySelectorAll('.gan-a, .gan-b');
    tl.fromTo(a, { y: 0, opacity: 1 }, { y: -20, duration: 1.2, ease: 'none' }, t0);
    tl.fromTo(b, { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: sale }, t0 + 1.3);
  }
  s.querySelectorAll('.ap').forEach((el) => {
    const t = t0 + Number(el.dataset.t || 0), a = el.dataset.anim;
    if (a === 'tarjeta') tl.fromTo(el, { y: 260, rotation: -6, opacity: 0 }, { y: 0, rotation: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.4)' }, t);
    else if (a === 'pop') tl.fromTo(el, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)', transformOrigin: 'left center' }, t);
    else if (a === 'raya') tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: sale }, t);
    else tl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: sale }, t);
  });
  s.querySelectorAll('[data-cuenta]').forEach((el) => {
    const p = parsear(el.dataset.cuenta); if (!p || p.n < 2) return;
    const o = { v: 0 };
    tl.fromTo(o, { v: 0 }, { v: p.n, duration: 1.1, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(p.dec ? o.v : Math.round(o.v), p); } }, t0 + 0.6);
  });
  s.querySelectorAll('.parte').forEach((el) => tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, t0 + Number(el.dataset.t)));
  s.querySelectorAll('.col-bar').forEach((el) => tl.fromTo(el, { scaleY: 0 }, { scaleY: 1, duration: 1.0, ease: 'power2.out' }, t0 + Number(el.dataset.t)));
  const pts = s.querySelector('.puntos');
  if (pts) {
    const spans = [...pts.children], llenos = Number(pts.dataset.llenos), o = { v: 0 };
    tl.fromTo(o, { v: 0 }, { v: llenos, duration: Math.min(2.6, dur - 2.5), ease: 'power1.inOut', onUpdate: () => { const n = Math.round(o.v); spans.forEach((p, i) => p.classList.toggle('lleno', i < n)); } }, t0 + 1.0);
  }
  if (tipo !== 'cierre') tl.to(s.querySelectorAll('.caja > *'), { opacity: 0, y: -30, duration: 0.3, ease: 'power2.in' }, t0 + dur - 0.35);
});
window.__timelines['main'] = tl;
tl.seek(0);
`;

async function generar(nombre) {
	const guion = JSON.parse(await readFile(join(AQUI, 'guiones', `${nombre}.json`), 'utf8'));
	let t = 0;
	const secciones = guion.escenas.map((e, i) => {
		const html = escena(e, i, Number(t.toFixed(2)));
		t += e.dur;
		return html;
	});
	const total = Number(t.toFixed(2));
	const primera = guion.escenas[0]?.dur ?? 0;
	const ultima = guion.escenas.at(-1)?.dur ?? 0;
	const aviso = guion.aviso
		? `<p id="aviso" class="clip" data-start="${primera}" data-duration="${Number((total - primera - ultima).toFixed(2))}" data-track-index="1"><i></i><span>${esc(guion.aviso)}</span></p>`
		: '';
	const html = `<!doctype html>
<!-- GENERADO por videos/generar.mjs desde videos/guiones/${nombre}.json. No lo editen a mano: cambien el guion y vuelvan a generar. -->
<html lang="es" data-resolution="portrait">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1920" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
<style>${CSS}</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${total}" data-width="1080" data-height="1920">
${secciones.join('\n')}
<div id="avance"><div id="avance-barra"></div></div>
${aviso}
</div>
<script>${JS}</script>
</body>
</html>
`;
	const dir = join(AQUI, nombre);
	await mkdir(join(dir, 'assets', 'fonts'), { recursive: true });
	for (const f of ['geist-latin-wght-normal.woff2', 'geist-mono-latin-wght-normal.woff2', 'hanken-grotesk-latin-wght-normal.woff2']) {
		const destino = join(dir, 'assets', 'fonts', f);
		if (!existsSync(destino)) await copyFile(join(AQUI, 'pago-minimo', 'assets', 'fonts', f), destino);
	}
	if (!existsSync(join(dir, 'hyperframes.json'))) await copyFile(join(AQUI, 'pago-minimo', 'hyperframes.json'), join(dir, 'hyperframes.json'));
	if (!existsSync(join(dir, 'meta.json')))
		await writeFile(join(dir, 'meta.json'), JSON.stringify({ id: nombre, name: nombre, createdAt: new Date().toISOString() }, null, 2));
	await writeFile(join(dir, 'index.html'), html);
	console.log(`✓ ${nombre}: ${guion.escenas.length} escenas, ${total} s`);
	return total;
}

const args = process.argv.slice(2);
const nombres = args.includes('--todos')
	? (await readdir(join(AQUI, 'guiones'))).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''))
	: args;
if (!nombres.length) {
	console.error('Uso: node generar.mjs <archivo> | --todos');
	process.exit(1);
}
for (const n of nombres) await generar(n);
