const colStartMap: Record<string, string> = {
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
  7: 'col-start-7',
  8: 'col-start-8',
  9: 'col-start-9',
  10: 'col-start-10',
  11: 'col-start-11',
  12: 'col-start-12',
} as const

const colEndMap: Record<string, string> = {
  2: 'col-end-2',
  3: 'col-end-3',
  4: 'col-end-4',
  5: 'col-end-5',
  6: 'col-end-6',
  7: 'col-end-7',
  8: 'col-end-8',
  9: 'col-end-9',
  10: 'col-end-10',
  11: 'col-end-11',
  12: 'col-end-12',
  13: 'col-end-13',
} as const

const ratioMap: Record<string, string> = {
  'auto': '',
  '16/9': 'aspect-16/9',
  '9/16': 'aspect-9/16',
  '3/2': 'aspect-3/2',
  '2/3': 'aspect-2/3',
  '4/3': 'aspect-4/3',
  '3/4': 'aspect-3/4',
  '1/1': 'aspect-1/1',
} as const

const colourText: Record<string, string> = {
  current: 'text-current',
  white: 'text-white',
  black: 'text-black',
  offwhite: 'text-offwhite',
  offblack: 'text-offblack',
  lavender: 'text-lavender',
  poppy: 'text-poppy',
  sage: 'text-sage',
  river: 'text-river',
  sky: 'text-sky',
  wheat: 'text-wheat',
} as const

const colourBackground: Record<string, string> = {
  current: 'bg-current',
  white: 'bg-white',
  black: 'bg-black',
  offwhite: 'bg-offwhite',
  offblack: 'bg-offblack',
  lavender: 'bg-lavender',
  poppy: 'bg-poppy',
  sage: 'bg-sage',
  river: 'bg-river',
  sky: 'bg-sky',
  wheat: 'bg-wheat',
} as const

export { colEndMap, colourBackground, colourText, colStartMap, ratioMap }
