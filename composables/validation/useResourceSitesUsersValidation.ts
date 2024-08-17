import useVuelidate from '@vuelidate/core'
import { required, integer, helpers } from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from './messages'
import { useAsyncUniqueValidator } from '~/composables/validation/useAsyncUniqueValidator'
import { useEmitValidationInvalid } from '~/composables/validation/useEmitValidationInvalid'
import type { ResourceValidation, ApiResourceSitesUsers } from '~/lib/resources'

const useValidation: ResourceValidation<ApiResourceSitesUsers> = (
  item: Partial<RT>,
  emit,
) => {
  const shallowItem = JSON.parse(JSON.stringify(item?.value))
  const state = reactive(shallowItem)

  const rules = {
    site: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      unique: useAsyncUniqueValidator({
        path: 'sites_users',
        message: 'Duplicate (site, user) tuple',
        prop: ['site.id', 'user.id'],
        item,
        watch: () => [state.user?.id],
      }),
    },
    user: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      unique: useAsyncUniqueValidator({
        path: 'sites_users',
        message: 'Duplicate (site, user) tuple',
        prop: ['site.id', 'user.id'],
        item,
        watch: () => [state.site?.id],
      }),
    },
    privileges: {
      required: helpers.withMessage(FORM_REQUIRED_FIELD, required),
      integer,
    },
  }

  const v$ = useVuelidate(rules, state, {
    $autoDirty: true,
  })

  useEmitValidationInvalid(v$, emit)

  return { state, v$ }
}

export default useValidation
