import type { DataResourceKey, StaticResourceConfig } from '~~/types'

const pottery: StaticResourceConfig = {
  appPath: '/data/potteries',
  labels: ['Pottery', 'Potteries'],
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
      sortable: false,
    },
    {
      key: 'number',
      value: 'number',
      title: 'number',
    },
    {
      key: 'projectIdentifier',
      value: 'projectIdentifier',
      title: 'project identifier',
      sortable: false,
    },
    {
      key: 'fragmentsNumber',
      value: 'fragmentsNumber',
      title: 'fragments (num.)',
    },
    {
      key: 'chronologyLower',
      value: 'chronologyLower',
      title: 'chronology (lower)',
    },
    {
      key: 'chronologyUpper',
      value: 'chronologyUpper',
      title: 'chronology (upper)',
    },
    {
      key: 'functionalGroup.value',
      value: 'functionalGroup',
      title: 'functional group',
    },
    {
      key: 'typology.value',
      value: 'typology',
      title: 'typology',
    },
    {
      key: 'part.value',
      value: 'part',
      title: 'part',
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

const sitesUser: StaticResourceConfig = {
  appPath: '/admin/sites-users-privileges',
  labels: ['Sites/Users Privilege', 'Sites/Users Privileges'],
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
      key: 'site.code',
      value: 'site.code',
      title: 'site',
      width: '200',
    },
    {
      key: 'user.email',
      value: 'user.email',
      title: 'user',
    },
    {
      key: 'privileges',
      value: 'privileges',
      title: 'privileges',
    },
  ],
}

const stratigraphicUnit: StaticResourceConfig = {
  appPath: '/data/stratigraphic-units',
  labels: ['Stratigraphic Unit', 'Stratigraphic Units'],
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
      key: 'site.code',
      value: 'site.code',
      title: 'site',
      width: '80',
    },
    {
      key: 'code',
      value: 'code',
      title: 'code',
      width: '200',
      sortable: false,
    },
    {
      key: 'number',
      value: 'number',
      title: 'number',
    },
    {
      key: 'year',
      value: 'year',
      title: 'year',
    },
    {
      key: 'interpretation',
      value: 'interpretation',
      title: 'interpretation',
      sortable: false,
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
const user: StaticResourceConfig = {
  appPath: '/admin/users',
  labels: ['User', 'Users'],
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
  ],
}

const stratigraphicUnitsMediaObject: StaticResourceConfig = {
  appPath: '/',
  labels: ['Medium (Stratigraphic Unit)', 'Media (Stratigraphic Unit)'],
  defaultHeaders: [],
}

const data: Readonly<Record<DataResourceKey, StaticResourceConfig>> =
  Object.freeze({
    pottery,
    site,
    sitesUser,
    stratigraphicUnit,
    stratigraphicUnitsMediaObject,
    user,
  })

export default data
