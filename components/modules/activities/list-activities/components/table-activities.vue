<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
      md="12">
      <v-card
        elevation="0">
        <v-container
          class="mt-n1"
          fluid>
          <v-row>
            <v-col
              cols="12"
              sm="5"
              md="5">
              <v-text-field
                v-debounce:300="search"
                append-icon="mdi-magnify"
                label="Search"
                dense
                placeholder="Search activities..."
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col
              v-if="GET_AUTH.roleId == 1"
              cols="12"
              md="7"
              sm="7"
              class="text-right">
              <v-btn
                elevation="0"
                color="primary"
                @click="$emit('show')">
                <v-icon>mdi-plus</v-icon>
                Create Activity
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12"
      sm="12"
      md="12"
      class="mt-n3">
      <v-card elevation="0">
        <v-container fluid>
          <v-data-table
            class="pa-3"
            :headers="tableHeader"
            :items="activities.data"
            :items-per-page="15"
            :loading="activities.loading">
            <template v-slot:item.actions="{ item }">
              <div class="d-flex">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      @click="$emit('show', item.id)"
                      color="primary"
                      class="ma-1"
                      small>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Update</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      small
                      color="indigo"
                      class="white--text ma-1"
                      @click="showSerach = true, activityId = item.id">
                      <v-icon>mdi-briefcase-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>Assign Members</span>
                </v-tooltip>
              </div>
            </template>
            <template v-slot:item.points="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="ma-2"
                    color="primary"
                    outlined>
                    {{ item.points }}
                  </v-chip>
                </template>
                <span>Activity points {{ item.points }}</span>
              </v-tooltip>
            </template>
            <template v-slot:item.countAttendees="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    color="success"
                    @click="activityId = item.id, showAttendees = true">
                    {{ item.countAttendees }}
                  </v-chip>
                </template>
                <span>Number of attendees {{ item.countAttendees }}</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-col>
    <SearchMembers
      v-if="showSerach"
      :activityId="activityId"
      @close="closeMembers"/>
    <Attendees
      v-if="showAttendees"
      @close="showAttendees = false"
      :activityId="activityId"/>
  </v-row>
</template>
<script>
import Attendees from './attendees.vue'
export default {
  name: 'Activity-List',
  components: {
    Attendees
  },
  props: {
    reFetch: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      activities: {
        data: [], 
        keyword: '', 
        loading: false
      },
      pager: {
        pageNo: 1,
        totalPage: 1,
        limit: 5000
      },
      activityId: '',
      showAttendees: false,
      showSerach: false
    }
  },

  computed: {
    tableHeader () {
      if (this.GET_AUTH.roleId == 1) {
        return [
          { text: 'Code', value: 'code' },
          { text: 'Name', value: 'name' },
          { text: 'Points', value: 'points' },
          { text: 'Attendees', value: 'countAttendees' },
          { text: 'Start Time', value: 'start_time' },
          { text: 'End Time', value: 'end_time' },
          { text: 'Action', value: 'actions'}
        ]
      } else {
        return [
          { text: 'Code', value: 'code' },
          { text: 'Name', value: 'name' },
          { text: 'Points', value: 'points' },
          { text: 'Start Time', value: 'start_time' },
          { text: 'End Time', value: 'end_time' },
        ]
      }
    }
  },

  watch: {
    reFetch (val) {
      if (val) this.fetchActivities()
    }
  },

  fetch () {
    this.fetchActivities()
  },

  methods: {
    search (search) {
      this.activities.keyword = search
      this.fetchActivities(1)
    },

    searchParams (pageNo) {
      return this.formParams({
        keyword: this.activities.keyword,
        currentPage: pageNo,
        limit: this.pager.limit
      })
    },

    async fetchActivities (pageNo) {
      this.pager.pageNo = pageNo || this.pager.pageNo
      this.activities.loading = true
      try {
        let response = await this.API_POST({
          url: '/Activities',
          data: this.searchParams(this.pager.pageNo)
        })
        this.activities.data = []
        this.activities.data = response.data
        this.pager.totalPage = response.totalPage
        this.$emit('event')
      } catch (error) {
        this.errorHandle(error)
      } finally {this.activities.loading = false }
    },

    closeMembers () {
      this.showSerach = false
      this.fetchActivities()
    }
  }
}
</script>
