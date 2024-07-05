const dataFormModeValidator = (value) =>
  Object.values(API_ACTIONS).includes(value)

const isPlainObject = (value) => value?.constructor === Object

const isEmptyObject = (value) =>
  isPlainObject(value) && Object.keys(value).length === 0

const isApiItem = (value) => isPlainObject(value) && 'id' in value

export const dataFormModeProp = Object.freeze({
  required: true,
  type: String,
  validator: dataFormModeValidator,
})

const resourceDataTableItemsProp = Object.freeze({
  type: Object,
  required: true,
  validator(value) {
    return Array.isArray(value)
  },
})

const resourceDataTableTotalItemsProp = Object.freeze({
  type: Number,
  required: true,
})

const fetchPendingProp = Object.freeze({
  type: Boolean,
  default: false,
})

export const resourceDataTableProps = Object.freeze({
  items: resourceDataTableItemsProp,
  totalItems: resourceDataTableTotalItemsProp,
  pending: fetchPendingProp,
})

export const dataFormItemProp = Object.freeze({
  type: Object,
  // validator(value) {
  //   return isEmptyObject(value) || isApiItem(value)
  // },
})
