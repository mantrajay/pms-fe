<template>
  <div>
    <Header
      title="ACTIVITIES"
      @show="showCreate"
    />
    <v-row class="mt-n5">
      <v-col
        v-if="GET_AUTH.roleId == 1"
        cols="12"
        sm="12"
        md="12"
      >
        <TableData
          :reFetch="reFetch"
          @show="showUpdate"
          @event="reFetch = false"
        />
      </v-col>
      <v-col
        v-else
        cols="12"
        sm="12"
        md="12">
        <ActivityList :memberId="GET_AUTH.userId" />
      </v-col>
    </v-row>
    <CreateUpdateActivity
      v-if="showDialog"
      :activityId="activityId"
      :setting="setting"
      @close="showDialog = false"
      @event="reFetch = true, showDialog = false"
    />
  </div>
</template>
<script>
import TableData from './components/table-activities'
import CreateUpdateActivity from './components/create-update-activity'
import ActivityList from './components/member-activities'
export default {
  name: 'PatientList',
  components: {
    TableData,
    CreateUpdateActivity,
    ActivityList
  },
  data () {
    return {
      showDialog: false,
      reFetch: false,
      activityId: '',
      setting: 'create',
      memberId: ''
    }
  },

  methods: {
    showCreate () {
      this.showDialog = true
      this.setting = 'create'
    },

    showUpdate (id) {
      this.showDialog = true
      this.activityId = id
      this.setting = 'update'
    }
  }
}
</script>
