export type SnackbarState = typeof defaultValue

const defaultValue = {
  visible: true,
  vertical: false,
  text: '',
  color: 'info',
  timeout: -1,
  multiline: false,
}

export const getDefault = () => structuredClone(defaultValue)
