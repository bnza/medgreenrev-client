import type { DataResourceKey, StaticResourceConfig } from '~~/types'

const site: StaticResourceConfig = {
  // apiPath: '/sites',
  appPath: '/data/sites',
  // name: 'sites',
  labels: ['Site', 'Sites'],
  protectedFields: ['public'],
}

const data: Record<DataResourceKey, StaticResourceConfig> = {
  site,
}

export default data
