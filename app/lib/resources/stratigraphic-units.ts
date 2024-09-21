const resourceConfig: ResourceConfig = {
  apiPath: '/stratigraphic_units',
  appPath: '/data/stratigraphic-units',
  name: 'stratigraphicUnits',
  labels: ['Stratigraphic Unit', 'Stratigraphic Units'],
  getCodeFn: (item) => () =>
    `${item?.site?.code}.${item?.year}.${item?.number}` || '',
  protectedFields: ['public'],
}

export default resourceConfig
