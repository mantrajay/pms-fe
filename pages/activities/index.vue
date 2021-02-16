<template>
  <v-container fluid>
    <Activities class="mt-n4"/>
  </v-container>
</template>
<script>
import Activities from '@/components/modules/activities/list-activities'
export default {
  middleware: 'routerGuard',
  components: {
    Activities
  }
}
</script>
