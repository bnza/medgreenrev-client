import type { Validation } from '@vuelidate/core'

export type ReadonlyHeaders = VDataTable['$props']['headers']
export * from './api'
export * from './api-jsonld'
export * from './filters'
export * from './resources'
export type AppUiMode = 'default' | 'map' | 'login'

type InferValidation<T> = T extends Validation<infer U> ? U : never

export type UseResourceTypeOptions = Readonly<{
  defaultHeaders: ReadonlyHeaders
}>
// export type AppRole = 'ROLE_ADMIN' | 'ROLE_EDITOR' | 'ROLE_USER'
export type PaginationOptionsState = {
  itemsPerPage: number
  page: number
  sortBy: Array<{ key: string; order: 'asc' | 'desc' }>
}

export type BaseAcl = {
  canRead: boolean
  canUpdate: boolean
  canDelete: boolean
}

export type UpdateInvalidEvent = (
  event: 'update:invalid',
  ...args: any[]
) => void
