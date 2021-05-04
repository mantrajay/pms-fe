<template>
<div>
  <Header
    title="TYPES OF MEMBERSHIP"
    @show="showCreate"/>
  <v-row class="mt-n5">
    <v-col
      cols="12"
      sm="12"
      md="12">
      <TableData
        @show="showUpdate"
        @event="reFetch = false"
        :reFetch="reFetch"/>
    </v-col>
  </v-row>
  <CreateUpdateMembership
    v-if="showDialog"
    :membershipId="membershipId"
    @close="showDialog = false"
    :setting="setting"
    @event="reFetch = true, showDialog = false"/>
</div>
</template>
<script>
import TableData from './components/table-memberships'
import CreateUpdateMembership from './components/create-update-membership'
export default {
  name: 'Arrear-List',
  components: {
    TableData,
    CreateUpdateMembership
  },
  data () {
    return {
      showDialog: false,
      reFetch: false,
      membershipId: '',
      setting: 'create'
    }
  },

  methods: {
    showCreate () {
      this.showDialog = true
      this.setting = 'create'
    },

    showUpdate (id) {
      this.showDialog = true
      this.membershipId = id
      this.setting = 'update'
    }
  }
}
</script>
