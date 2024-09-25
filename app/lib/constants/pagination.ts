export type PaginationOptionsState = {
  itemsPerPage: number
  page: number
  sortBy: Array<{ key: string; order: 'asc' | 'desc' }>
}
export const defaultPaginationOptions: Readonly<PaginationOptionsState> = {
  page: 1,
  itemsPerPage: 10,
  sortBy: [
    {
      key: 'id',
      order: 'asc',
    },
  ],
}
