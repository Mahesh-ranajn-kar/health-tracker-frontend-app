export const DEFAULT_BRAND_COLOR = '#4f46e5'

export function normalizeHex(hex) {
  if (!hex || typeof hex !== 'string') return DEFAULT_BRAND_COLOR
  let clean = hex.trim()
  if (!clean.startsWith('#')) clean = `#${clean}`
  if (/^#[0-9A-Fa-f]{3}$/.test(clean)) {
    clean = '#' + clean.slice(1).split('').map(c => c + c).join('')
  }
  return /^#[0-9A-Fa-f]{6}$/.test(clean) ? clean.toLowerCase() : DEFAULT_BRAND_COLOR
}

export function hexToRgb(hex) {
  const valid = normalizeHex(hex).replace('#', '')
  const num = parseInt(valid, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  }
}

function mixRgb(c1, c2, weight) {
  return {
    r: Math.round(c1.r * (1 - weight) + c2.r * weight),
    g: Math.round(c1.g * (1 - weight) + c2.g * weight),
    b: Math.round(c1.b * (1 - weight) + c2.b * weight)
  }
}

function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
}

export function generateBrandPalette(hexColor) {
  const base = hexToRgb(hexColor)
  const white = { r: 255, g: 255, b: 255 }
  const darkBase = { r: 15, g: 23, b: 42 } // Slate-900 for deep dark-mode surfaces

  const shades = {
    50: mixRgb(base, white, 0.92),
    100: mixRgb(base, white, 0.84),
    200: mixRgb(base, white, 0.68),
    300: mixRgb(base, white, 0.48),
    400: mixRgb(base, white, 0.24),
    500: mixRgb(base, white, 0.10),
    600: base,
    700: mixRgb(base, darkBase, 0.16),
    800: mixRgb(base, darkBase, 0.34),
    900: mixRgb(base, darkBase, 0.54),
    950: mixRgb(base, darkBase, 0.72)
  }

  const rgbChannels = {}
  const hexMap = {}
  for (const [shade, rgb] of Object.entries(shades)) {
    rgbChannels[shade] = `${rgb.r} ${rgb.g} ${rgb.b}`
    hexMap[shade] = rgbToHex(rgb)
  }

  return { base, rgbChannels, hexMap }
}

export function applyBrandTheme(hexColor, isDark = false) {
  if (typeof document === 'undefined') return
  const { base, rgbChannels, hexMap } = generateBrandPalette(hexColor)
  const root = document.documentElement

  Object.entries(rgbChannels).forEach(([shade, value]) => {
    root.style.setProperty(`--color-brand-${shade}`, value)
  })

  // Primary & secondary accent variables adapted for Light vs Dark mode
  const activePrimary = isDark ? hexMap[400] : hexMap[600]
  const activeHover = isDark ? hexMap[300] : hexMap[700]
  const activeSoftBg = isDark ? `rgba(${base.r}, ${base.g}, ${base.b}, 0.20)` : hexMap[50]
  const activeSoftBorder = isDark ? `rgba(${base.r}, ${base.g}, ${base.b}, 0.38)` : hexMap[200]

  root.style.setProperty('--pt-primary', activePrimary)
  root.style.setProperty('--pt-primary-hover', activeHover)
  root.style.setProperty('--pt-primary-base', hexMap[600])
  root.style.setProperty('--pt-primary-rgb', `${base.r} ${base.g} ${base.b}`)
  root.style.setProperty('--pt-primary-soft', activeSoftBg)
  root.style.setProperty('--pt-primary-soft-border', activeSoftBorder)
  root.style.setProperty('--pt-gradient', `linear-gradient(135deg, ${hexMap[600]}, ${hexMap[400]})`)

  // Subtle ambient tint on page/border in dark & light modes so the chosen color harmonizes
  if (isDark) {
    const tintedPage = rgbToHex(mixRgb({ r: 15, g: 23, b: 42 }, base, 0.06))
    const tintedSurface = rgbToHex(mixRgb({ r: 17, g: 24, b: 39 }, base, 0.08))
    const tintedBorder = rgbToHex(mixRgb({ r: 39, g: 52, b: 73 }, base, 0.14))
    root.style.setProperty('--pt-page', tintedPage)
    root.style.setProperty('--pt-surface', tintedSurface)
    root.style.setProperty('--pt-border', tintedBorder)
  } else {
    root.style.setProperty('--pt-page', '#f8fafc')
    root.style.setProperty('--pt-surface', '#ffffff')
    root.style.setProperty('--pt-border', '#e2e8f0')
  }
}
