<template>
  <v-container fluid>
    <Administrators class="mt-n4"/>
  </v-container>
</template>
<script>
import Administrators from '@/components/modules/administrators'
export default {
  middleware: 'routerGuard',
  components: {
    Administrators
  }
}
</script>
