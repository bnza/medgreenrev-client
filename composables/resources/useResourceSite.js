import useResource from './useResource'

export default function (routeName = '') {
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
      key: 'code',
      value: 'code',
      title: 'code',
      width: '200',
    },
    {
      key: 'name',
      value: 'name',
      title: 'name',
    },
    {
      key: 'description',
      value: 'description',
      title: 'description',
      sortable: false,
    },
    {
      key: 'public',
      value: 'public',
      title: 'public',
      sortable: false,
    },
  ]

  if (!routeName) {
    const route = useRoute()
    routeName = route.name
  }

  const protectedFields = ['public']

  return useResource({
    resourceKey: 'sites',
    routeName,
    defaultHeaders,
    protectedFields,
  })
}
