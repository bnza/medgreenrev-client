import type { DataResourceKey, StaticResourceConfig } from '~~/types'

const site: StaticResourceConfig = {
  appPath: '/data/sites',
  labels: ['Site', 'Sites'],
  protectedFields: ['public'],
  defaultHeaders: [
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
  ],
}

const data: Record<DataResourceKey, StaticResourceConfig> = {
  site,
}

export default data
