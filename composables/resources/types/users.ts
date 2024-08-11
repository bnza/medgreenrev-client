import type { ReadonlyHeaders } from '~/lib/constants/vuetify'
import type { UseResourceTypeOptions } from '~/lib/resources'

export default function (): UseResourceTypeOptions {
  const defaultHeaders: ReadonlyHeaders = [
    {
      key: 'id',
      value: 'id',
      title: 'ID',
      align: 'center',
      width: '200',
      maxWidth: '200',
    },
    {
      key: 'email',
      value: 'email',
      title: 'email',
      width: '200',
    },
    {
      key: 'roles',
      value: 'roles',
      title: 'roles',
      sortable: false,
    },
  ]

  const normalizePatchItem = (newItem, oldItem, diffItem) => {
    if (diffItem.roles) {
      diffItem.roles = newItem.roles
    }
    return diffItem
  }

  return {
    defaultHeaders,
    normalizePatchItem,
  }
}
