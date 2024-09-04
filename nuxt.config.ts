import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },

  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@storyblok/nuxt',
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
