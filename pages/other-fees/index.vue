<template>
  <v-container fluid>
    <OtherFees class="mt-n4"/>
  </v-container>
</template>
<script>
import OtherFees from '@/components/modules/other-fees/list-other-fees'
export default {
  middleware: 'routerGuard',
  components: {
    OtherFees
  }
}
</script>
