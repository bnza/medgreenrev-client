import { helpers } from '@vuelidate/validators'
import type { Reactive } from 'vue'

const { withMessage, withAsync } = helpers
type AsyncValidationType = 'unique'

const accessNestedProps = (
  acc: Record<string, any> | undefined,
  propKey: string,
) => (acc && propKey in acc ? acc[propKey] : undefined)

const getValues = (state: Record<string, any>) => (propAccessor: string) => {
  const propKeys = propAccessor.split('.')
  return propKeys.reduce(accessNestedProps, unref(state))
}

const isChanged = (oldValues: Array<any>, values: Array<any>) =>
  values.reduce((acc, value, i) => acc || value != oldValues[i], false)

export function useAsyncUniqueValidator({
  type = 'unique',
  prop,
  path,
  item,
  message,
  watch,
}: {
  type?: AsyncValidationType
  prop: string | Array<string>
  path: string
  item?: Record<string, any>
  message?: string
  watch?: ComputedRef<Array<string | number>>
}) {
  function validate(value, state: Reactive<Record<string, any>>) {
    if (Array.isArray(prop)) {
      value = prop.map(getValues(state))
      const oldValue = prop.map(getValues(item))

      if (!isChanged(oldValue, value)) {
        return true
      }
      if (value.some((v) => typeof v === 'undefined')) {
        return true
      }
    } else if (value === '' || value === item?.value?.[prop]) {
      return true
    }
    const { validator } = useNuxtApp().$api
    return validator.validate(type, path, value)
  }

  console.log(watch)

  return withMessage(
    () => message ?? `Duplicate [] tuple`,
    withAsync(validate, watch),
  )
}
