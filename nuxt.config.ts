import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss', // 'nuxt-gtag',
    ['@storyblok/nuxt', { accessToken: process.env.NUXT_STORYBLOK_TOKEN }],
    '@nuxtjs/device',
  ],
  ssr: process.env.NUXT_STORYBLOK_VERSION === 'published',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en-GB',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'author', content: 'Haven Havelland' },
        { name: 'revisit-after', content: '1 day' },
        { name: 'msapplication-TileColor', content: '#E6E3E1' },
        { name: 'theme-color', content: '#E6E3E1' },
        { name: 'google', content: 'notranslate' },
        { 'http-equiv': 'content-language', 'content': 'en-GB' },
      ],
      link: [
        // https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs#the-ultimate-favicon-setup
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://a.storyblok.com' },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'preload',
          type: 'font/woff2',
          href: '/fonts/Moderat-Book.woff2',
          as: 'font',
          crossorigin: '',
        },
        {
          rel: 'preload',
          type: 'font/woff2',
          href: '/fonts/Moderat-Mono-Book.woff2',
          as: 'font',
          crossorigin: '',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: false,
  },
  site: {
    url: 'https://www.havenhavelland.com',
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
  build: {
    transpile: ['gsap'],
  },
  compatibilityDate: '2024-04-03',
  vite: {
    resolve: {
      dedupe: ['vue'],
    },
    plugins: [
      svgLoader({
        svgo: false,
      }),
    ],
    vue: {
      script: {
        defineModel: true,
        // propsDestructure: true,
      },
    },
  },
  typescript: {
    strict: true,
  },
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      'tailwindcss': {},
      'autoprefixer': {},
    },
  },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  // gtag: {
  //   enabled: process.env.NODE_ENV === 'production',
  //   id: 'G-4LBQFXWPY6',
  // },
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
  sitemap: {
    sources: ['/api/sitemap'],
  },
  tailwindcss: {
    cssPath: '@/assets/css/app.css',
  },
})
