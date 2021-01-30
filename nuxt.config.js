export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'toko-buku-frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: {
    base: process.env.base,
    title: process.env.title,
    desc: process.env.desc,
    logo: process.env.logo
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/tailwind.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/models/book',
    '~/models/category',
    '~/models/auth',
    '~/models/region'


  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://tokobukuapp.herokuapp.com/api/',
    credentials: true
  },
  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: '/auth/login',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'data.token',
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'success',
        },
        endpoints: {
          login: { url: '/v1/login', method: 'post' },
          logout: { url: '/v1/logout', method: 'post' },
          user: { url: '/v1/user', method: 'get' },

        }
      }
    }
  },
  // auth: {
  //   strategies: {
  //     local: {
  //       token: {
  //         property: 'token',
  //         required: true,
  //         type: 'Bearer'
  //       },
  //       user: {
  //         property: 'user',
  //         // autoFetch: true
  //       },
  //       endpoints: {
  //         login: { url: '/api/v1/auth/login', method: 'post' },
  //         logout: { url: '/api/v1/auth/logout', method: 'post' },
  //         user: { url: '/api/v1/auth/user', method: 'get' }
  //       }
  //     },
  //     laravelPassportPasswordGrant: {
  //       name: 'laravelPassportPassword',
  //       provider: 'laravelPassport',
  //       url: 'localhost:8000/',
  //       endpoints: {
  //         user: {
  //           url: '/api/v1/user'
  //         }
  //       },
  //       token: {
  //         maxAge: 1800
  //       },
  //       refreshToken: {
  //         maxAge: 60 * 60 * 24 * 30
  //       },
  //       clientId: process.env.PASSPORT_CLIENT_ID,
  //       clientSecret: process.env.PASSPORT_CLIENT_SECRET,
  //       grantType: 'password'
  //     },
  //     laravelPassport: {
  //       provider: 'laravel/passport',
  //       url: 'http://localhost:8000',
  //       endpoints: {
  //         userInfo: '/api/v1/user'
  //       },
  //       clientId: process.env.PASSPORT_CLIENT_ID,
  //       clientSecret: process.env.PASSPORT_CLIENT_SECRET
  //     }
  //   },
  // },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
