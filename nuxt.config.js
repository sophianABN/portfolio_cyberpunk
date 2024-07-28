export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'myPortfolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  serverMiddleware: [
    { path: '/api', handler: '~/server/server.js' }
],

  env: {
    BEAR_API: process.env.BEAR_API

  },

  server: {
    host: '::', // L'adresse IP sur laquelle écouter (dans ce cas, :: signifie toutes les adresses IPv6 disponibles)
    port: 3000, // Le port sur lequel écouter
  },

  proxy: {
    '/apibear/': { target: process.env.BEAR_API, pathRewrite:{'^/apibear/':'/bear/'} }
  
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "cyberpunk-css-main/cyberpunk.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss'

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next'
  ],

  router: {
    middleware: ['auth']
  },
  

  auth: {
    strategies: {
      authentik: {
        scheme: 'oauth2',
        clientId: process.env.CLIENT_ID,
        codeChallengeMethod: 'S256',
        responseType: 'code',
        endpoints: {
          token: 'https://auth.org.goinfra.info/application/o/token/',
          userInfo: 'https://auth.org.goinfra.info/application/o/userinfo/',
          authorization: 'https://auth.org.goinfra.info/application/o/authorize/',
          logout: 'https://auth.org.goinfra.info/application/o/lakhtistefr/end-session/'
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        scope: ['openid', 'profile', 'email'],
        grantType: 'authorization_code'
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/logincb',
      home: '/admin'
    }
  },


  build: {
    transpile: [({ isLegacy }) => isLegacy && 'axios', 'defu']
  },
}
