import { readFile, writeFile, adjustValue, minifyString } from "../lib/utils"



/**
 * Builds a CSS block for a given colour and settings.
 *
 * @param {Colour} colour - The colour object representing the colour to be styled.
 * @param {Settings} settings - The settings object containing the configuration for the CSS block.
 * @return {string} The CSS block representing the styling for the given colour.
 */
function buildColourBlock (colour: Colour, settings: Settings): string {

  const id = colour.name.toLowerCase()

  let block = `
    --${id}: lch(
      ${colour.lch.lightness}%
      ${colour.lch.chroma}
      ${colour.lch.hue}
    );
  `

  if (colour.role === 'accent') {
    const variants = settings.variants
    const offsets = settings.offsets

    for (const variant of variants) {
      const variantId = `${id}-${variant}`
      const operation = settings.operations[variant]

      block += `
        --${variantId}: lch(
          ${adjustValue(colour.lch.lightness, offsets.lightness, operation)}%
          ${adjustValue(colour.lch.chroma, offsets.chroma, operation)}
          ${adjustValue(colour.lch.hue, offsets.hue, operation)}
        );
      `
    }
  }

  return block
}



/**
 * Builds a CSS file based on the provided colours and settings.
 *
 * @param {Colour[]} palette - An array of Colour objects representing the colours to be included in the CSS file.
 * @param {Settings} settings - The settings object containing the configuration for the CSS file.
 * @return {Promise<void>} A promise that resolves when the CSS file has been successfully built and written to disk.
 */
export async function buildCSSFile (palette: Colour[], settings: Settings): Promise<void> {

  const css = palette.reduce(
    (css, colour) => css + buildColourBlock(colour, settings),
    ''
  )

  return readFile('./src/templates/css.tpl')
    .then(template => template.replace('%CSS%', css))
    .then(template => minifyString(template))
    .then(template => writeFile('dist/palette.css', template))

}
