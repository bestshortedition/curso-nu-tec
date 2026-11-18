# Curso de educación financiera Nu × Tec (sitio web)

Contexto del proyecto para Claude Code. Léelo completo antes de escribir código o contenido.

## 1. Qué es

Reto universitario del Tec de Monterrey con Nu México (socioformador). Fase 1 (investigación) terminada. Ahora construimos el curso como **sitio web** para mostrarlo y pilotearlo con jóvenes reales (Semana 4 del reto).

El curso es una colección de **"bytes de conocimiento"**: piezas mínimas, cada una resuelve UNA duda real de los jóvenes en 1 a 2 minutos, simple y fácil de aprender.

## 2. Lo que Nu pidió (reglas obligatorias)

Respuesta directa de las socioformadoras de Nu (17/11/2026):

- **Público:** jóvenes que están a punto de cumplir 18 años (17 a 18). No niños ni adolescentes de 15.
- **Neutral, no comercial:** el curso educa sobre las opciones que existen (crédito, ahorro, etc.). **No** debe convencer de que Nu es la mejor opción. Nada de "abre tu cuenta Nu", comparativos ni llamadas a la venta.
- **Solo temas de productos que Nu ofrece.** No hablar de productos que Nu no tiene. Ejemplo dado por Nu: nada de créditos hipotecarios.
  - Sí: cuenta de débito, apartados de ahorro con rendimiento, tarjeta de crédito, tarjeta de crédito garantizada (para empezar historial), préstamos personales (confirmado por Nu), buró e historial, seguridad y fraudes, transferencias.
  - No: hipotecas, crédito automotriz, seguros, afores, inversión en bolsa o fondos, cuentas para menores de edad.
  - Confirmar con Nu antes de incluir: inversiones más allá del rendimiento de ahorro.
- **Formato:** bytes de conocimiento: súper condensados, simples y sencillos.
- Del brief original de Nu: fuera de la app de Nu, lúdico, corto, lenguaje accesible, cada pieza termina con una acción concreta, escalable. Medir si aprendieron, si confían más y si cambiarían lo que hacen. Medir qué tanto les gustó.
- Tono de Nu: claro (una idea por frase, menos de 15 palabras), cálido (como alguien de su lado), sin jerga. Hablarles de "tú".

## 3. Hallazgos de la investigación (Fase 1)

25 entrevistas a jóvenes de 15 a 18 años, 10 al 12 de noviembre de 2026, 6 estados (NL, Coahuila, Sonora, Puebla, Chihuahua, Jalisco). Datos anonimizados en `datos/respuestas_anonimizadas.csv`. Perfiles: 11 sin cuenta propia, 9 con cuenta de débito, 5 experimentados (débito y tarjeta de crédito).

Limitación: 21 de 25 viven en ciudad grande, 16 de 25 en escuela privada, solo 1 en comunidad rural.

Cifras clave (usar exactamente estas):

| Tema | Dato |
|---|---|
| Pago mínimo | 64% (16 de 25) no sabe que pagar solo el mínimo genera intereses; 2 de 5 que ya tienen tarjeta también lo creen |
| Fecha de corte | Solo 24% (6 de 25) la explica bien |
| Buró | 92% (23 de 25) cree que estar en buró siempre es malo o no sabe; solo 2 de 25 saben que no; 7 de 25 explican qué es |
| Rendimiento | 68% (17 de 25) no sabe que ahorrar en el banco genera dinero; 7 de 25 explican qué es |
| Ahorro | 20 de 25 ahorran, pero solo 3 de 20 apartan una cantidad fija; el resto ahorra lo que sobra |
| Gasto | Gastan más en comida (20 de 25) y salidas con amigos (18 de 25) |
| Seguridad | 48% (12 de 25) no le escribiría solo al banco si algo sale mal; 52% conoce a alguien a quien intentaron estafar (casi siempre llamada que finge ser del banco); 60% teme equivocarse al transferir |
| Bancos digitales | 48% cree que son menos seguros o no sabe |
| Primera cuenta | 7 de 11 sin cuenta creen que su edad les impide abrir una; 9 de 11 quieren una; 48% dice que abrirá su primera cuenta pronto |
| Tarjeta | 40% dice que su primera tarjeta de crédito llega pronto |
| Confianza | 96% les cree a sus papás cuando se habla de dinero; solo 2 de 17 aprendieron algo de crédito en casa |
| Formato | 80% aprende con video corto; 60% le daría 15 minutos o menos |

Causa raíz: en casa se enseña a ahorrar, no a usar crédito.

Citas textuales de los jóvenes (usarlas como gancho de cada byte):

- "Yo creía que con dar el mínimo ya quedabas al corriente y no se hacía más grande lo que debías." (17 años, con cuenta)
- "Creo que si pagas el mínimo ya estás bien." (sin cuenta)
- "El buró es como una lista negra." (16 años, sin cuenta)
- "Yo pensaba que al buró nomás entrabas cuando quedabas debiendo." (17 años, sin cuenta)
- "Solo las personas que no pagan están en el buró." (experimentado)
- "No sabía si pasar el número de la tarjeta o la CLABE." (17 años, con cuenta)
- "Como lo tengo ahí en mi cuarto, se me hace fácil sacarlo." (17 años, sin cuenta)
- "Se me antoja comida en la prepa o salgo con mis amigos y termino usando lo que guardé." (15 años, sin cuenta)
- "No hay como el efectivo." (sin cuenta)
- "Es mejor ahorrar que invertir." (experimentado)
- "Que esté cortito y que en el mismo video te digan qué ocupas para abrir una cuenta a los 17. Si se lo puedo mandar por Whats, mejor." (17 años, sin cuenta)

## 4. Temas en orden de prioridad

