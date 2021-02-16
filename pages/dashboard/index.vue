<template>
  <v-container fluid>
    <Dashboard />
  </v-container>
</template>
<script>
import Dashboard from '@/components/modules/dashboard'
export default {
  middleware: 'routerGuard',
  components: {
    Dashboard
  }
}
</script>
