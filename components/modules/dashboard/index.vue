<template>
<div>
  <Header
    class="mt-n4"
    title="PATIENT CHART"
    @show="showRegistration"/>
  <Charts class="mt-n3"/>
</div>
</template>
<script>
import Charts from './chart'
export default {
  name: 'Dashboard',
  components: {
    Charts
  }
}
</script>
