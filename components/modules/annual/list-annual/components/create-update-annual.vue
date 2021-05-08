<template>
<div>
  <v-dialog v-model="dialog"
    persistent
    max-width="80%">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="7"
            md="7">
            <h4>{{ arrears ? 'UPDATE' : 'CREATE'}} ANNUAL(S)</h4>
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
                {{ arrears ? 'Update' : 'Create'}}
              </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text v-if="loadingMembership">
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
            v-for="(items, index) in form"
            :key="index"
            :class="{'mt-n3': index > 0}">
            <v-col
              cols="12"
              :md="4"
              :sm="4"
              class="mt-n3">
              <v-text-field
                outlined
                :readonly="!arrears"
                v-model="items.membership.value"
                :class="{'text-input': items.membership.isEmpty, 'view-only': setting === 'view'}"
                @blur="validationKey(items.membership, 'Arrear arrear')"
                dense
                label="Mermbership Name"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              :md="4"
              :sm="4"
              class="mt-n3">
              <v-text-field
                outlined
                v-model="items.amount.value"
                :disabled="setting === 'view'"
                :class="{'text-input': items.amount.isEmpty, 'view-only': setting === 'view'}"
                @blur="validationKey(items.amount, 'Arrear amount')"
                dense
                @keypress="integerOnly($event)"
                label="Enter Amount *"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              :md="3"
              :sm="3"
              class="mt-n3">
              <v-select
                :items="yearList"
                outlined
                dense
                label="Select Year"
                v-model="items.year.value"
                :class="{'text-input': items.year.isEmpty, 'view-only': setting === 'view'}"
                @blur="validationKey(items.year, 'Year')"
                @change="changeDate(index, items.year.value)"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              :md="1"
              :sm="1"
              class="mt-n2">
              <v-btn
                elevation="0"
                v-if="form.length > 1"
                @click="removeMembership(index)"
                color="error"
                small>
                <v-icon>mdi-close-box</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <Creator :items="creator"/>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
  <AlertCallBack
    v-if="confirm.show"
    :callBack="confirm"
    @close="confirm.show = false"
    @event="submit"/>
  <AlertData
    v-if="alert.show"
    :alert="alert"
    @close="alert.show = false" />
</div>
</template>
<script>
export default {
  name: 'Create-Annual',
  props:{
    arrears: {
      type: Object,
      default: ''
    },
    setting: {
      type: String,
      default: 'create'
    }
  },

  data() {
    return {
      dialog: true,
      loading: false,
      loadingMembership: false,
      loadingMembers: false,
      year: false,
      yearList: [],
      membershipList: [],
      form: [],
      memberList: [],
      alert: {
        data: [],
        message: '',
        show: false,
        variant: 'error',
        title: 'Error'
      },
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Create Arrear',
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
    if (this.arrears) this.fetchArrears()
    else this.getMemberships()
    this.generateArrayOfYears() // Mixins
  },

  methods: {
    getMemberships () {
      this.loadingMembership = true
      this.API_POST({ url: 'Common/getMemberships' })
        .then(response => {
          let data = response.data
          data.forEach(items => {
            this.form.push({
              membershipId: this.iRules(items.id, true),
              membership: this.iRules(items.name, true),
              amount: this.iRules('', true),
              description: this.iRules('', false),
              year: this.iRules(new Date().getFullYear(), true)
            })
          })
        }).catch(error => {  })
        .finally( this.loadingMembership = false )
    },

    removeMembership (index) {
      this.form.splice(index, 1)
    },

    fetchArrears () {
      let formData = new FormData()
      formData.append('membershipId', this.arrears.membership_id)
      formData.append('years', this.arrears.year)
      this.API_POST({ url: 'Arrears/fetchArrearsByYear', data: formData})
        .then(response => {
          let data = response.data.arrears
          this.setForm(data)
          let creator = response.data.creator
          this.creator = {
            createdBy: `${creator.creator.firstName} ${creator.creator.lastName}`,
            createdAt: creator.createdAt
          }
        }).catch(error => {  })
        .finally(this.loading = false)
    },

    changeDate (index, date) {
      this.form.map((items, key) => {
        if (key !== index) return items.year.value = date
      })
    },

    setForm (data = {}) {
      data.forEach(items => {
        this.form.push({
          id: this.iRules(items.id, true),
          membershipId: this.iRules(items.membership_id, true),
          membership: this.iRules(items.name, true),
          amount: this.iRules(items.amount, true),
          description: this.iRules('', false),
          year: this.iRules(parseInt(items.year), true)
        })
      })
    },

    confirmSubmit () {
      let type = this.items ? 'Update' : 'Create'
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to ${type.toLowerCase()} these arrear(s)?`
      this.confirm.title = `${type} Arrear`
    },

    submit () {
      this.confirm.loading = true
      let formData = new FormData()
      this.form.forEach(items => {
        let arrear = {}
        Object.keys(items).forEach(index => {
          Object.assign(arrear, { [index]: items[index].value })
        })
        formData.append('arrears[]', JSON.stringify(arrear))
      })
      let method = 'create'
      if (this.arrears) {
        method = 'update'
        formData.append('arrearId', this.arrears)
      }
      this.API_POST({url: `Arrears/${method}`, data: formData})
        .then(response => {
          this.resetForm()
          this.$emit('event')
          this.SET_ALERT_SUCCESS(response.response)
        })
        .catch(error => {
          this.alert = {
            show: true,
            message: error.message,
            data: error.data,
            variant: 'error',
            title: 'Error'
          }
         })
        .finally(() => {
          this.confirm.show = false
          this.confirm.loading = false
        })
    }, 
    
    resetForm () {
      this.form = [{
        membershipId: this.iRules('', true),
        amount: this.iRules('', true),
        description: this.iRules('', false),
        year: this.iRules('', true)
      }]
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