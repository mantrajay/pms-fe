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
              sm="3"
              md="3">
              <h3>{{ date }}</h3>
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
      positions: [
        {
          position: 'President',
          nominess: [
            { id: 1, name: 'test' }
          ]
        }
      ]
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
  }
}
</script>
