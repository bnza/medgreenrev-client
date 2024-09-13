const resourceConfig: ResourceConfig = {
  apiPath: '/stratigraphic_units_media_objects',
  appPath: '',
  name: 'stratigraphicUnitsMediaObjects',
  labels: [
    'Stratigraphic Unit Media Object',
    'Stratigraphic Unit Media Objects',
  ],
  getCodeFn: (item) => () => item.id,
}

export default resourceConfig
