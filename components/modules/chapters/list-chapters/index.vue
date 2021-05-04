<template>
<div>
  <Header
    title="CHAPTERS"
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
  <CreateUpdateChapter
    v-if="showDialog"
    :chapterId="chapterId"
    @close="showDialog = false"
    :setting="setting"
    @event="reFetch = true, showDialog = false"/>
</div>
</template>
<script>
import TableData from './components/table-chapters'
import CreateUpdateChapter from './components/create-update-chapter'
export default {
  name: 'Chapter-List',
  components: {
    TableData,
    CreateUpdateChapter
  },
  data () {
    return {
      showDialog: false,
      reFetch: false,
      chapterId: '',
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
      this.chapterId = id
      this.setting = 'update'
    }
  }
}
</script>
