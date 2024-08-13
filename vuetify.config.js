import { md3 } from 'vuetify/blueprints'
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'
import { COLORS } from './lib/constants/enums.ts'

const darkTheme = {
  dark: true,
  colors: COLORS,
  variables: {
    'border-color': '#FFF',
    'border-opacity': 0.12,
  },
}

export default defineVuetifyConfiguration({
  blueprint: md3,
  localeMessages: ['en'],
  icons: {
    defaultSet: 'fa',
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: { colors: {} },
      dark: darkTheme,
    },
  },
  defaults: {
    VCard: {
      flat: true,
    },
  },
})
