import { readJSON } from "./lib/utils"

import { buildCSSFile } from "./workflows/build_css"
import { buildReadmeFile } from "./workflows/build_readme"
import { buildSVGPreviews } from "./workflows/build_svg"



const data = await readJSON('./src/palette.json')

const settings:Settings = data.settings
const palette:Colour[]  = Object.keys(data.colours)
  .map((key) => ({
    name: data.colours[key].name as string,
    role: data.colours[key].role as Role,
    hex:  data.colours[key].hex  as HEX,
    lch:  data.colours[key].lch  as LCH,
    cmyk: data.colours[key].cmyk as CMYK
  }))



buildCSSFile(palette, settings)

if (!Bun.argv.includes('--only-css')) {
  buildSVGPreviews(palette)
  buildReadmeFile(palette, settings)
}