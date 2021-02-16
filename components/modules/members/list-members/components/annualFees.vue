<template>
  <v-dialog v-model="dialog"
    persistent
    max-width="70%">
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
          <v-row>
            <v-col
              cols="12"
              md="6"
              sm="6">
              <p><b>PRC Number:</b> {{ memberDetail.prcNo }}</p>
              <p class="mt-n2"><b>Member Name:</b>
                {{ memberDetail.last_name }}, {{ memberDetail.first_name }} {{ memberDetail.middle_name }}
              </p>
            </v-col>
            <v-col
              cols="12"
              md="6"
              sm="6">
              <p class="mt-n2"><b>Chapter:</b> {{ memberDetail.chapterName }}</p>
              <p class="mt-n2"><b>PRC Expiration:</b> {{ getLocalDate(memberDetail.prcExp) }}</p>
            </v-col>
          </v-row>
          <v-row class="mt-n8">
            <v-col
              cols="12"
              md="12"
              sm="12">
              <v-row class="pa-2">
                <v-col
                  cols="12"
                  md="2"
                  sm="2">
                  <h4>Membership</h4>
                </v-col>
                <v-col
                  cols="12"
                  md="1"
                  sm="1">
                  <h4>Year</h4>
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                  sm="2">
                  <h4>Annual Fee</h4>
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                  sm="2">
                  <h4>Total Paid</h4>
                </v-col>
                <v-col
                  cols="12"
                  md="2"
                  sm="2">
                  <h4>Status</h4>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                  sm="3">
                  <h4>Description</h4>
                </v-col>
              </v-row>
              <v-expansion-panels class="mt-n3">
                <v-expansion-panel
                  v-for="(item, i) in annualFees"
                  :key="i"
                >
                  <v-expansion-panel-header>
                    <v-row>
                      <v-col
                        cols="12"
                        md="2"
                        sm="2">
                        {{ item.name }}
                      </v-col>
                      <v-col
                        cols="12"
                        md="1"
                        sm="1">
                        {{ item.year }}
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                        sm="2">
                        ₱{{ formatMoney(item.amount) }}
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                        sm="2">
                        ₱{{ totalPaid(item.annualfees) }}
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                        sm="2">
                        {{
                          parseInt(item.annualfees) < parseInt(item.amount) && !item.annualfees
                          ? 'Partial'
                          : !item.amount
                            ? 'Unpaid'
                            : 'Paid' }}
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                        sm="3">
                        {{ item.description }}
                      </v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row class="mt-n4">
                      <v-col
                        cols="12"
                        md="3"
                        sm="3">
                        <h4>Amount</h4>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                        sm="3">
                        <h4>Date Paid</h4>
                      </v-col>
                    </v-row>
                    <v-row
                      class="mt-n2"
                      v-for="(items, index) in item.annualfees"
                      :key="index">
                      <v-col
                        cols="12"
                        md="3"
                        sm="3">
                        ₱{{ formatMoney(items.amount) }}
                      </v-col>
                      <v-col
                        cols="12"
                        md="9"
                        sm="9">
                        {{ getLocalDate(items.date_paid, true) }}
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
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
        { text: 'Code', value: 'code' },
        { text: 'Name', value: 'name' },
        { text: 'Points', value: 'points' },
        { text: 'Start Time', value: 'start_time' },
        { text: 'End Time', value: 'end_time' }
      ],
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
          this.annualFees = response.data
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