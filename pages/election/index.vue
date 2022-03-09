<template>
  <v-container fluid>
    <Election class="mt-n4"/>
  </v-container>
</template>
<script>
import Election from '@/components/modules/election/list-election'
export default {
  middleware: 'routerGuard',
  components: {
    Election
  }
}
</script>
