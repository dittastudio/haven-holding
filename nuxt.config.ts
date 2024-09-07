import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  build: {
    transpile: ['gsap'],
  },

  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },

  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },

  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://a.storyblok.com',
    },
    domains: ['storyblok.com', '...'],
    quality: 80,
    screens: {
      'xs': 375,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1200,
      '2xl': 1440,
      '3xl': 1920,
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@storyblok/nuxt',
    '@nuxt/image',
    '@nuxt/eslint',
  ],

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      'tailwindcss': {},
      'autoprefixer': {},
    },
  },

  runtimeConfig: {
    private: {},
    public: {
      STORYBLOK_TOKEN: process.env.NUXT_STORYBLOK_TOKEN,
      STORYBLOK_VERSION: process.env.NUXT_STORYBLOK_VERSION,
    },
  },

  storyblok: {
    accessToken: process.env.NUXT_STORYBLOK_TOKEN,
  },

  tailwindcss: {
    cssPath: '@/assets/css/app.css',
  },

  typescript: {
    strict: true,
  },

  vite: {
    resolve: {
      dedupe: [
        'vue',
      ],
    },
    plugins: [
      svgLoader({
        svgo: false,
      }),
    ],
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },
})
