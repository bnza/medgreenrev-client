import FetchFactory from '~/repository/FetchFactory'

class ApiValidator<T = any> extends FetchFactory<T> {
  async validate(
    type: string,
    path: MaybeRef<string>,
    value: MaybeRef<string>,
  ) {
    let _value = unref(value)
    _value = Array.isArray(_value) ? _value.join('/') : _value
    return this.$fetch(`/validator/${type}/${unref(path)}/${_value}`).then(
      (r) => Boolean(r),
    )
  }
}

export default ApiValidator
