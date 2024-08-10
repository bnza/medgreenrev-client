import useResource from './useResource'
import useResourceRouteName from '~/composables/resources/useResourceRouteName.ts'

export default function (routeName = '', parent) {
  const defaultHeaders = [
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

  const { routeName: resourcePageKey } = useResourceRouteName(routeName, parent)
  const normalizePatchItem = (newItem, oldItem, diffItem) => {
    if (diffItem.roles) {
      diffItem.roles = newItem.roles
    }
    return diffItem
  }

  return useResource({
    resourceKey: 'users',
    resourcePageKey,
    defaultHeaders,
    normalizePatchItem,
  })
}
