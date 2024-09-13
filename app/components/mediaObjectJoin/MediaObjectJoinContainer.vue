<script setup lang="ts" generic="RT extends ApiResourceItemMediaObject">
const { show, showError } = useAppSnackbarState()
const props = defineProps<{
  resourceKey: Extract<ResourceKey, 'stratigraphicUnitsMediaObject'>
  parent: Record<string, ApiId>
  canUpdate: boolean
}>()

// const { paginationOptions, fetchCollection, deleteItem, postItem } =
//   await useResource<ApiResourceStratigraphicUnitRelationship>(
//     'stratigraphicUnitsMediaObjects',
//     { parent: props.parent, resourceOperationType: 'collection' },
//   )

const { paginationOptions, fetchCollection, deleteItem, postItem } =
  await useResource<ApiResourceItemMediaObject>(props.resourceKey, {
    parent: props.parent,
    resourceOperationType: 'collection',
  })
paginationOptions.itemsPerPage = -1

const { items, refresh } = await fetchCollection()

const config = useRuntimeConfig()
const baseURL = String(new URL('/', config.public.apiBaseURL))

const deletingItem = ref(0)
const deletePending = ref(false)
const deleteAndFeedback = async () => {
  if (!deletingItem.value) {
    return
  }
  deletePending.value = true
  try {
    const newItem = items.value.filter(
      (item: RT) => item.id === deletingItem.value,
    )
    await deleteItem({ newItem: newItem[0] })
    show({
      color: 'success',
      text: 'Successfully deleted media',
      timeout: 4000,
    })
    await refresh()
    deletingItem.value = 0
  } finally {
    deletePending.value = false
  }
}

const isCreateDialogOpen = ref(false)
const createPending = ref(false)
const itemResourceId: Ref<ApiId> = computed(() =>
  props.parent ? Object.values(props.parent)[0] : 0,
)

const createAndFeedback = async (item: Record<string, any>) => {
  createPending.value = true
  const formData = new FormData()
  formData.append('item', item.item)
  formData.append('file', item.file)
  try {
    await postItem({
      newItem: formData,
      contentType: 'multipart/form-data',
    })
    show({
      color: 'success',
      text: 'Successfully created media',
      timeout: 4000,
    })
    await refresh()
    isCreateDialogOpen.value = false
  } catch (e) {
    showError(e)
  } finally {
    createPending.value = false
  }
}
</script>

<template>
  <v-container>
    <media-object-join-create-dialog
      :item-id="itemResourceId"
      :is-open="isCreateDialogOpen"
      :pending="createPending"
      @submit="createAndFeedback($event)"
      @close="isCreateDialogOpen = false"
    />
    <media-object-join-delete-dialog
      :id="deletingItem"
      :pending="deletePending"
      @close="deletingItem = 0"
      @delete="deleteAndFeedback"
    />
    <v-row dense justify="end" style="min-height: 48px">
      <v-col class="text-right">
        <v-btn
          v-if="canUpdate"
          class="mr-4"
          density="compact"
          :icon="true"
          variant="text"
          data-testid="create-media-button"
          @click="isCreateDialogOpen = true"
        >
          <v-icon icon="fa fa-plus" size="x-large" />
          <v-tooltip activator="parent" location="bottom">Add media</v-tooltip>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="items.length > 0" no-gutters>
      <v-col v-for="item of items" :key="item['@id']" cols="3">
        <media-object-join-card
          :id="item.id"
          :media-object="item.mediaObject"
          :baseURL
          :can-update
          @delete="deletingItem = $event"
        />
      </v-col>
    </v-row>
    <resource-not-found v-else />
  </v-container>
</template>

<style scoped></style>
