export type PaginationOptionsState = {
  itemsPerPage: number
  page: number
  sortBy: Array<{ key: string; order: 'asc' | 'desc' }>
}
export const defaultPaginationOptions: Readonly<PaginationOptionsState> = {
  itemsPerPage: 10,
  page: 1,
  sortBy: [
    {
      key: 'id',
      order: 'asc',
    },
  ],
}
