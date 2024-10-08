import { required, each } from '~/utils/validations'
export default function () {
  return {
    item: [required],
    file: [each(required)],
  }
}
