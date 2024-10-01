import type { ApiResourceSite } from '~~/types'
import { useAsyncValidator } from '~/composables/validation/useAsyncValidator'
import { required, maxLength } from '~/utils/validations'
// type CodeName = {
//   code?: string
//   name?: string
// }
export default function (item: Partial<ApiResourceSite>) {
  const uniqueCode = useAsyncValidator({
    prop: 'code',
    path: 'sites/code',
    message: 'Duplicate code',
    item,
  })

  const uniqueName = useAsyncValidator({
    prop: 'name',
    path: 'sites/name',
    message: 'Duplicate name',
    item,
  })

  const rules = {
    code: [required, maxLength(3), uniqueCode],
    name: [
      required,
      uniqueName,
      // (value: Partial<ApiResourceSite>) =>
      //   Boolean(state.name) || 'This field is required',
    ],
  }
  // const values = {
  //   'code:name': computed(() => ({ code: state.code, name: state.name })),
  // }
  return { rules }
}
