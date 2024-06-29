export const ROLES = Object.freeze({
  Admin: 'ROLE_ADMIN',
  Editor: 'ROLE_EDITOR',
  User: 'ROLE_USER',
})

export const COLORS = Object.freeze({
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
})

export const ROLE_HIERARCHY_VALUES = Object.freeze({
  [ROLES.Admin]: 1000,
  [ROLES.Editor]: 100,
  [ROLES.User]: 10
})

export const ROLE_COLORS = Object.freeze({
  [ROLES.Admin]: COLORS.error,
  [ROLES.Editor]: COLORS.warning,
  [ROLES.User]: COLORS.success
})


export const DATA_UI_MODE = Object.freeze({
  Default: 'default',
  Map: 'map',
})

export const API_ACTIONS = Object.freeze({
  Create: 'create',
  Read: 'read',
  Update: 'update',
  Delete: 'delete',
})

export const API_VALIDATOR_TYPE = Object.freeze({
  Unique: 'unique',
})

export const ACL_VOTERS = Object.freeze({
  IsAuthenticated: 'IsAuthenticated',
  HasRole: 'HasRole',
  HasRoleAdmin: 'HasRoleAdmin',
})

export const DATA_API_ACTIONS_BAR_COLOR = Object.freeze({
  [API_ACTIONS.Create]: '#284151',
  [API_ACTIONS.Update]: '#29332e',
  [API_ACTIONS.Delete]: '#3e2325',
})
