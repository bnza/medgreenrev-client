export type ReadonlyHeaders = VDataTable['$props']['headers']
export * from './api'
export * from './api-jsonld'
export * from './filters'
export * from './resources'
export type AppUiMode = 'default' | 'map' | 'login'

export type UseResourceTypeOptions = Readonly<{
  defaultHeaders: ReadonlyHeaders
}>
// export type AppRole = 'ROLE_ADMIN' | 'ROLE_EDITOR' | 'ROLE_USER'
export type PaginationOptionsState = {
  itemsPerPage: number
  page: number
  sortBy: Array<{ key: string; order: 'asc' | 'desc' }>
}
