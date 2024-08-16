import type { ResourceConfig } from '~/lib/resources/index'

const resourceConfig: ResourceConfig = {
  apiPath: '/admin/users',
  appPath: '/admin/users',
  name: 'users',
  labels: ['User', 'Users'],
  getCodeFn: (item) => () => `${item?.email}` || '',
}

export default resourceConfig
