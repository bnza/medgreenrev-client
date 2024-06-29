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

export const dataFormItemProp = Object.freeze({
  type: Object,
  // validator(value) {
  //   return isEmptyObject(value) || isApiItem(value)
  // },
})
