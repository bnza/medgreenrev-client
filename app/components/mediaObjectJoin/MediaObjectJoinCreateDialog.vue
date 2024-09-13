<script setup lang="ts">
import { getResourceValidation } from '~/lib/resources'
import StratigraphicUnitsMediaObjects from '~/lib/resources/stratigraphic-units-media-objects'

const props = withDefaults(
  defineProps<{
    itemId: ApiId
    isOpen: boolean
    pending: boolean
    mimeTypes?: Array<AllowedMimeType>
  }>(),
  {
    mimeTypes: () => [
      'application/vnd.oasis.opendocument.spreadsheet',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ],
  },
)

const accept = computed(() => props.mimeTypes.join(','))
const item = computed(() => {
  return {
    item: props.itemId,
    file: null,
  }
})

const emit = defineEmits<{
  (e: 'submit', _item: typeof item): void
  (e: 'close'): void
  (e: 'update:invalid'): void
}>()

const isDialogOpen = computed({
  get() {
    return Boolean(props.isOpen)
  },
  set(value) {
    if (!value) {
      emit('close')
    }
  },
})

const useResourceValidation = await getResourceValidation(
  'stratigraphicUnitsMediaObjects',
)

const { state, v$ } = useResourceValidation(item, emit)
</script>

<template>
  <v-dialog
    :model-value="isDialogOpen"
    @after-leave="isDialogOpen = false"
    max-width="400px"
    :persistent="pending"
  >
    <v-card data-testid="create-media-object-card">
      <v-card-text class="text-center">
        <v-container v-if="pending" style="height: 150px">
          <v-row align-content="center" class="fill-height" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              Request in progress
            </v-col>
            <v-col cols="6">
              <v-progress-linear
                color="warning"
                height="6"
                indeterminate
                rounded
              ></v-progress-linear>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else style="height: 150px">
          <v-row align-content="center" class="fill-height" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              <v-file-input
                clearable
                label="File input"
                variant="underlined"
                v-model="state.file"
                :error-messages="v$.file.$errors.map((e) => e.$message)"
                :accept
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="$emit('submit', state)"
          :disabled="v$.$invalid || pending"
        >
          submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
