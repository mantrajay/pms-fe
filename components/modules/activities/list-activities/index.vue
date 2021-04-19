<template>
<div>
  <Header
    title="ACTIVITY LIST"
    @show="showCreate"/>
  <v-row class="mt-n5">
    <v-col
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
      <ActivityList :memberId="GET_AUTH.userId" />
    </v-col>
  </v-row>
  <CreateUpdateActivity
    v-if="showDialog"
    :activityId="activityId"
    @close="showDialog = false"
    :setting="setting"
    @event="reFetch = true, showDialog = false"/>
  <UserInfo
    :memberId="GET_AUTH.userId"
    v-if="GET_AUTH.isInfoUpdated"/>
</div>
</template>
<script>
import TableData from './components/table-activities'
import CreateUpdateActivity from './components/create-update-activity'
import ActivityList from './components/member-activities'
import UserInfo from './components/user-info'
export default {
  name: 'Patient-List',
  components: {
    TableData,
    CreateUpdateActivity,
    ActivityList,
    UserInfo
  },
  data () {
    return {
      showDialog: false,
      reFetch: false,
      activityId: '',
      setting: 'create',
      isInfoUpdated: false,
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
     