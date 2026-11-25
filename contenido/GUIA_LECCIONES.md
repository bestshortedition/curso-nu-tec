# Guía para escribir una lección

Cómo se escribe cada lección del curso para que todas se vean y se sientan igual que la lección modelo, **4.5 "La trampa del pago mínimo"** (`src/content/lecciones/credito/la-trampa-del-pago-minimo.mdx`). Léanla completa antes de escribir: es la referencia de tono, largo y estructura.

Lean también `CLAUDE.md` (reglas de Nu, cifras y citas de las entrevistas).

## 1. Reglas que no se rompen

- **Neutral, sin vender.** Se explican las opciones que existen. Nunca "abre tu cuenta Nu", comparativos ni nombres de bancos, apps o marcas.
- **Solo productos que Nu ofrece:** cuenta de débito, apartados de ahorro con rendimiento, tarjeta de crédito, tarjeta garantizada, préstamo personal, buró e historial, seguridad y fraudes, transferencias. **No:** hipotecas, crédito automotriz, seguros, afores, bolsa, fondos, CETES, cripto como inversión, cuentas para menores. Se puede hablar de riesgos (apps de préstamos informales, estafas con cripto) para proteger, no para recomendar.
- **Cifras y citas exactas.** Las de las entrevistas son solo las de `CLAUDE.md`, sección 3, con su texto exacto. Nunca inventen cifras ni citas.
- **Todo dato técnico se verifica** en la fuente oficial (Banxico, CONDUSEF, IPAB, CNBV, INEGI, DOF) y se cita en `fuentes`. Si no lo pueden verificar, no lo pongan.
- **Ejemplos con números = "Ejemplo ilustrativo".** No pongan tasas ni comisiones de productos reales. Revisen las cuentas a mano (o con un script) dos veces.
- **Tono Nu:** de "tú", una idea por frase, menos de 15 palabras por frase, cálido, sin jerga. Si una palabra es técnica, va en el glosario y se marca con `<Termino>`.
- **Personas de su edad.** Los ejemplos son jóvenes de 17 o 18 años con nombre (Vale, Diego, Ana, Sofi, Leo, Mariana, Emi, Santi…): domingo o mesada, la prepa, salidas, conciertos, videojuegos, primer trabajo de fin de semana.
- **Cortas, como la 4.5.** `npm run revisar` suma el texto que se ve (unas 300 palabras como máximo) y lo que dura el video. Si pasa de 2.2 minutos, se recorta. El texto del video no cuenta: va cerrado.

## 2. El archivo

`src/content/lecciones/<clave-del-modulo>/<slug>.mdx`. La clave y el slug salen de `src/data/temario.ts`.

### Frontmatter

```yaml
---
numero: "1.1"                       # el del temario
descripcion: …                      # una frase para WhatsApp, máximo 160 caracteres
minutos: 2                          # 1 o 2
duda:
  pregunta: ¿…?                     # la duda que se resuelve, máximo 90 caracteres
  tema: …                           # el tema en 1 o 2 frases, máximo 220 caracteres
  cita:                             # opcional: cita TEXTUAL de CLAUDE.md (ver sección 6)
    texto: …
    quien: Joven de 17 años, sin cuenta
  cifra:                            # opcional: dato EXACTO de CLAUDE.md (ver sección 6)
    texto: …
    n: 16                           # cuántas personas tienen la duda (se pintan en morado)
    de: 25
accion: "…"                         # "Hoy": una acción concreta y pequeña para hacer hoy
resumen:                            # "En corto": 2 o 3 frases, máximo 120 caracteres cada una
  - …
palabras:                           # ids del glosario que se pueden consultar en la lección
  - …
fuentes:                            # al menos una fuente oficial, con URL que funcione
  - nombre: CONDUSEF, …
    url: https://…
---
```

### Cuerpo: 4 pantallas separadas por `---`

