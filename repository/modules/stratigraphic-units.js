import FetchApiResourceFactory from '~/repository/fetchApiResourceFactory'

class StratigraphicUnitsModule extends FetchApiResourceFactory {
  constructor(fetcher) {
    super(fetcher)
  }

  get resourceKey() {
    return 'stratigraphicUnits'
  }
}

export default StratigraphicUnitsModule
