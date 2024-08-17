import FetchApiResourceFactory from '~/repository/FetchApiResourceFactory'
import type { $Fetch } from 'nitropack'

class StratigraphicUnitsModule extends FetchApiResourceFactory<ApiResourceStratigraphicUnit> {
  constructor(fetcher: $Fetch) {
    super(fetcher)
  }

  get resourceKey(): ResourceKey {
    return 'stratigraphicUnits'
  }
}

export default StratigraphicUnitsModule
