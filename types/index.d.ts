import type Api from '~/app/lib/Api'

declare global {
  export type SitesRoles = 'ROLE_SITE_USER' | 'ROLE_SITE_EDITOR'
  export type SitesGrantableRoles = Exclude<SitesRoles, 'ROLE_SITE_USER'>
  export type AppUiMode = 'default' | 'map'

  export type ApiAction = 'create' | 'update' | 'read' | 'delete'
  export type SessionData = {
    id: string
    email: string
    roles: Array<ApiRole>
    privileges: Record<number, number>
  }
}
// https://nuxt.com/docs/guide/directory-structure/plugins#typing-plugins
// https://youtrack.jetbrains.com/issue/WEB-59818/Vue-custom-global-properties-added-by-augmenting-vue-are-not-resolved
declare module '#app' {
  interface NuxtApp {
    $api: Api
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: Api
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: Api
  }
}
export {}
