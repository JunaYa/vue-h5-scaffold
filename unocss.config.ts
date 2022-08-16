import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ['fra', 'flex flex-row items-center justify-around'],
    ['frb', 'flex flex-row items-center justify-between'],
    ['frc', 'flex flex-row items-center justify-center'],
    ['fca', 'flex flex-col items-center justify-around'],
    ['fcb', 'flex flex-col items-center justify-between'],
    ['fcc', 'flex flex-col items-center justify-center'],
    ['bgimg', 'w-100% h-100% bg-contain bg-no-repeat bg-center '],
    ['bgimg-top', 'w-100% h-100% bg-contain bg-no-repeat bg-top'],
    ['bgimg-bottom', 'w-100% h-100% bg-contain bg-no-repeat bg-bottom'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
