<template>
<div>
  <Header title="ELECTION RESULT"/>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12">
            <h2>Component Society Officers:</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="3"
            md="3">
            <h3>{{ name }}</h3>
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="5">
            <h3>{{ date }}</h3>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            md="4"
            v-if="GET_AUTH.roleId == 1">
            <v-btn
              elevation="0"
              color="primary"
              @click="showVotersList">
              <v-icon>mdi-format-list-bulleted-square</v-icon>
              List of voters
            </v-btn>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                :color="
                 status === 'soon'
                  ? 'indigo'
                  : status === 'finished'
                   ? 'success'
                   : 'primary'
                  "
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                <v-icon>mdi-update</v-icon>
                {{ status }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  link
                  v-for="(item, index) in statusList"
                  :key="index"
                  @click="confirmChangehangeStatus(item.title)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
        <v-row
          v-for="(item, index) in positions"
          :key="index"
          class="dotted">
          <v-col
            cols="12"
            sm="12"
            md="12">
            <h2
              v-if="index === 5"
              class="mt-2 mb-4">
              Chapter
            </h2>
            <h3>{{item.name}}</h3>
            <h5>Candidates:</h5>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="mt-n5">
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6">
                <div
                  v-for="(selected, index) in item.nominees"
                  :key="index"
                  class="ma-1"
                >
                  <v-chip>{{selected.name}}</v-chip>
                  <v-chip :color="counterColor(item.nominees).id === selected.id && selected.voteCount ? 'success' : 'primary'">
                    {{ selected.voteCount }} Votes
                  </v-chip>
                  <span
                    class="success--text"
                    v-if="counterColor(item.nominees).id === selected.id && selected.voteCount">
                    <b>(Winner)</b>
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
  <AlertCallBack
    v-if="confirm.show"
    :callBack="confirm"
    @close="confirm.show = false"
    @event="submitChangeStatus"/>
</div>
</template>
<script>
export default {
  name: 'Election-Details',
  data () {
    return {
      id: '1',
      name: 'Election 2022',
      date: '',
      status: '',
      positions: [
        {
          position: 'President',
          nominess: [
            { id: 1, name: 'test' }
          ]
        }
      ],
      statusName: '',
      statusList: [
        { title: 'Soon' },
        { title: 'Ongoing' },
        { title: 'Finished' },
      ],
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Change Election Status',
        variant: 'error'
      }
    }
  },

  fetch() {
    this.fetchElectionDetails()
  },

  methods: {
    counterColor (args) {
      return args.reduce((p, c) => p.voteCount > c.voteCount ? p : c)
    },

    fetchElectionDetails () {
      this.API_POST({ url: `Election/fetchById/${this.$route.query.id}`})
        .then(response => {
          this.id = response.data.id
          this.name = response.data.name
          this.status = response.data.status
          this.date = this.dateFormat(response.data.date, 'll')
          let candidates = []
          response.data.positionsNeminess.map(item => {
            if (this.GET_AUTH.chapterId == 9 && item.chapterId == 0) {
              candidates.push({
                chapterId: item.chapterId,
                electionId: item.electionId,
                memberId: item.memberId,
                name: item.name,
                nominees: item.nominees,
                positionNomineeId: item.positionNomineeId
              })
            } else if (this.GET_AUTH.chapterId == item.chapterId || this.GET_AUTH.roleId == 1 && item.chapterId >= 0) {
              candidates.push({
                chapterId: item.chapterId,
                electionId: item.electionId,
                memberId: item.memberId,
                name: item.name,
                nominees: item.nominees,
                positionNomineeId: item.positionNomineeId
              })
            } else if (this.GET_AUTH.chapterId == item.chapterId || this.GET_AUTH.roleId == 2 && item.chapterId == 0) {
              candidates.push({
                chapterId: item.chapterId,
                electionId: item.electionId,
                memberId: item.memberId,
                name: item.name,
                nominees: item.nominees,
                positionNomineeId: item.positionNomineeId
              })
            }
          })
          this.positions = candidates
        }).catch(error => {  })
        .finally(() => { this.loading = false })
    },

    showVotersList () {
      this.$router.push(`/election/voters?id=${this.$route.query.id}`)
    },

    confirmChangehangeStatus(args) {
      this.statusName = args
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to change the election status into (${args})?`
    },

    submitChangeStatus() {
      let data = new FormData()
      data.append('id', this.$route.query.id)
      data.append('status', this.statusName)
      this.confirm.loading = true
      this.API_POST({ url: `Election/changeStatus`, data: data })
        .then(response => {
          this.confirm.show = false
          this.SET_ALERT_SUCCESS(response.response)
          this.fetchElectionDetails()
        }).catch(error => { this.SET_ALERT_ERROR(error.response) })
        .finally(() => { this.confirm.loading = false })
    }
  }
}
</script>
