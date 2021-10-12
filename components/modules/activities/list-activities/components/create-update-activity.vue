<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
    max-width="40%">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h4>{{ activityId ? 'UPDATE' : 'CREATE'}} ACTIVITY</h4>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="text-right">
            <v-btn
              color="primary"
              elevation="0"
              :loading="confirm.loading"
              :disabled="confirm.loading"
              @click="confirmSubmit">
              {{ activityId ? 'Update' : 'Create'}}
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="$emit('close')"
              v-if="!confirm.loading">
              Close
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="mt-n5">
        <v-container
          class="dotted mt-4"
          fluid>
          <v-row class="mt-n3">
            <v-col
              cols="12"
              md="12"
              sm="12">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6">
                  <v-text-field
                    outlined
                    v-model="form.code.value"
                    :disabled="setting === 'view'"
                    :class="{'text-input': form.code.isEmpty, 'view-only': setting === 'view'}"
                    @blur="validationKey(form.code, 'Activity Code')"
                    dense
                    label="Enter Activity Code *"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6">
                  <v-text-field
                    outlined
                    v-model="form.points.value"
                    :disabled="setting === 'view'"
                    :class="{'text-input': form.points.isEmpty, 'view-only': setting === 'view'}"
                    @blur="validationKey(form.points, 'Activity Points')"
                    required
                    dense
                    label="Enter Activity Points *"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  class="mt-n8">
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  class="mt-n8">
                  <v-text-field
                    outlined
                    v-model="form.name.value"
                    :disabled="setting === 'view'"
                    :class="{'text-input': form.name.isEmpty, 'view-only': setting === 'view'}"
                    @blur="validationKey(form.name, 'Activity Name')"
                    required
                    dense
                    label="Enter Activity Name *"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  class="mt-n3">
                  <v-text-field
                    class="mt-n3"
                    outlined
                    v-model="form.sponsor.value"
                    :disabled="setting === 'view'"
                    :class="{'text-input': form.sponsor.isEmpty, 'view-only': setting === 'view'}"
                    @blur="validationKey(form.sponsor, 'Sponsor')"
                    required
                    dense
                    label="Enter Sponsor *"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  class="mt-n3">
                  <v-text-field
                    class="mt-n3"
                    outlined
                    v-model="form.speakerName.value"
                    :disabled="setting === 'view'"
                    :class="{'text-input': form.speakerName.isEmpty, 'view-only': setting === 'view'}"
                    @blur="validationKey(form.speakerName, 'Speaker Name')"
                    required
                    dense
                    label="Enter Speaker Name *"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  class="mt-n3">
                  <v-text-field
                    class="mt-n3"
                    outlined
                    v-model="form.venue.value"
                    :disabled="setting === 'view'"
                    :class="{'text-input': form.venue.isEmpty, 'view-only': setting === 'view'}"
                    @blur="validationKey(form.venue, 'Venue')"
                    required
                    dense
                    label="Enter Venue *"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="mt-n3">
                  <v-menu
                    v-model="startDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="mt-n3"
                      v-model="form.startDate.value"
                      :disabled="setting === 'view'"
                      :class="{'text-input': form.startDate.isEmpty, 'view-only': setting === 'view'}"
                      @blur="validationKey(form.startDate,  'Start Date')"
                      outlined
                      dense
                      append-icon="mdi-calendar"
                      readonly
                      label="Select Start Date *"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                    <v-date-picker
                      v-model="form.startDate.value"
                      @input="startDate = false, validationKey(form.startDate,  'Start Date')"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="mt-n3">
                  <v-menu
                    ref="startTime"
                    v-model="startTime"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="form.startTime.value"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        class="mt-n3"
                        v-model="form.startTime.value"
                        :disabled="setting === 'view'"
                        :class="{'text-input': form.startTime.isEmpty, 'view-only': setting === 'view'}"
                        @blur="validationKey(form.startTime,  'Start Time')"
                        label="Select Start Time *"
                        append-icon="mdi-clock-time-four-outline"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="startTime"
                      v-model="form.startTime.value"
                      full-width
                      @click:minute="$refs.startTime.save(form.startTime.value)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="mt-n3">
                  <v-menu
                    v-model="endDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="mt-n3"
                      v-model="form.endDate.value"
                      :disabled="setting === 'view'"
                      :class="{'text-input': form.endDate.isEmpty, 'view-only': setting === 'view'}"
                      @blur="validationKey(form.endDate,  'Start Time')"
                      outlined
                      dense
                      append-icon="mdi-calendar"
                      readonly
                      label="Select End Date *"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                    <v-date-picker
                      v-model="form.endDate.value"
                      @input="endDate = false, validationKey(form.endDate,  'Start Date')"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="mt-n3">
                  <v-menu
                    ref="endTime"
                    v-model="endTime"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="form.endTime.value"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        class="mt-n3"
                        v-model="form.endTime.value"
                        :disabled="setting === 'view'"
                        :class="{'text-input': form.endTime.isEmpty, 'view-only': setting === 'view'}"
                        @blur="validationKey(form.endTime,  'End Time')"
                        label="Select End Time *"
                        append-icon="mdi-clock-time-four-outline"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="endTime"
                      v-model="form.endTime.value"
                      full-width
                      @click:minute="$refs.endTime.save(form.endTime.value)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <Creator :items="creator"/>
        </v-container>
    </v-card-text>
    <AlertCallBack
      v-if="confirm.show"
      :callBack="confirm"
      @close="confirm.show = false"
      @event="submit"/>
  </v-card>
