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
    domains: ['storyblok.com', 'havenhavelland.com'],
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
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@storyblok/nuxt',
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
    MAILCHIMP_API_KEY: process.env.NUXT_MAILCHIMP_API_KEY,
    MAILCHIMP_LIST_ID: process.env.NUXT_MAILCHIMP_LIST_ID,
    MAILCHIMP_SERVER: process.env.NUXT_MAILCHIMP_SERVER,
    public: {
      STORYBLOK_TOKEN: process.env.NUXT_STORYBLOK_TOKEN,
      STORYBLOK_VERSION: process.env.NUXT_STORYBLOK_VERSION,
    },
  },

  site: {
    url: 'https://www.havenhavelland.com',
  },

  ssr: true,

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
