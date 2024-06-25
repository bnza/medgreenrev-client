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
        getSession: { path: '/users/me', method: 'get' },
      },
      pages: {
        login: '/login',
      },
    },
    session: {
      // Whether to refresh the session every time the browser window is refocused.
      enableRefreshOnWindowFocus: true,

      // Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
      enableRefreshPeriodically: false,
    },
    globalAppMiddleware: true,
    baseURL: process.env.API_BASE_URL || 'http://localhost:8000/api',
  },
  css: ['~/assets/styles/index.css'],
  devtools: { enabled: true },
  imports: {
    dirs: ['./constants'],
  },
  modules: [
    '@nuxt/eslint',
    'vuetify-nuxt-module',
    ['@nuxtjs/google-fonts', googleFonts],
    '@sidebase/nuxt-auth',
  ],
  ssr: false,
  typescript: { strict: false },
})
