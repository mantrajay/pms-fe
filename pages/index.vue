<template>
  <Login />
</template>
<script>
import Login from '@/components/modules/login'
export default {
  middleware: 'routerGuard',
  components: {
    Login
  }
}
</script>
