<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
    max-width="60%">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h4>ACTIVITY ATTENDEEDS</h4>
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
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                dense
                placeholder="Search members..."
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
              sm="12">
              <v-data-table
                :search="search"
                :headers="headers"
                :items="attendees"
                :items-per-page="attendees.length"
                :hide-default-footer="true"
                :loading="loading">
                <template v-slot:item.actions="{ item, index }">
                  <v-btn
                    class="float-left"
                    @click="deleteMember(item.id, index)"
                    color="error"
                    v-if="!item.fullName">
                    Remove - Member does not exist!
                  </v-btn>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
    </v-card-text>
  </v-card>
</v-dialog>
</template>
<script>
export default {
  name: 'Attendees',
  props:{
    activityId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      dialog: true,
      attendees: [],
      search: '',
      loading: false,
      loadingRemove: false,
      headers: [
        { text: 'Member Name', value: 'fullName' },
        { text: 'PRC Number', value: 'prc_no' },
        { text: 'PRC Expiration', value: 'prc_exp' },
        { text: '', value: 'actions' },
      ],
    }
  },

  fetch () {
    this.fetchAttendees()
  },

  methods: {
    fetchAttendees () {
      this.loading = true
      this.API_POST({ url: 'Activities/fetchAttendees/' + this.activityId})
        .then(response => {
          this.attendees = response.data.map(items => {
            if (items.memberInfo) {
              return {
                id: items.id,
                prc_no: items.prcNo,
                fullName: this.capitalizeChar(items.memberInfo),
                prc_exp: this.getLocalDate(items.memberInfo.prc_exp)
              }
            } else {
              return {
                id: items.id,
                prc_no: '',
                fullName: '',
                prc_exp: ''
              }
            }
          })
        }).catch(error => {  })
        .finally(this.loading = false)
    },

    deleteMember(id, index) {
      this.loadingRemove = true
      this.API_POST({ url: 'Activities/deleteMember/' + id})
        .then(response => {
          this.attendees.splice(1, index)
          this.SET_ALERT_SUCCESS(response.response)
          console.log(response)
        }).catch(error => {
          this.SET_ALERT_ERROR(error.response)
        })
        .finally(this.loadingRemove = false)
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