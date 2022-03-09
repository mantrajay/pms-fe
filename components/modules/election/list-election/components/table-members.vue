<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
      md="12"
      v-if="GET_AUTH.roleId == 1">
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
              <!-- <v-text-field
                v-debounce:300="search"
                append-icon="mdi-magnify"
                label="Search"
                dense
                placeholder="Search election..."
                outlined
                hide-details
              ></v-text-field> -->
            </v-col>
            <v-col
              cols="12"
              md="7"
              sm="7"
              class="text-right">
              <v-btn
                elevation="0"
                color="primary"
                @click="$emit('show')">
                <v-icon>mdi-plus</v-icon>
                Create Election
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
            :items-per-page="100"
            :headers="headers"
            :items="election.data"
            :loading="election.loading"
            hide-default-footer
            @click:row="electionDetails">
            <template v-slot:item.actions="{ item }">
              <v-btn
                v-if="GET_AUTH.userId == 257"
                elevation="0"
                @click.stop
                color="primary"
                small>
                <v-icon>mdi-brush</v-icon>
              </v-btn>                
              <v-btn
                v-if="GET_AUTH.userId == 257"
                elevation="0"
                @click.stop
                @click="deleteConfirm(item.id)"
                color="error"
                small>
                <v-icon>mdi-eraser</v-icon>
              </v-btn>            
              <v-btn
                v-if="GET_AUTH.roleId == 2"
                elevation="0"
                @click.stop
                @click="voteNow(item)"
                :color="item.doneVote ? 'success' : 'primary'"
                small>
                <div v-if="!item.doneVote">
                  <v-icon>mdi-account-multiple-plus-outline</v-icon>
                  Vote Now
                </div>
                <div v-else>
                  <v-icon>mdi-format-list-bulleted-square</v-icon>
                  Vote Details
                </div>
              </v-btn>            
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                small
                class="white--text"
                :color="
                 item.status === 'Soon'
                  ? 'indigo'
                  : item.status === 'Finished'
                   ? 'success'
                   : 'primary'
                ">
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
          <Pagination
            @go-to-page="fetchElections"
            :currentPage="pager.currentPage"
            :length="pager.totalPage" />
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Election-Candidate-List',
  props: {
    reFetch: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      electionId: '',
      election: {
        data: [], 
        keyword: '', 
        loading: false
      },
      pager: {
        pageNo: 1,
        totalPage: 1,
        limit: 15
      },
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Delete Election',
        variant: 'error'
      }
    }
  },
  computed: {
    headers() {
      let headerList = [
        { text: 'Name', value: 'name' },
        { text: 'Year', value: 'year' },
        { text: 'Election Date', value: 'date' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'actions'}
      ]
      return headerList
    }
  },

  watch: {
    reFetch (val) {
      if (val) this.fetchElections()
    }
  },

  fetch () {
    this.fetchElections()
  },

  methods: {
    deleteSubmit () {
      this.confirm.loading = true
      this.API_POST({ url: `Members/removeMembers/${this.electionId}` })
        .then(response => {
          this.SET_ALERT_SUCCESS(response.response)
          this.fetchElections(1)
          this.confirm.show = false
        }).catch(error => { this.SET_ALERT_ERROR(error.response) })
        .finally(() => {
          this.confirm.loading = false
        })
    },

    voteNow(args) {
      this.$router.push(`/election/vote?id=${args.id}`)
    },

    electionDetails(args) {
      if(args.status === 'Finished' && this.GET_AUTH.roleId == 2) {
        this.$router.push(`/election/details?id=${args.id}`)
        return
      }
      if(this.GET_AUTH.roleId == 1) {
        this.$router.push(`/election/details?id=${args.id}`)
      }
    },

    async fetchElections () {
      try {
        let response = await this.API_POST({ url: '/Election' })
        this.election.data = response.data.map((item, index)  => {
          return {
            id: item.id,
            year: this.dateFormat(item.date, 'YYYY'),
            date: this.dateFormat(item.date, 'll'),
            name: item.name,
            status: item.status,
            doneVote: item.doneVote,
          }
        })
      } catch (error) {
        this.errorHandle(error)
      } finally {this.election.loading = false }
    }
  }
}
</script>
<style scoped>
  .unsettled {
    cursor: pointer;
  }
  .updated {
    color: #4caf50;
  }
</style>