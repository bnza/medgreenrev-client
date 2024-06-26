export const ROLES = Object.freeze({
  Admin: 'ROLE_ADMIN',
  Editor: 'ROLE_EDITOR',
  User: 'ROLE_USER',
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
