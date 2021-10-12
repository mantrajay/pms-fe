<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
    :max-width="$vuetify.breakpoint.lg ? '70%' : '100%'">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h4>MEMBER DETAILS</h4>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="text-right">
              <v-btn
                color="primary"
                text
                @click="$emit('close')">
                Close
              </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="mt-n5">
       <v-container
        class="dotted mt-4"
        fluid>
        <v-data-table
          class="pa-3"
          :headers="headers"
          :items="memberDetails"
          :loading="loading"
          hide-default-footer>
        </v-data-table>
      </v-container>
    </v-card-text>
  </v-card>
</v-dialog>
</template>
<script>
export default {
  name: 'Member-Detail',
  props:{
    memberId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      dialog: true,
      loading: false,
      memberDetails: [],
      headers: []
    }
  },

  fetch () {
    this.fetchMemberDetails()
  },

  methods: {
    fetchMemberDetails () {
      this.loading = true
      let formData = new FormData()
      formData.append('id', this.memberId)
      formData.append('type', 'member')
      this.API_POST({ url: 'Members/fetchById', data: formData})
        .then(response => {
          Object.keys(response.data.member).forEach(index => {
            this.headers.push({text: index, value: index})
          })
          console.log(this.headers)
          this.memberDetails = [response.data.member]
        }).catch(error => {  })
        .finally(this.loading = false)
    }
  }
}
</script>
<style scoped>
.dotted {
  border-top: 2px #7777 dotted !important;
}
h4 {
  color: #686565;
}
.points {
  padding: 10px 17px;
  background-color: #4caf50;
  color: #fff;
  border-radius: 25px;
}
</style>