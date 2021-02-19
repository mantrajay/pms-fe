<template>
<div>
  <Header
    title="ANNUAL LIST"
    @show="showCreate"/>
  <v-row class="mt-n5">
    <v-col
      class=""
      v-if="GET_AUTH.roleId == 1"
      cols="12"
      sm="12"
      md="12">
      <TableData
        @show="showUpdate"
        @event="reFetch = false"
        :reFetch="reFetch"/>
    </v-col>
    <v-col
      v-else
      cols="12"
      sm="12"
      md="12">
      <MemberAnnualTransaction :memberId="GET_AUTH.userId"/>
    </v-col>
  </v-row>
  <CreateUpdateAnnual
    v-if="showDialog"
    :annualId="annualId"
    @close="showDialog = false"
    :setting="setting"
    @event="reFetch = true, showDialog = false"/>
</div>
</template>
<script>
import TableData from './components/table-annuals'
import CreateUpdateAnnual from './components/create-update-annual'
import MemberAnnualTransaction from './components/member-annual-transaction'
export default {
  name: 'Annual-List',
  components: {
    TableData,
    CreateUpdateAnnual,
    MemberAnnualTransaction
  },
  data () {
    return {
      showDialog: false,
      reFetch: false,
      annualId: '',
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
      this.annualId = id
      this.setting = 'update'
    }
  }
}
</script>
