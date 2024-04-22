type Role = 'accent' | 'base'

type HEX = string

type LCH = {
  lightness: number
  chroma: number
  hue: number
}

type CMYK = {
  cyan: number
  magenta: number
  yellow: number
  key: number
}

type Settings = {
  variants: string[]
  operations: {
    [key: string]: 'add' | 'subtract'
  }
  offsets: LCH
}

type Colour = {
  name: string
  role: Role
  hex: HEX
  lch: LCH
  cmyk: CMYK
}
