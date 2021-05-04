export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  // generate: {
  //   dir: '../production/fe'
  // },
  ssr: false,
  head: {
    titleTemplate: '%s',
    title: 'Pangasinan Medical Society',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [],
  plugins: [
    '@mixins',
    '@components/reusable',
    '@plugins/debounce',
    '@/plugins/vuex-persist'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  axios: {
    baseURL: process.env.NODE_ENV !== 'production' ? process.env.VUE_APP_API_DEV : process.env.VUE_APP_API_PROD
  },
  vuetify: {
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#2c3e50',
          secondary: '#1abc9c',
          accent: '#2980b9',
          error: '#e74c3c',
          action: '#23DB2A'
        }
      }
    }
  },
  build: {
  }
}
