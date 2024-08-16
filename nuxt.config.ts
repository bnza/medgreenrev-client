const googleFonts = {
  families: {
    Montserrat: true,
  },
}
export default defineNuxtConfig({
  app: {
    baseURL: '/app',
  },

  auth: {
    provider: {
      type: 'local',
      endpoints: {
        // From @sidebase/nuxt-auth 0.8 Endpoints requires NOT to have the trailing slash
        // in ordet to use baseURL
        // @see joinPathToApiURL function
        signIn: { path: 'login', method: 'post' },
        signOut: { path: 'logout', method: 'post' },
        getSession: { path: 'users/me', method: 'get' },
      },
      pages: {
        login: '/login',
      },
      session: {
        dataType: {
          id: 'string',
          email: 'string',
          roles: 'string[]',
          privileges: 'number[]',
        },
      },
    },
    sessionRefresh: {
      // Whether to refresh the session every time the browser window is refocused.
      enableOnWindowFocus: true,

      // Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
      enablePeriodically: false,
    },
    // disableServerSideAuth: true,
    globalAppMiddleware: true,
    baseURL: process.env.API_BASE_URL || 'http://localhost:8000/api',
  },

  css: ['~/assets/styles/index.css'],
  devtools: { enabled: true },

  imports: {
    dirs: ['./lib', './lib/constants'],
  },

  modules: [
    '@nuxt/eslint',
    'vuetify-nuxt-module',
    ['@nuxtjs/google-fonts', googleFonts],
    '@sidebase/nuxt-auth',
  ],

  router: {
    options: {
      hashMode: true,
    },
  },

  runtimeConfig: {
    public: {
      apiBaseURL: 'http://localhost:8000/api',
    },
  },

  ssr: false,
  typescript: { strict: false },
  compatibilityDate: '2024-07-08',
})
