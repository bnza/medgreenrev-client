export {}

declare global {
  type Role = 'ROLE_USER'|'ROLE_EDITOR'|'ROLE_ADMIN'
  type UiMode = 'default'|'map'
}
interface ApiSessionData {
  email: string,
  roles: Array<Role>,
  privileges: Record<number, number>
}

declare module '#auth' {
  interface SessionData extends ApiSessionData {}
}