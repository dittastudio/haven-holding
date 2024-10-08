import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const pixelsToRemsUnit = (pixels: number): number => pixels / 16

interface ClampOptions {
  minPixels: number
  minViewportWidthPixels: number
  maxPixels: number
  maxViewportWidthPixels: number
}

const clamp = ({
  minPixels,
  minViewportWidthPixels,
  maxPixels,
  maxViewportWidthPixels,
}: ClampOptions) => {
  const minValueRems = pixelsToRemsUnit(minPixels)
  const maxValueRems = pixelsToRemsUnit(maxPixels)
  const minViewportWidthRems = pixelsToRemsUnit(minViewportWidthPixels)
  const maxViewportWidthRems = pixelsToRemsUnit(maxViewportWidthPixels)
  const slope = (maxValueRems - minValueRems) / (maxViewportWidthRems - minViewportWidthRems)
  const intercept = minValueRems - slope * minViewportWidthRems

  return `clamp(${minValueRems}rem, ${intercept}rem + ${slope * 100}vi, ${maxValueRems}rem)`
}

export const headerHeight = {
  mobile: 80,
  desktop: 120,
}

export const screenSizes = {
  'zero': 0,
  'xs': 400,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1200,
  '2xl': 1440,
  '3xl': 1920,
}

export const screens = {
  'xs': `${screenSizes.xs}px`,
  'xsMax': { max: `${screenSizes.xs - 1}px` },
  'sm': `${screenSizes.sm}px`,
  'smMax': { max: `${screenSizes.sm - 1}px` },
  'md': `${screenSizes.md}px`,
  'mdMax': { max: `${screenSizes.md - 1}px` },
  'lg': `${screenSizes.lg}px`,
  'lgMax': { max: `${screenSizes.lg - 1}px` },
  'xl': `${screenSizes.xl}px`,
  'xlMax': { max: `${screenSizes.xl - 1}px` },
  '2xl': `${screenSizes['2xl']}px`,
  '2xlMax': { max: `${screenSizes['2xl'] - 1}px` },
  '3xl': `${screenSizes['3xl']}px`,
  '3xlMax': { max: `${screenSizes['3xl'] - 1}px` },
}

export const colours = {
  current: 'currentColor',
  white: '#ffffff',
  black: '#000000',
  offwhite: '#E6E3E1',
  offblack: '#1c1c1c',
  lavender: '#9F9BCC',
  poppy: '#FC3232',
  sage: '#7A8C52',
  river: '#7BA6A1',
  sky: '#97C8E8',
  wheat: '#CEA683',
}

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './utilities/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    aspectRatio: {
      '1/1': '1 / 1',
      '16/9': '16 / 9',
      '3/2': '3 / 2',
      '2/3': '2 / 3',
      '3/4': '3 / 4',
      '4/3': '4 / 3',
    },
    colors: {
      ...colours,
    },
    fontFamily: {
      sans: ['Moderat', 'system-ui', 'sans-serif'],
      mono: ['Moderat Mono', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      '12': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0em' }],
      '14': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0em' }],
      '15': ['0.9375rem', { lineHeight: '1.2', letterSpacing: '0em' }],
      '16': ['1rem', { lineHeight: '1.4', letterSpacing: '0em' }],
      '18': ['1.125rem', { lineHeight: '1.3', letterSpacing: '0em' }],
      '20': ['1.25rem', { lineHeight: '1.3', letterSpacing: '0em' }],
      '24': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0em' }],
      '34': ['2.125rem', { lineHeight: '1.3', letterSpacing: '0em' }],
      '40': ['2.5rem', { lineHeight: '1.2', letterSpacing: '0em' }],
      '50': ['3.125rem', { lineHeight: '1.2', letterSpacing: '0em' }],
      '65': ['4.0625rem', { lineHeight: '1.2', letterSpacing: '0em' }],
      'fluid-lead-xs-xl': [
        clamp({
          minPixels: 20,
          minViewportWidthPixels: screenSizes.xs,
          maxPixels: 35, // 35 at 1440px
          maxViewportWidthPixels: screenSizes.xl,
        }),
        { lineHeight: '1.3', letterSpacing: '0em' },
      ],
      'fluid-lead-xl-3xl': [
        clamp({
          minPixels: 35,
          minViewportWidthPixels: screenSizes.xl,
          maxPixels: 50, // 35 at 1440px
          maxViewportWidthPixels: screenSizes['3xl'],
        }),
        { lineHeight: '1.3', letterSpacing: '0em' },
      ],
      'fluid-h1-sm-3xl': [
        clamp({
          minPixels: 40,
          minViewportWidthPixels: screenSizes.xs,
          maxPixels: 65, // 35 at 1440px
          maxViewportWidthPixels: screenSizes['3xl'],
        }),
        { lineHeight: '1.3', letterSpacing: '0em' },
      ],
    },
    lineHeight: {
      none: '1',
      snug: '1.1',
      normal: '1.5',
    },
    letterSpacing: {
      tighter: '-0.02em',
      tight: '-0.01em',
      normal: '0',
    },
    screens,
    spacing: {
      '0': '0',
      '1': '1px',
      '2': '2px',
      '4': '4px',
      '8': '8px',
      '12': '12px',
      '16': '16px',
      '20': '20px',
      '24': '24px',
      '32': '32px',
      '40': '40px',
      '48': '48px',
      '56': '56px',
      '64': '64px',
      '72': '72px',
      '80': '80px',
      '88': '88px',
      '96': '96px',
      '120': '120px',
      '160': '160px',
      '200': '200px',
      '240': '240px',
      'fluid-outer-gutter': clamp({
        minPixels: 24,
        minViewportWidthPixels: screenSizes.xs,
        maxPixels: 40,
        maxViewportWidthPixels: screenSizes['2xl'],
      }),
      'fluid-vertical-rhythm': clamp({
        minPixels: 80,
        minViewportWidthPixels: screenSizes.xs,
        maxPixels: 160,
        maxViewportWidthPixels: screenSizes['2xl'],
      }),
    },
    transitionTimingFunction: {
      smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0.0, 1, 1)',
      out: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      natural: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      inCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      outCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      inOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      inCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
      outCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      inOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
      inExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      outExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
      inOutExpo: 'cubic-bezier(1, 0, 0, 1)',
      inQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
      outQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      inOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      inQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
      outQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      inOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
      inQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
      outQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
      inOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
      inSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
      outSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
      inOutSine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
      inBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
      outBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      inOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    extend: {
      borderRadius: {
        sm: '6px',
      },
      transitionDuration: {
        175: '175ms',
        250: '250ms',
        350: '350ms',
        400: '400ms',
        450: '450ms',
        600: '600ms',
        800: '800ms',
        900: '900ms',
        1500: '1500ms',
        2000: '2000ms',
        3000: '3000ms',
      },
      transitionDelay: {
        175: '175ms',
        250: '250ms',
        350: '350ms',
        400: '400ms',
        450: '450ms',
        600: '600ms',
        800: '800ms',
        900: '900ms',
        1500: '1500ms',
        2000: '2000ms',
        3000: '3000ms',
      },
      zIndex: {
        '-1': '-1',
        '1': '1',
        '2': '2',
      },
    },
  },
  plugins: [
    typography,
  ],
} satisfies Config
