import FetchFactory from '~/repository/fetchFactory'

class ApiValidator extends FetchFactory {
  async validate(type, path, value) {
    return this.$fetch(
      `/validator/${type}/${unref(path)}/${unref(value)}`,
    ).then((r) => Boolean(r))
  }
}

export default ApiValidator
