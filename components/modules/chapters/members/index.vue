<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
    max-width="70%">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h4>{{ chapter }} Chapter</h4>
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
        <h3>List of members</h3>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="mt-2">
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
            sm="12"
            md="12">
            <v-data-table
              :search="search"
              :headers="headers"
              :items="members"
              :items-per-page="15"
              :loading="loading">
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
  name: 'Members-in-Chapter',
  props:{
    chapterId: {
      type: String,
      default: ''
    },
    chapter: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      dialog: true,
      loading: false,
      search: '',
      members: [],
      headers: [
        { text: 'Member Name', value: 'fullName' },
        { text: 'PRC Number', value: 'prcNo' },
        { text: 'PRC Expiration', value: 'prcExp' },
        { text: 'Membership', value: 'membershipName' }
      ],
    }
  },

  fetch () {
    this.fetchMembers()
  },

  methods: {
    fetchMembers () {
      this.loading = true
      this.API_POST({ url: 'Chapters/fetchMembers/' + this.chapterId})
        .then(response => {
          this.members = response.data
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