</v-dialog>
</template>
<script>
import SearchMembers from './search-members'
export default {
  name: 'Create-Activity',
  comments: {
    SearchMembers
  },
  props:{
    activityId: {
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
      startDate: false,
      startTime: null,
      endDate: false,
      endTime: null,
      singleSelect: false,
      form: {
        code: this.iRules('', true),
        name: this.iRules('', true),
        startDate: this.iRules('', true),
        startTime: this.iRules('', true),
        endDate: this.iRules('', true),
        endTime: this.iRules('', true),
        venue: this.iRules('', true),
        speakerName: this.iRules('', true),
        sponsor: this.iRules('', true),
        points: this.iRules('', true),
        prcNo: this.iRules([], true)
      },
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Create Activity',
        variant: 'primary'
      },
      search: '',
      loadingMembers: false,
      members: [],
      removePrcNo: [],
      headers: [
        { text: 'PRC Number', value: 'prc_no' },
        { text: 'Full Name', value: 'name' },
        { text: 'Chapter', value: 'chapter_name' },
        { text: 'Membership', value: 'membership_name' }
      ]
    }
  },

  fetch () {
    if (this.activityId) this.fetchActivities()
  },

  methods: {
    fetchActivities () {
      this.loading = true
      this.API_POST({ url: 'Activities/fetchById/' + this.activityId})
        .then(response => {
          let activity = response.data.activity
          let members = response.data.members
          this.creator = {
            createdBy: `${activity.firstName} ${activity.lastName}`,
            createdAt: activity.createdAt
          }
          this.setForm(activity, members)
        }).catch(error => {  })
        .finally(this.loading = false)
    },

    setForm (activity = {}, members = []) {
      this.form.code.value = activity.code
      this.form.name.value = activity.name
      this.form.startDate.value = activity.start_time.split(' ')[0]
      this.form.startTime.value = activity.start_time.split(' ')[1]
      this.form.endDate.value = activity.end_time.split(' ')[0]
      this.form.endTime.value = activity.end_time.split(' ')[1]
      this.form.venue.value = activity.venue
      this.form.speakerName.value = activity.speaker_name
      this.form.sponsor.value = activity.sponsor
      this.form.points.value = activity.points
      this.form.prcNo.value = members.map(items => {
        return {
          prc_no: items.prc_no,
          name: `${items.first_name} ${items.middle_name} ${items.last_name}`,
        }
      })
    },

    confirmSubmit () {
      if (!this.validateForm(this.form)) {
        this.SET_ALERT_ERROR(this.errMessage)
        return false
      }
      let type = this.activityId ? 'Update' : 'Create'
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to ${type.toLowerCase()} this activity?`
      this.confirm.title = `${type} Activity`
    },

    submit () {
      this.confirm.loading = true
      let formData = this.formParams({
        code: this.form.code.value,
        name: this.form.name.value,
        startTime: `${this.form.startDate.value} ${this.form.startTime.value}`,
        endTime: `${this.form.endDate.value} ${this.form.endTime.value}`,
        venue: this.form.venue.value,
        speakerName: this.form.speakerName.value,
        sponsor: this.form.sponsor.value,
        points: this.form.points.value
      })
      let prcNo = this.form.prcNo.value.map(items => {
        return items.prc_no
      })
      formData.append('prcNos', JSON.stringify(prcNo))
      let method = 'create'
      if (this.activityId) {
        method = 'update'
        formData.append('activityId', this.activityId)
      }
      this.API_POST({url: `Activities/${method}`, data: formData})
        .then(response => {
          this.resetForm()
          this.$emit('event')
          this.SET_ALERT_SUCCESS(response.response)
        })
        .catch(error => { this.SET_ALERT_ERROR(error.response) })
        .finally(() => {
          this.confirm.show = false
          this.confirm.loading = false
        })
    },

    resetForm () {
      this.form = {
        code: this.iRules('', true),
        name: this.iRules('', true),
        start_time: this.iRules('', true),
        end_time: this.iRules('', true),
        venue: this.iRules('', true),
        speakerName: this.iRules('', true),
        sponsor: this.iRules('', true),
        points: this.iRules('', true),
      }
    }
  }
}
</script>
<style scoped>
.remove-image {
  position: relative;
  top: 20px;
  left: 10px;
  cursor: pointer;
  z-index: 10;
}
.input-file::-webkit-file-upload-button {
  visibility: hidden;
}
.input-file {
  opacity: 1;
  outline: none;
}
input[type='file'] {
  color: transparent;    /* Hides your "No File Selected" */
  direction: rtl;        /* Sets the Control to Right-To-Left */
}
.drop-label {
  position: relative;
  top: -160px
}
.input-file::before {
  content: "Select Image";
  display: inline-block;
  border-radius: 3px;
  padding: 5px 8px;
  color: #00B8FF;
  font-weight: 500;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  font-size: 15px;
  text-decoration: inherit;
  vertical-align: inherit;
  position: absolute;
  left: 37% !important;
  top: 56% !important;
  background-color: #fafbfd;
}
.input-file {
  height: 240px !important;
  position: relative;
  left: -2px;
  width: 100%;
  top: -10px;
  border: 1px dashed #8A92A9;
  background: #FAFBFD 0% 0% no-repeat padding-box;
}
.dotted {
  border-top: 2px #7777 dotted !important;
}
.disabled >>> .v-input__slot{
  background-color: #eeeeee;
}
h4 {
  color: #686565;
}
.view-only >>> fieldset {
  border: none !important;
}
</style>