import type { ResourceConfig } from '~/lib/resources/index'

const resourceConfig: ResourceConfig = {
  apiPath: '/sites',
  appPath: '/data/sites',
  name: 'sites',
  labels: ['Site', 'Sites'],
  getCodeFn: (item) => () => `${item?.code}` || '',
}

export default resourceConfig
