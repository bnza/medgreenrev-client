<script setup lang="ts" generic="RT extends ApiResourceItem & ApiAclResource">
import type {
  ApiAclResource,
  ApiAction,
  ApiResourceItem,
  DataResourceKey,
} from '~~/types'
import useNavigationFromState from '~/composables/states/useNavigationFromState'
import useDiffItem from '~/composables/api/useDiffItem'

const props = withDefaults(
  defineProps<{
    codeKey?: string
    mode: ApiAction
    resourceKey: DataResourceKey
  }>(),
  {
    codeKey: 'code',
  },
)
const route = useRoute()
const id = ref(routeParamId(route.params.id))

const {
  deleteItem,
  resourceConfig,
  fetchItem,
  itemLabel,
  patchItem,
  postItem,
} = useResource<RT>(props.resourceKey, {})

let item = ref({})
let error = ref(undefined)
let status = ref(props.mode === 'create' ? 'success' : 'idle')

if (props.mode !== 'create') {
  const { item: _item, error: _error, status: _status } = await fetchItem(id)
  item.value = _item.value
  error.value = _error.value
  status.value = _status.value
}

const code = computed(() =>
  props.mode === 'create'
    ? ''
    : props.codeKey in item.value
      ? item.value[props.codeKey]
      : '[]',
)

const color = DATA_API_ACTIONS_BAR_COLOR[props.mode]

const { isValid, submitPending, triggerSubmit, submittingItem } = inject(
  dataItemPageInjectionKey,
)

const router = useRouter()
const { from } = useNavigationFromState(props.mode, resourceConfig)
const diffItem = useDiffItem(resourceConfig)
const { showSuccess } = useAppSnackbarState()

watch(submittingItem, async (value) => {
  if (value) {
    // Unset onUnmounted
    submitPending.value = true
    let to = ''
    try {
      switch (props.mode) {
        case 'create':
          const response = await postItem(
            resourceConfig.normalizePostItem(value),
          )
          to = `${resourceConfig.appPath}/${response.id}`
          break
        case 'delete':
          await deleteItem(value)
          break
        case 'update':
          if ('id' in item.value) {
            await patchItem(item.value.id, diffItem(value, item.value))
            to = `${resourceConfig.appPath}/${item.value.id}`
          }
          break
      }
      showSuccess({ text: `Successfully ${props.mode}d resource` })
      await router.replace(to || from.value)
    } catch (e) {
      console.log(e)
      submitPending.value = false
    }
  }
})
onUnmounted(() => {
  submitPending.value = false
})
</script>

<template>
  <resource-not-found
    v-if="error"
    :path="resourceConfig.appPath"
    :error="error"
  />
  <lazy-pending-request-loader-dialog :visible="submitPending" />
  <data-card v-if="status === 'success'" :title="itemLabel" :code :color>
    <template #toolbar-prepend>
      <navigation-resource-collection-back />
    </template>
    <template #title-append>
      <lazy-data-toolbar-title-append v-if="mode !== 'read'" :text="mode" />
    </template>
    <template #toolbar-append>
      <v-btn
        v-if="mode !== 'read'"
        :disabled="!isValid"
        color="anchor"
        rounded="false"
        variant="text"
        :icon="true"
        @click="triggerSubmit = true"
      >
        <v-icon icon="fas fa-arrow-up-from-bracket" />
        <v-tooltip activator="parent" location="bottom"
          >Submit {{ mode }}</v-tooltip
        >
      </v-btn>
    </template>
    <slot :resource-config="resourceConfig" :item="item" />
  </data-card>
</template>
