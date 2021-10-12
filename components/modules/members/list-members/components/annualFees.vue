<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
    :max-width="$vuetify.breakpoint.lg ? '60%' : '100%'">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h4>MEMBER ANNUAL FEES</h4>
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
        <div v-if="loading">
          <v-row>
            <v-col class="text-center">
              <v-progress-linear
                :width="3"
                large
                color="primary"
                indeterminate
              />
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <v-row class="mt-1">
             <v-col
              cols="12"
              md="6"
              sm="6">
              <div class="ml-2">
                <p><b>PRC Number:</b> {{ memberDetail.prcNumber }}</p>
                <p class="mt-n2"><b>Member Name:</b>
                  {{ memberDetail.fullName }}
                </p>
              </div>
            </v-col>
            <v-col
              cols="12"
              md="6"
              sm="6">
              <div class="ml-2">
                <p class="mt-n2"><b>Chapter:</b> {{ memberDetail.chapterName }}</p>
                <p class="mt-n2"><b>PRC Expiration:</b> {{ memberDetail.prcExp }}</p>
              </div>
            </v-col>
          </v-row>
          <v-row class="mt-1">
            <v-col
              class="mt-n2"
              cols="12"
              md="12"
              sm="12">
              <v-data-table
                :headers="headers"
                :items="annualFees"
                :items-per-page="15"
                :loading="loading">
                <template v-slot:item.status="{ item }">
                  <v-chip color="success">
                    {{ 
                      parseInt(item.annualfees) < parseInt(item.amount) && !item.annualfees
                        ? 'Partial'
                        : !item.amount
                          ? 'Unpaid'
                          : 'Paid'
                    }}
                  </v-chip>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-card-text>
  </v-card>
</v-dialog>
</template>
<script>
export default {
  name: 'Member-AnnualFees',
  props:{
    memberId: {
      type: String,
      default: ''
    },

    memberDetail: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      dialog: true,
      loading: false,
      annualFees: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Year', value: 'year' },
        { text: 'Amount', value: 'amount' },
        { text: 'Date', value: 'date' },
        { text: 'Status', value: 'status' }
      ]
    }
  },

  fetch () {
    this.fetchMemberAnnualFees()
  },

  methods: {
    fetchMemberAnnualFees () {
      this.loading = true
      this.API_POST({ url: 'Members/fetchMemberAnnualFees/' + this.memberId})
        .then(response => {
            this.annualFees = response.data.membersAnnuals.map(item => {
            return {
              name: item.name,
              amount: this.formatMoney(item.annualfees[0].amount ),
              status: item.status,
              year: item.year,
              date: this.getLocalDate(item.annualfees[0].date_paid, true).split('-')[0]
            }
          })
        }).catch(error => {  })
        .finally(this.loading = false)
    },

    totalPaid (items) {
      let total = 0
      items.forEach(values => {
        total+=parseInt(values.amount)
      })
      return this.formatMoney(total)
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