<template>
<div>
  <Header
    title="OTHER FEES"
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
  <CreateUpdateAnnual
    v-if="showDialog"
    :otherFeesId="otherFeesId"
    @close="showDialog = false"
    :setting="setting"
    @event="reFetch = true, showDialog = false"/>
</div>
</template>
<script>
import TableData from './components/table-other-fees'
import CreateUpdateAnnual from './components/create-update-other-fees'
export default {
  name: 'Other-Fees-List',
  components: {
    TableData,
    CreateUpdateAnnual
  },
  data () {
    return {
      showDialog: false,
      reFetch: false,
      otherFeesId: '',
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
      this.otherFeesId = id
      this.setting = 'update'
    }
  }
}
</script>
