<template>
<div>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="70%">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="7"
            md="7">
            <h4>SETTLE ARREAR(S)</h4>
          </v-col>
          <v-col
            cols="12"
            sm="5"
            md="5"
            class="text-right">
              <v-btn
                color="primary"
                text
                @click="$emit('close')"
                v-if="!confirm.loading">
                Close
              </v-btn>
              <v-btn
                color="primary"
                elevation="0"
                :loading="confirm.loading"
                :disabled="confirm.loading"
                v-if="isBtnEnabled"
                @click="confirmSubmit">
                Submit
              </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text v-if="loading">
        <v-progress-linear
          color="primary"
          indeterminate
          rounded
          height="6"
        />
      </v-card-text>
      <v-card-text
        v-else
        class="mt-n5">
        <v-container
          class="dotted mt-4"
          fluid>
          <v-row
            class="mt-2"
            v-for="(item, index) in form"
            :key="index"
            :class="{'mt-n3': index > 0}">
            <v-col
              cols="12"
              md="3"
              sm="3"
              class="mt-n1">
              <h3>{{ items.membershipName }}</h3>
            </v-col>
            <v-col
              cols="12"
              md="2"
              sm="2"
              class="mt-n3">
              <h3>{{ item.year.value }}</h3>
              <p>{{ item.description.value }}</p>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="3"
              class="mt-n3">
              <v-text-field
                outlined
                v-model="item.amount.value"
                :class="{'text-input': item.amount.isEmpty}"
                @blur="validationKey(item.amount, 'Arrear amount')"
                dense
                label="Enter Amount *"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="3"
              md="3"
              class="mt-n3">
              <v-menu
                v-model="item.datePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="item.date.value"
                  :class="{'text-input': item.date.isEmpty }"
                  @blur="validationKey(item.date,  'Pay Date')"
                  outlined
                  dense
                  append-icon="mdi-calendar"
                  readonly
                  label="Select Date *"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
                <v-date-picker
                  v-model="item.date.value"
                  @input="item.datePicker = false, validationKey(item.date,  'Pay Date')"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <!-- <v-col
              cols="12"
              md="1"
              sm="1"
              class="mt-n2">
              <v-btn
                elevation="0"
                v-if="form.length > 1"
                @click="remove(index)"
                color="error"
                small>
                <v-icon>mdi-close-box</v-icon>
              </v-btn>
            </v-col> -->
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
  <AlertCallBack
    v-if="confirm.show"
    :callBack="confirm"
    @close="confirm.show = false"
    @event="submit"/>
</div>
</template>
<script>
export default {
  name: 'Create-Member-Transaction',
  props:{
    items: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      dialog: true,
      loading: false,
      yearList: [],
      form: [],
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Create Transaction',
        variant: 'primary'
      }
    }
  },

  computed: {
    isBtnEnabled () {
      let enable = true
      this.form.forEach(items => {
        Object.keys(items).forEach(index => {
          let value = items[index].value
          let required = items[index].required
          if (required) {
            if (!value) enable = false
          }
        })
      })
      return enable
    }
  },

  fetch () {
    this.getMembershipAmount()
  },

  methods: {
    getMembershipAmount () {
      this.loading = true
      let formData = new FormData()
      formData.append('membershipId', this.items.membershipId)
      formData.append('years', JSON.stringify(this.items.yearArrear))
      this.API_POST({ url: 'Members/fetchMembershipAmount', data: formData })
      .then(response => {
          let data = response.data
          this.form = data.map(items => {
            return {
              arrearId: this.iRules(items.id, true),
              // membershipId: this.iRules(items.membership_id, true),
              prcNo: this.iRules(this.items.prcNo, true),
              amount: this.iRules(items.amount, true),
              date: this.iRules('', true),
              datePicker: false,
              description: this.iRules(items.description, false),
              year: this.iRules(items.year, true),
            }
          })
        }).catch(error => {  })
        .finally( this.loading = false )
    },

    remove (index) {
      this.form.splice(index, 1)
    },

    confirmSubmit () {
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to settle these arrear(s)?`
      this.confirm.title = `Settle Arrear(s)`
    },

    submit () {
      this.confirm.loading = true
      let data = []
      this.form.map(items => {
        let payload = {}
        Object.keys(items).forEach(index => {
          if (index !== 'description' && index !== 'datePicker') {
            Object.assign(payload, { [index]: items[index].value});
          }
        })
        data.push(payload)
      })
      let formData = new FormData()
      formData.append('data', JSON.stringify(data))
      this.API_POST({url: `Members/settleArrear`, data: formData})
        .then(response => {
          this.$emit('event')
          this.$emit('close')
          this.SET_ALERT_SUCCESS(response.response)
        })
        .catch(error => {
          this.SET_ALERT_ERROR(error.message)
         })
        .finally(() => {
          this.confirm.show = false
          this.confirm.loading = false
        })
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
</style>