<script setup lang="ts">
import type { ApiResourceCollectionParent } from '~~/types'

const props = withDefaults(
  defineProps<{
    authorizedOnly?: boolean
    readonly?: boolean
    orderBy?: string | [string, 'asc' | 'desc']
    parent?: ApiResourceCollectionParent
    path: string
    watch?: ReadonlyArray<string | number>
  }>(),
  {
    authorizedOnly: false,
    orderBy: () => ['id', 'asc'],
    readonly: false,
  },
)

const items = ref([])
const search = ref('')
const orderBy = computed(() =>
  'string' === typeof props.orderBy
    ? [[props.orderBy, 'asc']]
    : [props.orderBy],
)
const params = computed(() =>
  Object.assign(
    {
      search: search.value,
      order: Object.fromEntries(orderBy.value),
      itemsPerPage: 10,
    },
    props.parent ? { parent: Object.fromEntries([props.parent]) } : {},
  ),
)

const autocomplete = useNuxtApp().$api.autocomplete
const loading = ref(false)
const updateItems = async () => {
  console.log(params.value)
  loading.value = true
  try {
    items.value = await autocomplete.search(
      props.path,
      params.value,
      props.authorizedOnly,
    )
  } catch (e) {
    items.value = []
  } finally {
    loading.value = false
  }
}

const timerId = ref(undefined)
const updateItemsDebounced = () => {
  // cancel pending call
  clearTimeout(timerId.value)

  // delay new call 500ms
  timerId.value = setTimeout(() => {
    updateItems()
  }, 500)
}

const modelUpdated = ref(false)
watch(
  params,
  () => {
    if (modelUpdated.value) {
      // avoid unnecessary fetch
      modelUpdated.value = false
      return
    }
    updateItemsDebounced()
  },
  { immediate: !props.readonly, deep: true },
)
watch(() => props.watch, updateItems)
</script>

<template>
  <v-autocomplete
    no-filter
    return-object
    :items
    item-value="id"
    :loading
    @update:search="search = $event"
    @update:model-value="modelUpdated = true"
  >
    <!-- https://mokkapps.de/vue-tips/expose-slots-from-a-child-component-->
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </v-autocomplete>
</template>

<style scoped></style>
