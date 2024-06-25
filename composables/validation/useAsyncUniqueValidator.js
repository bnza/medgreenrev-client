import { helpers } from '@vuelidate/validators'

const { withMessage, withAsync } = helpers

export function useAsyncUniqueValidator(type, prop, path, item, message) {
  function validator(value) {
    if (value === '' || value === item.value?.[prop]) {
      return true
    }
    const { validator: _v } = useNuxtApp().$api
    return _v.validate(type, path, value)
  }

  return withMessage(
    message ?? `Duplicate ${String(prop)}`,
    withAsync(validator),
  )
}
