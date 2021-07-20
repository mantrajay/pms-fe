<template>
  <div>
    <Header title="Logs" />
    <v-row class="mt-n5">
      <v-col
        cols="12"
        sm="6"
        md="6">
        <TableMemberHistory />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6">
        <TableAdminHistory />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import TableMemberHistory from './components/member-history'
import TableAdminHistory from './components/admin-history'
export default {
  name: 'Logs-List',
  components: {
    TableMemberHistory,
    TableAdminHistory
  }
}
</script>
