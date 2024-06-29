<script setup>
definePageMeta({
  middleware: ['acl'],
  voters: [ACL_VOTERS.HasRoleAdmin],
})
</script>

<template>
  <Suspense>
    <NuxtPage/>
  </Suspense>
</template>
