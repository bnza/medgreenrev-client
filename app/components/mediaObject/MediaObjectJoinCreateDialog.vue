<script setup lang="ts">
import type { ApiResourceCollectionParent, ApiResourceItem } from '~~/types'
import useMediaObjectJoinValidation from '~/composables/validation/useMediaObjectJoinValidation'

const props = withDefaults(
  defineProps<{
    parent: ApiResourceCollectionParent
    mimeTypes?: Array<string>
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
const state: { item: ApiResourceItem; file: File | undefined } = reactive({
  item: { id: props.parent[1] },
  file: undefined,
})

const model = defineModel<boolean>({ required: true })
const { status, createAndFeedback } = inject(mediaObjectJoinInjectionKey)

const form = useTemplateRef('form')
const rules = useMediaObjectJoinValidation()
const disabled = ref(true)
watchEffect(() => {
  if (form.value) {
    disabled.value = !Boolean(form.value.isValid)
  }
})
const submit = async () => {
  await createAndFeedback(state)
  if (status.value === 'success') {
    model.value = false
  }
}
watch(model, (flag) => {
  if (!flag) {
    state.file = undefined
  }
})
</script>

<template>
  <v-dialog v-model="model" max-width="400px" persistent>
    <v-card data-testid="create-media-object-card">
      <v-card-text class="text-center">
        <v-container v-if="status === 'pending'" style="height: 150px">
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
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else style="height: 150px">
          <v-form @submit.prevent ref="form">
            <v-row align-content="center" class="fill-height" justify="center">
              <v-col class="text-subtitle-1 text-center" cols="12">
                <v-file-input
                  :rules="rules['file']"
                  clearable
                  label="File input"
                  v-model="state.file"
                  :accept
                />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="anchor"
          @click="model = false"
          :disabled="status === 'pending'"
        >
          close
        </v-btn>
        <v-spacer />
        <v-btn color="primary" @click="submit()" :disabled> submit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
