<template>
<div>
  <Header :title="isVoted ? 'ELECTION VOTED DETAILS' : 'ELECTION VOTING DETAILS'"/>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12"
            v-if="isVoted">
            <p class="success--text">
              <v-icon color="success">mdi-thumb-up</v-icon>
              You have already voted your preferred candidates.
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            md="4">
            <h2>{{ name }}</h2>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            md="4">
            <h2>{{ date }}</h2>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12">
            <h2 class="mb-n1">Component Society Officers:</h2>
          </v-col>
        </v-row>
        <v-row
          v-for="(item, index) in form"
          :key="index"
          class="dotted">
          <v-col
            cols="12"
            sm="12"
            md="12">
            <h2
              v-if="item.chapterId != 0"
              class="mt-4 mb-2">
              Chapter
            </h2>
            <h3>{{item.name}}</h3>
            <h5>Candidates:
              <span
                v-if="isVoted"
                class="error--text">
                {{item.memberId ? '' : 'No vote for this position.'}}
              </span>
            </h5>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="mt-n9">
            <v-radio-group
              v-model="item.memberId"
              column>
              <v-radio
                v-for="(candidate, keys) in item.nominees"
                :key="keys"
                :readonly="isVoted"
                :color="isVoted ? 'success' : 'primary'"
                :label="`${candidate.name}`"
                :value="candidate.id"/>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="3"
            md="3"
            v-if="!isVoted">
            <v-btn
              block
              elevation="0"
              @click="confirmSubmit"
              color="primary">
              <v-icon>mdi-thumb-up-outline</v-icon>
               Submit
            </v-btn>   
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
  <AlertCallBack
    v-if="confirm.show"
    :callBack="confirm"
    @close="confirm.show = false"
    @event="submitVotes"/>
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
      isVoted: true,
      form: [
        {
          position: 'President',
          nominess: [
            { id: 1, name: 'test' }
          ]
        }
      ],
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Election Voting',
        variant: 'error'
      }
    }
  },

  fetch() {
    this.fetchElectionDetails()
  },

  methods: {
    confirmSubmit () {
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to submit your votes? this process cannot be undone?`
      this.confirm.title = 'Confirm Votes'
    },

    submitVotes() {
      this.confirm.loading = true
      let formData = new FormData()
      this.form.forEach(items => {
        let votes = {}
        Object.assign(votes, {
          electionId: items.electionId,
          memberId: items.memberId,
          positionNomineeId: items.positionNomineeId
        })
        formData.append('form[]', JSON.stringify(votes))
      })
      formData.append('electionId', this.id)
      this.API_POST({ url: `Election/electionVotes`, data: formData})
        .then(response => {
          this.SET_ALERT_SUCCESS(response.response)
          this.fetchElectionDetails()
        }).catch(error => {
          this.SET_ALERT_ERROR(error.response)
        })
        .finally(() => { this.confirm.show = false })
    },

    fetchElectionDetails () {
      this.API_POST({ url: `Election/fetchById/${this.$route.query.id}`})
        .then(response => {
          this.id = response.data.id
          this.name = response.data.name
          this.isVoted = response.data.isVoted
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
            } else if (this.GET_AUTH.chapterId == item.chapterId || this.GET_AUTH.chapterId < 9 && item.chapterId == 0) {
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
          this.form = candidates
        }).catch(error => {  })
        .finally(() => { this.loading = false })
    },
  }
}
</script>
