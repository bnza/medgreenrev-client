import type { VDataTable } from 'vuetify/components'

export const ITEMS_PER_PAGE_OPTIONS: ReadonlyArray<{
  value: number
  title: string
}> = [
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
]

export type ReadonlyHeaders = VDataTable['$props']['headers']
