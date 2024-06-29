import useResource from './useResource'

export default function () {
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
    }
  ]

  const normalizePatchItem = (newItem, oldItem, diffItem) => {
    if (diffItem.roles) {
      diffItem.roles = newItem.roles
    }
    return diffItem
  }

  return useResource({
    resourceKey: 'users',
    defaultHeaders,
    normalizePatchItem
  })
}
