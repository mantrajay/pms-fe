<template>
<div>
  <Header title="Logs" />
  <v-row class="mt-n5">
    <v-col
      cols="12"
      sm="12"
      md="12">
      <TableData />
    </v-col>
  </v-row>
</div>
</template>
<script>
import TableData from './components/table-chapters'
export default {
  name: 'Logs-List',
  components: {
    TableData
  }
}
</script>
