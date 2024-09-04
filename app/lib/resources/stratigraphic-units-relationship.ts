const resourceConfig: ResourceConfig = {
  apiPath: '/stratigraphic_units_relationships',
  appPath: '/data/stratigraphic-units-relationships',
  name: 'stratigraphicUnitsRelationships',
  labels: [
    'Stratigraphic Unit Relationship',
    'Stratigraphic Unit Relationships',
  ],
  getCodeFn: (item) => () => item.id,
}

export default resourceConfig
