<template>
<div>
  <v-dialog v-model="dialog"
    persistent
    :max-width="annualId ? '30%' : '80%'">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="7"
            md="7">
            <h4>{{ annualId ? 'UPDATE' : 'CREATE'}} ANNUAL(S)</h4>
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
                {{ annualId ? 'Update' : 'Create'}}
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
              :md="annualId ? 12 : 3"
              :sm="annualId ? 12 : 3"
              class="mt-n3">
              <v-text-field
                outlined
                readonly
                v-model="items.membership.value"
                :class="{'text-input': items.membership.isEmpty, 'view-only': setting === 'view'}"
                @blur="validationKey(items.membership, 'Arrear arrear')"
                dense
                label="Enter Amount *"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              :sm="annualId ? 12 : 6"
              :md="annualId ? 12 : 2"
              class="mt-n3">
              <v-text-field
                outlined
                v-model="items.amount.value"
                :disabled="setting === 'view'"
                :class="{'text-input': items.amount.isEmpty, 'view-only': setting === 'view'}"
                @blur="validationKey(items.amount, 'Arrear amount')"
                dense
                label="Enter Amount *"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              :sm="annualId ? 12 : 6"
              :md="annualId ? 12 : 2"
              class="mt-n3">
              <v-select
                :items="yearList"
                outlined
                dense
                label="Select Year"
                v-model="items.year.value"
                :class="{'text-input': items.year.isEmpty, 'view-only': setting === 'view'}"
                @blur="validationKey(items.year, 'Year')"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              :sm="annualId ? 12 : 4"
              :md="annualId ? 12 : 4"
              class="mt-n3">
              <v-text-field
                outlined
                v-model="items.description.value"
                :disabled="setting === 'view'"
                :class="{'text-input': items.description.isEmpty, 'view-only': setting === 'view'}"
                @blur="validationKey(items.description, 'Description')"
                required
                dense
                label="Enter Description *"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              :sm="annualId ? 12 : 1"
              :md="annualId ? 12 : 1"
              class="mt-n3">
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
    annualId: {
      type: String,
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
    if (this.annualId) this.fetchArrears()
    else this.getMemberships()
    this.generateArrayOfYears()
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
      this.API_POST({ url: 'Arrears/fetchById/' + this.annualId})
        .then(response => {
          let data = response.data
          this.setForm(data)
        }).catch(error => {  })
        .finally(this.loading = false)
    },

    setForm (data = {}) {
      this.form.push({
        membershipId: this.iRules(data.membership_id, true),
        membership: this.iRules(data.name, true),
        amount: this.iRules(data.amount, true),
        description: this.iRules(data.description, false),
        year: this.iRules(parseInt(data.year), true)
      })
    },

    confirmSubmit () {
      let type = this.annualId ? 'Update' : 'Create'
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
      if (this.annualId) {
        method = 'update'
        formData.append('arrearId', this.annualId)
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