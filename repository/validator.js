import FetchFactory from '~/repository/fetchFactory'

class ApiValidator extends FetchFactory {
  async validate(type, path, value) {
    let _value = unref(value)
    _value = Array.isArray(_value) ? _value.join('/') : _value
    return this.$fetch(`/validator/${type}/${unref(path)}/${_value}`).then(
      (r) => Boolean(r),
    )
  }
}

export default ApiValidator
