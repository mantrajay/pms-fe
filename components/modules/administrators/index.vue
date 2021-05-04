<template>
<div>
  <Header
    title="ADMINISTRATORS"
    btnLabel="Create User"
    @show="showRegistration"/>
  <v-row class="mt-n3">
    <v-col cols="12"
      sm="12"
      md="12">
      <TableData
        @show="showRegistration"
        @event="reFetch = false"
        :reFetch="reFetch"/>
    </v-col>
  </v-row>
  <CreateUpdate
    v-if="showDialog"
    :userId="userId"
    :setting="setting"
    @close="showDialog = false"
    @event="reFetch = true, showDialog = false"/>
</div>
</template>
<script>
import TableData from './components/table'
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
      userId: '',
      setting: ''
    }
  },

  methods: {
    showRegistration (id, setting) {
      this.showDialog = true
      this.userId = id
      this.setting = setting
    }
  }
}
</script>
