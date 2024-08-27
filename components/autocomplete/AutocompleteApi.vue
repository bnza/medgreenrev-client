<script setup lang="ts" generic="RT extends Record<string, any>">
import useApiAutocomplete from '~/composables/api/useApiAutocomplete'

const props = withDefaults(
  defineProps<{
    label: string
    path: string
    itemTitle: string
    itemValue?: string
    itemSubtitle?: string
    orderBy?: string
    authorizedOnly?: boolean
  }>(),
  {
    authorizedOnly: false,
  },
)

if (!XorProps(props, 'itemValue', 'itemSubtitle')) {
  console.error('itemValue and itemSubtitle are mutually exclusive')
}
const model = defineModel<RT>()

const autocomplete = useApiAutocomplete()

const useAutocomplete = () => {
  // const { autocomplete } = useNuxtApp().$api
  const value = ref('')
  const params = computed(() => {
    const _return: {
      search?: string
      order?: Record<string, string>
      itemsPerPage: number
    } = { itemsPerPage: 10 }

    if (props.orderBy) {
      _return.order = { [props.orderBy]: 'asc' }
    }

    if (value.value) {
      _return.search = value.value
    }

    return _return
  })
  const items = ref([{}])

  watch(
    params,
    async () => {
      items.value = await autocomplete.search(
        props.path,
        params,
        props.authorizedOnly,
      )
    },
    {
      immediate: true,
    },
  )

  const itemPropsFn = (item: Record<string, any>) => {
    return {
      title: item[props.itemTitle],
      subtitle: item[props.itemSubtitle],
    }
  }
  const itemProps = props.itemSubtitle ? itemPropsFn : false

  return { value, items, itemProps }
}
const { items, value, itemProps } = useAutocomplete()
</script>

<script lang="ts">
const xor = (a: boolean, b: boolean) => (a && !b) || (!a && b)

const XorProps = (props: Record<string, any>, key1: string, key2: string) => {
  return xor(
    key1 in props && 'undefined' !== typeof props[key1],
    key2 in props && 'undefined' !== typeof props[key2],
  )
}
// const propsValidator = (_: any, props: Record<string, any>) => {
//   const keys = Object.keys(props)
//   return xor(
//     keys.includes('itemValue') && props.itemValue,
//     keys.includes('itemSubtitle') && props.itemSubtitle,
//   )
// }
</script>

<template>
  <v-autocomplete
    :label
    :items
    :model-value="model"
    @update:search="value = $event"
    @update:modelValue="model = $event"
    :itemValue
    :itemTitle
    :itemProps
    return-object
  />
</template>

<style scoped></style>
