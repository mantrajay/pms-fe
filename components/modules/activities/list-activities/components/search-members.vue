<template>
  <v-dialog
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
            <h4>MEMBER LIST</h4>
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
                v-debounce:500ms="fetchMembers"
                append-icon="mdi-magnify"
                label="Search"
                dense
                placeholder="Search first name, last name, prc no...."
                outlined
                hide-details
                class="mt-5"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
              sm="12">
              <v-data-table
                :headers="headers"
                :items="members"
                :items-per-page="15"
                :loading="loading">
                <template v-slot:item.actions="{ item }">
                <v-switch
                  v-model="item.isAssigned"
                  @click="assignMember(item)"
                  inset
                ></v-switch>
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
      loading: false,
      members: [],
      headers: [
        { text: 'PRC Number', value: 'prc_no' },
        { text: 'Full Name', value: 'fullName' },
        { text: 'Chapter', value: 'chapter_name' },
        { text: 'Membership', value: 'membership_name' },
        { text: 'Actions', value: 'actions' }
      ],
    }
  },

  methods: {
    assignMember (item) {
      let data = new FormData()
      data.append('prc_no', item.prc_no)
      data.append('activity_id', this.activityId)
      data.append('is_assgined', item.isAssigned)
      data.append('status', item.isAssigned ? 'assgined' : 'unassgined')
      this.loading = true
      this.API_POST({
        url: 'Activities/assignMemberInActivity',
        data: data
      })
        .then(response => {
          this.SET_ALERT_SUCCESS(response.response)
        }).catch(error => { this.SET_ALERT_ERROR(error.response) })
        .finally(this.loading = false)
    },
  
    fetchMembers (keyword) {
      if (!keyword) {
        this.members = []
        return
      } 
      let data = new FormData()
      data.append('keyword', keyword)
      data.append('activityId', this.activityId)
      this.loading = true
      this.API_POST({
        url: 'Common/getAllMembersDetail',
        data: data
      })
        .then(response => {
          this.members = response.data.map(items => {
            return {
              prc_no: items.prc_no,
              fullName: this.capitalizeChar(items),
              chapter_name: items.chapter_name,
              membership_name: items.membership_name,
              isAssigned: items.is_assigned
            }
          })
        }).catch(error => {  })
        .finally(this.loading = false)
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