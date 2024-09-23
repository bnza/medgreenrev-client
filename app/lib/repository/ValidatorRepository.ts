import AbstractRepository from '~/lib/repository/AbstractRepository'

// const debounce = (callback, wait) => {
//   let timeoutId = null
//   return (...args) => {
//     window.clearTimeout(timeoutId)
//     timeoutId = window.setTimeout(() => {
//       callback(...args)
//     }, wait)
//   }
// }
// const debounce = (callback, wait) => {
//   let timeoutId = null
//
//   return (...args) => {
//     window.clearTimeout(timeoutId)
//
//     timeoutId = window.setTimeout(() => {
//       callback.apply(null, args)
//     }, wait)
//   }
// }

class ValidatorRepository extends AbstractRepository {
  validate = async (
    type: string,
    path: MaybeRef<string>,
    value: MaybeRef<string>,
  ) => {
    let _value = unref(value)
    _value = Array.isArray(_value) ? _value.join('/') : _value
    return this.$fetch(`/validator/${type}/${unref(path)}/${_value}`).then(
      (r) => Boolean(r),
    )
  }

  // debounce(func, wait, immediate) {
  //   let timeout
  //   return function (...args) {
  //     return new Promise((resolve) => {
  //       clearTimeout(timeout)
  //       timeout = setTimeout(() => {
  //         timeout = null
  //         if (!immediate) {
  //           Promise.resolve(func.apply(this, [...args])).then(resolve)
  //         }
  //       }, wait)
  //       if (immediate && !timeout) {
  //         Promise.resolve(func.apply(this, [...args])).then(resolve)
  //       }
  //     })
  //   }
  // }

  // #debounce = (callback, wait) => {
  //   let timeoutId = null
  //
  //   return (...args) => {
  //     window.clearTimeout(timeoutId)
  //
  //     timeoutId = window.setTimeout(() => {
  //       callback.apply(this, args)
  //     }, wait)
  //   }
  // }

  // validate = this.debounce(this.#_validate, 250, false)
}

export default ValidatorRepository
