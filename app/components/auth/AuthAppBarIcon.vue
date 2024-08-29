<script setup>
const {status} = useAuth()
const AuthUserMenu = resolveComponent('AuthUserMenu')
const AuthLoginIcon = resolveComponent('AuthLoginIcon')
const authComponent = computed(() =>
  status.value === 'authenticated' ? AuthUserMenu : AuthLoginIcon,
)
</script>

<template>
  <component :is="authComponent"/>
</template>
