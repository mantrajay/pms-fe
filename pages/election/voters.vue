<template>
<v-container fluid>
  <Header :title="`${electionName.toUpperCase()}  LIST OF VOTERS`"/>
  <v-card>
    <v-btn
      v-print="`#table-print`"
      color="secondary"
      class="ma-2">
      <v-icon>mdi-printer</v-icon>
      Print
    </v-btn>
    <v-simple-table id="table-print">
      <template v-slot:default>
        <thead>
          <tr>
            <th colspan="8">{{ electionName }} List of Voters</th>
          </tr>
          <tr>
            <th style="text-align: left;">No.</th>
            <th style="text-align: left;">Member Name</th>
            <th style="text-align: left;">PRC Number</th>
            <th style="text-align: left;">PMA Number</th>
            <th style="text-align: left;">Contact No.</th>
            <th style="text-align: left;">Email</th>
            <th style="text-align: left;">Chapter</th>
            <th style="text-align: left;">Membership</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in voters"
            :key="index">
            <td>{{ index + 1 }}.</td>
            <td>{{ item.name }}</td>
            <td>{{ item.prcNumber }}</td>
            <td>{{ item.pmaNo }}</td>
            <td>{{ item.mobile }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.chapterName }}</td>
            <td>{{ item.membershipName }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</v-container>
</template>
<script>
import print from 'vue-print-nb'
export default {
  name: 'Voters-List',
  middleware: 'routerGuard',
  directives: {
    print   
  },
  data() {
    return {
      loading: false,
      voters: [],
      electionName: '',
      electionDate: ''
    }
  },
  

  fetch () {
    this.fetchVotersList()
  },

  methods: {
    fetchVotersList () {
      this.loading = true
      this.API_POST({ url: 'Election/votersList/' + this.$route.query.id})
        .then(response => {
          this.electionName = response.data.election.name
          this.electionDate = response.data.election.date
          this.voters = response.data.data.map(item => {
            return {
              name: `${item.last_name}, ${item.middle_name} ${item.first_name}`,
              prcNumber: item.prc_no,
              chapterName: item.chapter_name,
              membershipName: item.membership_name,
              email: item.email,
              mobile: item.mobile,
              pmaNo: item.pma_no,
              id: item.prc_no
            }
          })
          console.log(data)
        }).catch(error => {  })
        .finally(() => { this.loading = false })
    }
  }
}
</script>
<style scoped>
.member-container {
  position: absolute;
  z-index: 1;
  max-height: 40vh;
  overflow: auto;
}
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