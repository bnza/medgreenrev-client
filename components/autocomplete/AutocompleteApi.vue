<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  orderBy: {
    type: String,
  },
  itemTitle: {
    type: String,
    required: true,
  },
  itemValue: {
    type: String,
    validator: propsValidator,
  },
  itemSubtitle: {
    type: String,
    validator: propsValidator,
  },
  // errorMessages: Array<string>,
})

const model = defineModel()

const useAutocomplete = ({
  path,
  orderBy,
  itemTitle,
  itemSubtitle,
}: {
  path: string
  orderBy: string
  itemTitle?: string
  itemSubtitle?: string
}) => {
  const { autocomplete } = useNuxtApp().$api
  const value = ref('')
  const params = computed(() => {
    const _return: {
      search?: string
      order?: Record<string, string>
      itemsPerPage: number
    } = { itemsPerPage: 10 }

    if (orderBy) {
      _return.order = { [orderBy]: 'asc' }
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
      items.value = await autocomplete.search(path, params)
    },
    {
      immediate: true,
    },
  )

  const itemPropsFn = (item: Record<string, any>) => {
    return {
      title: item[itemTitle],
      subtitle: item[itemSubtitle],
    }
  }
  const itemProps = itemSubtitle ? itemPropsFn : false

  return { value, items, itemProps }
}
const { items, value, itemProps } = useAutocomplete({
  path: props.path,
  orderBy: props.orderBy,
  itemTitle: props.itemTitle,
  itemSubtitle: props.itemSubtitle,
})
</script>

<script lang="ts">
const xor = (a: boolean, b: boolean) => (a && !b) || (!a && b)
const propsValidator = (_: any, props: Record<string, any>) => {
  const keys = Object.keys(props)
  return xor(
    keys.includes('itemValue') && props.itemValue,
    keys.includes('itemSubtitle') && props.itemSubtitle,
  )
}
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
