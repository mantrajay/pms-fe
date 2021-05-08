<template>
  <v-container fluid>
    <Logs class="mt-n4"/>
  </v-container>
</template>
<script>
import Logs from '@/components/modules/logs'
export default {
  middleware: 'routerGuard',
  components: {
    Logs
  }
}
</script>
