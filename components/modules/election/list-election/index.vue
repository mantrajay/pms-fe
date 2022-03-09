<template>
<div>
  <Header title="ELECTION LIST" />
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
  <CreateUpdate
    v-if="showDialog"
    :memberId="memberId"
    @close="showDialog = false"
    :setting="setting"
    @event="reFetch = true, showDialog = false"/>
</div>
</template>
<script>
import TableData from './components/table-members'
import CreateUpdate from './components/create-update'
export default {
  name: 'Patient-List',
  components: {
    TableData,
    CreateUpdate
  },
  data () {
    return {
      showDialog: false,
      reFetch: false,
      memberId: '',
      setting: 'create'
    }
  },

  methods: {
    showCreate () {
      this.showDialog = true
      this.setting = 'update'
    },

    showUpdate (id) {
      this.showDialog = true
      this.memberId = id
      this.setting = 'update'
    }
  }
}
</script>
