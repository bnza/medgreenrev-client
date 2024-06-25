import { md3 } from 'vuetify/blueprints'
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

const colors = {
  primary: '#2c549d',
  secondary: '#80bc37',
  anchor: '#FFF',
  accent: '#505',
  error: '#e2626b',
  info: '#9ed5f6',
  success: '#7cb798',
  warning: '#fab758',
  background: '#111',
  surface: '#222',
  'surface-bright': '#282828',
  'surface-light': '#333',
  'surface-variant': '#444',
  'on-surface-variant': '#EEE',
  'primary-darken-1': '#12223f',
  'secondary-darken-1': '#334b16',
}

const darkTheme = {
  dark: true,
  colors,
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