Orden único en todo el proyecto (viene de la priorización con los criterios de Nu: frecuencia, riesgo, momento de vida y brecha):

1. **Crédito: tarjeta y préstamo personal:** límite, fecha de corte, fecha límite de pago, pago mínimo, intereses, CAT, meses sin intereses y qué es un préstamo personal.
2. **Buró de crédito:** qué es, cómo empezar un historial, qué lo mejora y qué lo daña.
3. **Seguridad:** llamadas falsas, transferir sin miedo, reclamar un cargo, bloquear la tarjeta.
4. **Ahorro:** apartar antes de gastar, ahorro con meta, rendimiento, gastos hormiga.
5. **Tu primera cuenta a los 18:** qué necesitas, débito contra crédito, cómo elegir.

Lista de bytes propuesta en `contenido/bytes.md`.

## 5. Iniciativas interactivas (de la Fase 1)

1. **El mínimo no alcanza:** simulador que compara pagar una deuda de $3,000 solo con el mínimo contra pagar todo (meses e intereses totales). Marcarlo como ejemplo ilustrativo.
2. **Tu historial empieza antes que tu tarjeta:** juego de mito o realidad sobre el buró.
3. **Si algo sale mal:** simulación de una llamada falsa del "banco" (elegir qué hacer) y pasos para reclamar un cargo.
4. **Reto de 7 días entre amigos:** apartar antes de gastar con una meta concreta.
5. **Tu primera cuenta a los 18:** checklist de qué necesitas, para mandarlo por WhatsApp.

## 6. Medición del piloto (Semana 4)

| Capa | Indicador | Meta propuesta (validar con Nu) |
|---|---|---|
| Aprendizaje | % que acierta pago mínimo, fecha de corte y buró (quiz antes y después) | 70% o más (hoy: 36%, 24% y 8%) |
| Confianza | "Me siento capaz de usar una cuenta", de 1 a 5 | +1 punto |
| Conducta | % que crea un apartado o meta de ahorro en 7 días | 40% o más (hoy: 15%) |
| Alcance | % que termina y % que lo comparte | 60% o más termina |

Además: "¿Qué tanto te gustó?" (de 1 a 5) al final de cada tema.

## 7. Requisitos del sitio

- **Mobile first.** Lo van a abrir desde el celular y desde un link de WhatsApp.
- **Cada byte con URL propia** y botón "Mandar por WhatsApp" (`https://wa.me/?text=...`) con vista previa (Open Graph: título, descripción, imagen).
- **Estructura de cada byte:** la duda real (cita o dato) → la respuesta en 3 frases o menos → un mini ejercicio o pregunta → **una acción concreta** ("Hoy: …") → "¿Te sirvió?" y siguiente byte.
- **Lectura de 1 a 2 minutos por byte.** Si un byte necesita más, se parte en dos.
- **Progreso** guardado en el navegador (localStorage, con try/catch). Sin cuentas ni registro.
- **Privacidad:** el público incluye menores de 17. No pedir nombre, correo, teléfono ni datos personales. Si se mide, que sea anónimo. Para el quiz antes y después del piloto se puede usar un Google Forms enlazado, sin datos personales.
- **Contenido separado del código** (Markdown o JSON) para que el equipo edite textos sin tocar componentes.
- **Accesible:** contraste AA, textos de 16 px o más, botones grandes, funciona sin JavaScript para el contenido básico.
- **Hosting:** GitHub Pages, desplegado con GitHub Actions desde `main`.
- Stack sugerido: Astro (contenido en Markdown, sitio estático) o HTML/CSS/JS sin framework. Elegir lo más simple de mantener para un equipo de estudiantes.
- **Aviso al pie:** "Contenido educativo. No es asesoría financiera." y las fuentes (CONDUSEF, Banxico) de cada dato técnico.

## 8. Identidad visual

- Morado Nu `#820AD1` como acento, fondos blancos, texto casi negro `#1F1A24`, gris `#5F5966`, lila claro `#EFE3FA`.
- Tipografía sans serif simple (por ejemplo Inter o la del sistema).
- Íconos de línea de un solo estilo (Lucide): tarjeta = `credit-card`, buró = `file-clock`, seguridad = `shield-check`, ahorro = `piggy-bank`, primera cuenta = `key-round`. PNG de referencia en `assets/`.
- Logo de Nu en `assets/nu_purple.png` y `assets/nu_white.png`. **Nu confirmó que podemos usar su logo y su marca** en el sitio piloto. Usarlos como identidad del curso ("Nu × Tec"), sin convertir el sitio en publicidad de productos Nu.
- Que no se vea genérico ni hecho con IA: nada de gradientes llamativos, emojis de relleno ni tarjetas idénticas en todo el sitio. Las citas de los jóvenes son lo más humano: darles protagonismo.

## 9. Exactitud del contenido

- Todo dato técnico (cómo se calcula el pago mínimo, qué es el CAT, cuánto protege el IPAB, cómo reclamar un cargo) se verifica en fuentes oficiales (Banxico, CONDUSEF, IPAB) antes de publicarlo, y se cita.
- Las tasas y costos cambian. No poner tasas de productos específicos; usar ejemplos ilustrativos marcados como tales.
- No inventar cifras ni citas. Las cifras de los jóvenes son las de la sección 3.

## 10. Archivos de referencia

- `referencia/Reto_Nu_x_Tec.pdf`: presentación original del reto de Nu.
- `referencia/Nu_Tec_Fase1_Mapa_de_hallazgos_v2.pptx`: nuestra presentación de la Fase 1.
- `datos/respuestas_anonimizadas.csv`: 25 entrevistas, sin nombres (ID E01 a E25).
- `contenido/bytes.md`: lista propuesta de bytes.
