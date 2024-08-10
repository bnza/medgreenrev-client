import useResource from './useResource'
import useResourceRouteName from '~/composables/resources/useResourceRouteName.ts'

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

  const { routeName: _routeName } = useResourceRouteName(routeName)
  routeName = _routeName

  const protectedFields = ['public']

  return useResource({
    resourceKey: 'sites',
    routeName,
    defaultHeaders,
    protectedFields,
  })
}
