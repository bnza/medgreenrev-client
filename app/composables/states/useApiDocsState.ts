import type { JsonLdApiDocumentation } from '~~/types'

export default function () {
  const state: Ref<JsonLdApiDocumentation | {}> = useState(
    States.ApiDocs,
    () => ({}),
  )
  const set = (value: JsonLdApiDocumentation) => {
    state.value = value
  }

  const ready = computed(() => 'hydra:supportedClass' in state.value)

  const classes: Ref<Array<string>> = computed(() => {
    let classes = []
    if (
      'hydra:supportedClass' in state.value &&
      Array.isArray(state.value['hydra:supportedClass'])
    ) {
      classes = state.value['hydra:supportedClass'].map((currentClass) =>
        currentClass['@id'].replace('#', ''),
      )
    }
    return classes
  })
  const vocabularies = computed(() =>
    classes.value.filter((current) => /^Vocabulary/.test(current)),
  )

  return { ready, classes, set, vocabularies }
}
