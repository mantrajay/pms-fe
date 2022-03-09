<template>
  <v-container fluid>
    <ElectionDetails class="mt-n4"/>
  </v-container>
</template>
<script>
import ElectionDetails from '@/components/modules/election/details'
export default {
  middleware: 'routerGuard',
  components: {
    ElectionDetails
  }
}
</script>
