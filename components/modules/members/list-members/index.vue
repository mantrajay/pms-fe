<template>
<div>
  <Header
    title="MEMBER LIST"
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
  <CreateUpdateMembers
    v-if="showDialog"
    :memberId="memberId"
    @close="showDialog = false"
    :setting="setting"
    @event="reFetch = true, showDialog = false"/>
</div>
</template>
<script>
import TableData from './components/table-members'
import CreateUpdateMembers from './components/create-update-members'
import { mapGetters } from 'vuex'
export default {
  name: 'Patient-List',
  components: {
    TableData,
    CreateUpdateMembers
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
      this.setting = 'create'
    },

    showUpdate (id) {
      this.showDialog = true
      this.memberId = id
      this.setting = 'update'
    }
  }
}
</script>
