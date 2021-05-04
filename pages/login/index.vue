<template>
  <Login />
</template>
<script>
import Login from '@/components/modules/login'
export default {
  middleware: 'routerGuard',
  components: {
    Login
  },

  created () {
    this.$store.dispatch('common/API_GET', {
      url: 'Auth/checkToken'
    })
    .then(response => {
      this.$router.push('/activities')
    })
  }
}
</script>
