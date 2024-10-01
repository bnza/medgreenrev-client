import type { AsyncValidationType } from '~~/types'

const accessNestedProps = (
  acc: Record<string, any> | undefined,
  propKey: string,
) => {
  return acc && acc.constructor === Object && propKey in acc
    ? acc[propKey]
    : undefined
}
const getValues = (state: Record<string, any>) => (propAccessor: string) => {
  const propKeys = propAccessor.split('.')
  return propKeys.reduce(accessNestedProps, state)
}

const isChanged = (oldValues: Array<any>, values: Array<any>) =>
  values.reduce((acc, value, i) => acc || value != oldValues[i], false)

const validator = useNuxtApp().$api.validator

export function useAsyncValidator({
  type = 'unique',
  prop,
  path,
  item,
  message = 'Async validation failed',
}: {
  type?: AsyncValidationType
  prop: string | Array<string>
  path: string
  item: Record<string, any>
  message?: string
}) {
  // const oldValue = item
  //   ? Array.isArray(prop)
  //     ? prop.map(getValues(item))
  //     : item[prop]
  //   : undefined
  return async function (value) {
    let oldValue = undefined
    if (Array.isArray(prop)) {
      value = prop.map(getValues(value))
      if (value.some((v) => typeof v === 'undefined')) {
        return true
      }
    } else if (value === '' || value === item?.[prop]) {
      return true
    }
    // if ('undefined' !== typeof oldValue && !isChanged(oldValue, value)) {
    //   return true
    // }
    return validator
      .validate(type, path, value)
      .then((result) => result || message)
  }
}
