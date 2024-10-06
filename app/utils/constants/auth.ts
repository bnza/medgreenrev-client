export enum ApiRole {
  Admin = 'ROLE_ADMIN',
  Editor = 'ROLE_EDITOR',
  User = 'ROLE_USER',
}
export enum ApiSpecialistRole {
  Microstratigraphist = 'ROLE_MICROSTRATIGRAPHIST',
}
export const ROLE_HIERARCHY_VALUES: Readonly<Record<ApiRole, number>> =
  Object.freeze({
    [ApiRole.Admin]: 1000,
    [ApiRole.Editor]: 100,
    [ApiRole.User]: 10,
  })
export const ROLE_COLORS = Object.freeze({
  [ApiRole.Admin]: COLORS.error,
  [ApiRole.Editor]: COLORS.warning,
  [ApiRole.User]: COLORS.success,
})
