const resourceConfig: ResourceConfig = {
  apiPath: '/samples',
  appPath: '/data/samples',
  name: 'samples',
  labels: ['Sample', 'Samples'],
  getCodeFn: (item) => () =>
    `${item?.stratigraphicUnit?.code}.${item.number}` || '',
  protectedFields: ['public'],
}

export default resourceConfig
