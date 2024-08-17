const resourceConfig: ResourceConfig = {
  apiPath: '/sites_users',
  appPath: '/admin/sites-users-privileges',
  name: 'sitesUsers',
  labels: ['Sites/Users Privilege', 'Sites/Users Privileges'],
  getCodeFn: (item) => () => `${item?.id}` || '',
}

export default resourceConfig
