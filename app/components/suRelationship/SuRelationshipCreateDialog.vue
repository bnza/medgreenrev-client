<script setup lang="ts">
import { stratigraphicUnitsRelationshipHelperInjectionKey } from '~/composables/useStratigraphicUnitsRelationship'
import useSubmitForm from '~/composables/form/useSubmitForm'
import { stratigraphicUnitRelationshipMap } from '~/lib/resources/vocabulary'

const { sxSu, postItem, creatingRelationshipType, triggerRefreshCollection } =
  inject(stratigraphicUnitsRelationshipHelperInjectionKey)

const isDialogOpen = computed({
  get() {
    return Boolean(creatingRelationshipType.value)
  },
  set(flag: false) {
    creatingRelationshipType.value = ''
  },
})

const parent = computed(() =>
  sxSu.value?.site?.id ? { 'site.id': sxSu.value.site.id } : undefined,
)

const item = computed(() => {
  return {
    sxSU: { id: sxSu.value.id },
    relationship: creatingRelationshipType.value,
    dxSU: undefined,
  }
})

const relationshipText = computed(() =>
  creatingRelationshipType.value
    ? stratigraphicUnitRelationshipMap[creatingRelationshipType.value]
    : '',
)

const emit = defineEmits([
  'update:triggerSubmit',
  'submitForm',
  'update:invalid',
])
const { submit, isSubmitPending, triggerSubmit } = useSubmitResourceRequest(
  'create',
  postItem,
)

const formProps = reactive({ triggerSubmit, item })
const { state, v$ } =
  await useSubmitForm<ApiResourceStratigraphicUnitRelationship>(
    'stratigraphicUnitsRelationships',
    formProps,
    emit,
  )

watch(creatingRelationshipType, () => {
  state.relationship = creatingRelationshipType.value
})
const stratigraphicUnitResourceConfig = getResourceConfig('stratigraphicUnits')

const submitAndRefresh = async () => {
  const valid = await v$.value.$validate()
  if (valid) {
    try {
      await submit({ state, redirect: false, reThrow: true })
      creatingRelationshipType.value = ''
      triggerRefreshCollection.value = true
      state.dxSU = undefined
    } catch (e) {}
  }
}
</script>

<template>
  <v-dialog persistent :model-value="isDialogOpen" max-width="400px">
    <v-card title="new relationship">
      <v-card-text data-testid="add-su-relationship-card">
        <v-container>
          <v-row dense justify="center">
            <v-col
              justify="center"
              class="text-center text-secondary font-weight-bold"
            >
              <p>{{ stratigraphicUnitResourceConfig.getCodeFn(sxSu)() }}</p>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col justify="center" class="text-uppercase text-center">
              <p>{{ relationshipText }}</p>
            </v-col>
          </v-row>
        </v-container>
        <v-row dense>
          <v-col justify="center">
            <autocomplete-api
              label="SU"
              path="stratigraphic_units"
              authorized-only
              order-by="number"
              item-title="number"
              item-subtitle="site.code"
              custom-item
              v-model="state.dxSU"
              :parent
              :error-messages="v$.dxSU.$errors.map((e) => e.$message)"
            >
              <template #item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="stratigraphicUnitResourceConfig.getCodeFn(item.raw)()"
                />
              </template>
            </autocomplete-api>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="anchor" @click="isDialogOpen = false">cancel</v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          @click="submitAndRefresh()"
          :disabled="v$.$invalid"
          >submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
