export const ROLES: Readonly<Record<string, ApiRole>> = {
  Admin: 'ROLE_ADMIN',
  Editor: 'ROLE_EDITOR',
  User: 'ROLE_USER',
}
export const rolesBitmasksMap: Readonly<Record<SitesRoles, number>> = {
  ROLE_SITE_EDITOR: 0b1,
  ROLE_SITE_USER: 0b0,
}

export const COLORS: Readonly<Record<string, `#${string}`>> = {
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

export const ROLE_HIERARCHY_VALUES: Readonly<Record<ApiRole, number>> =
  Object.freeze({
    ROLE_ADMIN: 1000,
    ROLE_EDITOR: 100,
    ROLE_USER: 10,
  })

export const SITES_ROLE_COLORS: Readonly<Record<SitesRoles, string>> = {
  ROLE_SITE_USER: COLORS.success,
  ROLE_SITE_EDITOR: COLORS.warning,
}

export const ROLE_COLORS = Object.freeze({
  [ROLES.Admin]: COLORS.error,
  [ROLES.Editor]: COLORS.warning,
  [ROLES.User]: COLORS.success,
})

export const API_VALIDATOR_TYPE = Object.freeze({
  Unique: 'unique',
})

export const ACL_VOTERS = Object.freeze({
  IsAuthenticated: 'IsAuthenticated',
  HasRole: 'HasRole',
  HasRoleAdmin: 'HasRoleAdmin',
})

export const DATA_API_ACTIONS_BAR_COLOR: Readonly<
  Record<ApiAction, `#${string}`>
> = {
  read: COLORS['surface-light'],
  create: '#284151',
  update: '#29332e',
  delete: '#3e2325',
}
