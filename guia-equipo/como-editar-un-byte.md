# Cómo editar o agregar un byte

No necesitas saber programar. Cada byte es un archivo de texto en `src/content/docs/<tema>/`.

## Editar un byte

1. Abre el archivo, por ejemplo `src/content/docs/credito/limite.mdx`.
2. Cambia el texto. La parte de arriba, entre `---`, son los datos del byte:

| Campo | Qué es |
|---|---|
| `title` | La duda, como título |
| `description` | Una frase para la vista previa de WhatsApp |
| `numero` | Como en `contenido/bytes.md` (por ejemplo `"1.3"`) |
| `minutos` | 1 o 2 |
| `duda` | La cita o el dato con el que abre. `clase: cita` o `clase: dato` |
| `accion` | Lo que la persona hace hoy. Se muestra como "Hoy: …" |
| `fuentes` | Banxico, CONDUSEF o DOF. Una o más |

3. Abajo va la respuesta: **3 frases o menos**, una idea por frase, de "tú".
4. El mini ejercicio:

```mdx
<Ejercicio pregunta="¿…?" opciones={['Opción A', 'Opción B']} correcta={1}>
  Explicación corta. `correcta` empieza a contar en 0.
</Ejercicio>
```

## Revisar antes de subir

```bash
npm run revisar
```

Te dice si a un byte le falta un campo, si no tiene fuente oficial o si pasa de 2 minutos.

## Ver el sitio en tu compu

```bash
npm install
npm run dev
```

Abre http://localhost:4321/curso-nu-tec/

## Publicar

Sube tus cambios a `main`. GitHub Actions revisa los bytes, construye el sitio y lo publica en unos 2 minutos.

## Activar un tema nuevo

1. Crea la carpeta, por ejemplo `src/content/docs/buro/`, con `index.mdx` y sus bytes.
2. En `src/lib/temas.ts`, cambia `activo: false` a `activo: true`.
3. En `astro.config.mjs`, copia el bloque del menú de Crédito y cambia los nombres.

## Reglas que no se negocian (CLAUDE.md)

- Neutral: nada de "abre tu cuenta Nu", comparativos ni ventas.
- Solo productos que Nu ofrece. Nada de hipotecas, autos, seguros, afores ni bolsa.
- Cifras y citas exactamente como en `CLAUDE.md`.
- Nada de tasas de productos específicos. Ejemplos ilustrativos, marcados como tales.
- No pedir datos personales.
