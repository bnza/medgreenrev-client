<script setup lang="ts">
import useLoginRedirectFromState from '~/composables/states/useLoginRedirectFromState'

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/settings/me',
  },
})
const route = useRoute()
const redirectFrom = useLoginRedirectFromState()
const { mode } = useDataUiModeState()
if (!redirectFrom.value) {
  redirectFrom.value = route.redirectedFrom?.fullPath || '/'
  mode.value = 'login'
} else {
  redirectFrom.value = ''
}
</script>

<template></template>
