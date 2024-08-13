import { isResourceKey, type ResourceKey } from '~/lib/resources'
import type { Roles } from '~/lib/constants/enums'

export { useAppNavigationDrawerVisibleState } from './states/useAppNavigationDrawerVisibleState'
export { useAppSnackbarState } from './states/useAppSnackbarState'
export { useLoginRedirectUrlState } from './states/useLoginRedirectUrlState'
export { useDataUiModeState } from './states/useDataUiModeState'
export { useUserPlainPasswordState } from '~/composables/states/useUserPlainPasswordState'

export { default as useResource } from './resources/useResource'

export { default as useDataForm } from './form/useDataForm'
export { default as useDataFormCode } from './form/useDataFormCode'
export { default as useSubmitResourceRequest } from './form/useSubmitResourceRequest'
export { useResourceFiltersState } from '~/composables/states/useResourceFiltersStates'

export type SessionData = {
  id: string
  email: string
  roles: Array<Roles>
  privileges: Record<number, number>
}
export const getResourcePageRootKey = (
  resourcePageKey: string,
): ResourceKey => {
  const resourcePageRootKey = resourcePageKey.split('/')[0]
  if (isResourceKey(resourcePageRootKey)) {
    return resourcePageRootKey
  }
  throw new Error(`No such "${resourcePageRootKey}" resource key`)
}
