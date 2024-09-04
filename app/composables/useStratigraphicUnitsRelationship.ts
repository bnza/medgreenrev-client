import type { StratigraphicUnitRelationshipKey } from '~/lib/resources/vocabulary'

export const stratigraphicUnitsRelationshipHelperInjectionKey =
  Symbol() as InjectionKey<
    Awaited<ReturnType<typeof useStratigraphicUnitsRelationship>>
  >

export async function useStratigraphicUnitsRelationship(
  su: ApiAclItem<ApiResourceStratigraphicUnit>,
) {
  const sxSu = toRef(su)
  const { paginationOptions, fetchCollection, deleteItem, postItem } =
    await useResource<ApiResourceStratigraphicUnitRelationship>(
      'stratigraphicUnitsRelationships',
      { parent: { sxSU: sxSu.value.id }, resourceOperationType: 'collection' },
    )
  paginationOptions.itemsPerPage = -1

  const triggerRefreshCollection = ref(false)

  const selectedSuId: Ref<number> = ref(0)
  const selectedSuRef: Ref<ApiResourceStratigraphicUnit | undefined> =
    ref(undefined)
  const selectedSu = computed(() => selectedSuRef.value)
  watch(selectedSuId, async () => {
    selectedSuRef.value = selectedSuId.value
      ? await stratigraphicUnitRepository.$fetchItem(selectedSuId.value)
      : undefined
  })

  const stratigraphicUnitRepository =
    useNuxtApp().$api.getRepository<ApiResourceStratigraphicUnit>(
      'stratigraphicUnits',
    )

  const canUpdate = computed(() => sxSu.value._acl.canUpdate)
  const isLocked = ref(true)
  const isUpdatable = computed(() => !isLocked.value && canUpdate.value)

  const deletingRelation: Ref<
    ApiResourceStratigraphicUnitRelationship | undefined
  > = ref()
  const deleteRelationship = async () => {
    if (deletingRelation.value) {
      await deleteItem({ newItem: deletingRelation.value })
      deletingRelation.value = undefined
      triggerRefreshCollection.value = true
    }
  }

  const creatingRelationshipType: Ref<StratigraphicUnitRelationshipKey | ''> =
    ref('')

  return {
    sxSu,
    fetchCollection,
    triggerRefreshCollection,
    selectedSuId,
    selectedSu,
    canUpdate,
    isLocked,
    isUpdatable,
    deletingRelation,
    deleteRelationship,
    creatingRelationshipType,
    postItem,
  }
}