1. **`## Mira qué pasa.`** Una frase que pone la situación con una persona de su edad y el video.
2. **`## Ahora pruébalo tú.`** Un `<Simulador>` o un `<Clasifica>` (ver sección 3). Una frase antes, si hace falta.
3. **`## ¿Por qué pasa?`** (o un título igual de corto). Un `<ListaIconos>` con 3 ideas y, si hay una regla oficial, una `<Nota>` con su fuente.
4. **`<Ejercicio>`** con la pregunta final.

Después de eso la página agrega sola la pantalla final: "En corto", "Hoy", "¿Te sirvió?", siguiente lección y fuentes.

## 3. Componentes

Los `import` van debajo del frontmatter, con la ruta `../../../components/…`.

- **`<VideoReel archivo="<slug>" segundos={N} titulo="Video: …">texto del video</VideoReel>`**. El texto de adentro dice TODO lo que sale en el video (para quien no lo puede ver). `segundos` es la suma de las duraciones del guion. El video sale de `videos/guiones/<slug>.json` (ver sección 4).
- **`<Simulador planteo opciones leyenda como icono etiqueta />`**: eliges una opción y ves su resultado ya calculado. De 2 a 4 opciones. Ver el comentario al inicio de `src/components/Simulador.astro`. Úsenlo para todo lo que tenga números (cuánto suma, cuánto tardas, cuánto pagas).
- **`<Clasifica opciones items comillas />`**: una frase a la vez y eliges entre dos respuestas ("¿Estafa o real?", "¿Necesidad o antojo?", "¿Mito o realidad?"). De 4 a 6 frases. Ver `src/components/Clasifica.astro`.
- **`<ListaIconos items={[{ icono, tono, titulo, texto }]} />`**: 3 ideas. `tono`: `bien` (verde), `mal` (rojo) o `neutro` (morado). Íconos válidos: los de `src/components/Icono.astro`.
- **`<Nota titulo fuente>`**: una regla oficial en 1 o 2 frases, con su fuente corta.
- **`<Termino id="…">palabra</Termino>`**: palabra subrayada que abre su definición. Úsenlo 1 a 3 veces por lección, en el texto de los párrafos, la `Nota` o el `Ejercicio` (no dentro de props).
- **`<Ejercicio pregunta opciones correcta porque>explicación</Ejercicio>`**: 3 opciones, `correcta` empieza en 0, `porque` = una frase por opción que explica por qué está bien o mal. Debe ser una **situación con una persona**, no un concepto suelto. Si la lección es la de una pregunta del banco (`src/data/diagnostico.ts`: 1.4 ahorro, 3.3 llamada, 4.4 fecha-corte, 4.5 pago-minimo, 5.1 buro), usen `<Ejercicio diagnostico="id">explicación</Ejercicio>` sin pregunta ni opciones.

## 4. El video

Cada lección tiene un video vertical sin sonido, de 25 a 40 segundos, estilo reel. Se hace con un guion en JSON: `videos/guiones/<slug>.json`. El formato y los tipos de escena están al inicio de `videos/generar.mjs`.

Estructura típica: `gancho` → 3 a 5 escenas que explican con un ejemplo → `cierre`. Si hay números, pongan `"aviso": "Ejemplo ilustrativo"`.

Límites para que el texto quepa (en caracteres, contando espacios):

| Campo | Máximo |
|---|---|
| `gancho.a`, `gancho.b` | 22 |
| `sobre` | 40 |
| `cifra.valor` | 6 (ej. `$9,531`, `64%`) |
| `tarjeta.monto` | 9 |
| `tarjeta.etiqueta` | 24 |
| `pie` | 45 |
| `lista.items[].texto` | 40 (de 2 a 4 items) |
| `barra.partes[].texto` / `etq` | 7 / 22 |
| `comparar.columnas[].texto` / `etq` | 8 / 18 (2 columnas) |
| `remate` | 28 |
| `chat.texto` / `alerta` | 90 / 22 |
| `cierre.a`, `cierre.b` | 28 |
| `cierre.c` / `destacado` | 45 / 26 |

