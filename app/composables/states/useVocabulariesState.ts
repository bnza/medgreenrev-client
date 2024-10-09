import type {
  ApiVocabularyItem,
  JsonLdResourceCollection,
  JsonLdResourceItem,
  VocabularyResourceKey,
} from '~~/types'
import vocabularies from '~/utils/constants/resources/vocabularies'
import Api from '~/utils/repository/Api'

type VocabulariesState = Record<
  VocabularyResourceKey,
  JsonLdResourceItem<ApiVocabularyItem>
>

type GetVocabulary = {
  (): JsonLdResourceCollection<ApiVocabularyItem>
  (id: string): JsonLdResourceItem<ApiVocabularyItem>
  (id: string, prop: keyof JsonLdResourceItem<ApiVocabularyItem>): typeof prop
  (id: undefined, prop: keyof JsonLdResourceItem<ApiVocabularyItem>): undefined
}

const getVocabulary =
  (state: VocabulariesState) =>
  (key: VocabularyResourceKey): GetVocabulary =>
  (id?: string, prop?: keyof ApiVocabularyItem) =>
    id
      ? prop
        ? state[key]?.[id]?.[prop]
        : state[key]?.[id]
      : prop
        ? undefined
        : state[key]
const fetchVocabularies = (
  state: Ref<VocabulariesState>,
  api: Api,
  configs: ReturnType<typeof useResourceConfig>,
) => {
  const vocabulariesUrlMap = Object.keys(vocabularies).map(
    (key: VocabularyResourceKey) => [
      key,
      configs.getResourceConfig(key).apiPath,
    ],
  )
  return Promise.all(
    vocabulariesUrlMap.map(([key, path]) =>
      api
        .fetch<JsonLdResourceCollection<ApiVocabularyItem>>(path, {
          method: 'get',
        })
        .then((results) => [
          key,
          Object.fromEntries(
            results['hydra:member'].map((item) => [item['@id'], item]),
          ),
        ]),
    ),
  ).then((results) => {
    state.value = Object.fromEntries(results)
    return useVocabularyState()
  })
}

function useVocabularyState(
  api: Api,
): Promise<(key: VocabularyResourceKey) => GetVocabulary>
function useVocabularyState(): (key: VocabularyResourceKey) => GetVocabulary
function useVocabularyState(api?: Api) {
  const state: Ref<VocabulariesState | undefined> = useState(
    States.ApiDocs,
    () => undefined,
  )

  if (api && !state.value) {
    const configs = useResourceConfig()
    return fetchVocabularies(state, api, configs)
  }

  // return (key: VocabularyResourceKey) =>
  //   (id?: string, prop?: keyof ApiVocabularyItem) =>
  //     id
  //       ? prop
  //         ? state.value[key]?.[id]?.[prop]
  //         : state.value[key]?.[id]
  //       : state.value[key]
  return getVocabulary(state.value)
}

export default useVocabularyState
