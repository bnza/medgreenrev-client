import { required } from '~/utils/validations'

export default function <RT extends Record<string, any>>() {
  return computed(() => ({
    property: [required],
    filter: [required],
  }))
}
