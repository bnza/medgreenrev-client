import type { BaseAcl, PaginationOptionsState } from '~~/types'
export * from './auth'
export * from './colors'
export * from './states'
export const defaultPaginationOptions: Readonly<PaginationOptionsState> =
  Object.freeze({
    page: 1,
    itemsPerPage: 10,
    search: undefined,
    groupBy: [],
    sortBy: [
      {
        key: 'id',
        order: 'asc' as 'asc', //?
      },
    ],
  })

export const itemsPerPageOptions: ReadonlyArray<{
  value: number
  title: string
}> = Object.freeze([
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
])

export const defaultBaseAcl: Readonly<BaseAcl> = Object.freeze({
  canRead: true,
  canUpdate: false,
  canDelete: false,
})