Duración por escena: gancho 3.4 s; escenas normales 4.5 a 6 s; cierre 5 s.

Para revisar que se ve bien, desde la carpeta `videos`:

```bash
node generar.mjs <slug>
npm run fotos -- <slug> --frames 8 -o <carpeta>
```

y abran el `contact-sheet.jpg`. Para exportar al sitio: `node exportar.mjs <slug>` (crea `public/videos/<slug>.mp4` y su portada `.jpg`).

## 5. Glosario

Las palabras están en `src/data/glosario.ts`. Si una lección necesita una palabra que no existe, agréguenla en `src/data/glosario-extra/modulo-N.ts` del módulo de la lección, con el mismo formato: `id` en minúsculas con guiones, definición de 1 o 2 frases, ejemplo con alguien de su edad y fuente oficial.

## 6. Cifras y citas de las entrevistas

Usen solo estas, con el texto exacto. `n` = cuántos tienen la duda (se pintan en morado).

| Lección | `cifra` | `cita` |
|---|---|---|
| 1.1 | "Gastan más en comida (20 de 25) y salidas con amigos (18 de 25)." n 20, de 25 | "Se me antoja comida en la prepa o salgo con mis amigos y termino usando lo que guardé." (Joven de 15 años, sin cuenta) |
| 1.4 | "20 de 25 ahorran, pero solo 3 de 20 apartan una cantidad fija; el resto ahorra lo que sobra." n 17, de 20 | "Como lo tengo ahí en mi cuarto, se me hace fácil sacarlo." (Joven de 17 años, sin cuenta) |
| 2.1 | "48% cree que los bancos digitales son menos seguros o no sabe." n 12, de 25 | "No hay como el efectivo." (Joven sin cuenta) |
| 2.2 | "40% dice que su primera tarjeta de crédito llega pronto." n 10, de 25 | — |
| 2.4 | — | "No sabía si pasar el número de la tarjeta o la CLABE." (Joven de 17 años, con cuenta) |
| 3.1 | "60% teme equivocarse al transferir." n 15, de 25 | — |
| 3.3 | "52% conoce a alguien a quien intentaron estafar, casi siempre con una llamada que finge ser del banco." n 13, de 25 | — |
| 3.4 | "48% (12 de 25) no le escribiría solo al banco si algo sale mal." n 12, de 25 | — |
| 4.1 | "96% les cree a sus papás cuando se habla de dinero, pero solo 2 de 17 aprendieron algo de crédito en casa." n 15, de 17 | — |
| 4.4 | "Solo 24% (6 de 25) explica bien qué es la fecha de corte." n 19, de 25 | — |
| 4.7 | — | "Solo las personas que no pagan están en el buró." (Joven con cuenta y tarjeta de crédito) |
| 5.1 | "92% (23 de 25) cree que estar en buró siempre es malo o no sabe." n 23, de 25 | "El buró es como una lista negra." (Joven de 16 años, sin cuenta) |
| 5.2 | — | "Yo pensaba que al buró nomás entrabas cuando quedabas debiendo." (Joven de 17 años, sin cuenta) |
| 5.4 | "68% (17 de 25) no sabe que ahorrar en el banco genera dinero." n 17, de 25 | "Es mejor ahorrar que invertir." (Joven con cuenta y tarjeta de crédito) |

Las demás lecciones van sin cifra ni cita.

## 7. Antes de dar por terminada una lección

- [ ] `npm run revisar` marca ✓ (2.2 minutos o menos, con el video).
- [ ] Cada dato técnico tiene su fuente oficial en `fuentes` y la URL abre.
- [ ] Las cuentas de los ejemplos están revisadas y dicen "Ejemplo ilustrativo".
- [ ] Ninguna marca, banco, app ni producto que Nu no ofrece.
- [ ] El texto del `VideoReel` dice lo mismo que el video.
- [ ] El video se ve bien (snapshot) y ningún texto se sale.
