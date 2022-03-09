<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
    :max-width="$vuetify.breakpoint.lg
      ? '50%'
      : $vuetify.breakpoint.md
       ? '50%'
       : '100%'">
    <v-card>
      <v-card-title>
        <v-progress-linear
          v-if="loading"
          color="primary"
          indeterminate
          rounded
          height="8" />
        <v-row v-if="!loading">
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h4>{{ electionId ? 'UPDATE' : 'CREATE'}} ELECTION</h4>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="text-right">
            <v-btn
              color="primary"
              text
              @click="$emit('close')"
              v-if="!confirm.loading">
              Close
            </v-btn>
            <v-btn
              v-if="setting === 'update' || setting === 'create'"
              color="primary"
              elevation="0"
              :loading="confirm.loading"
              :disabled="confirm.loading"
              @click="confirmSubmit">
              {{ electionId ? 'Update' : 'Create'}}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row class="dotted">
            <v-col
              cols="12"
              sm="12"
              md="12">
              <h2>Component Society Officers:</h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="6">
              <v-text-field
                outlined
                v-model="formElection.name.value"
                :class="{'text-input': formElection.name.isEmpty}"
                @blur="validationKey(formElection.name, 'Name')"
                dense
                label="Enter election name *"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6">
              <v-menu
                v-model="dateElection"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formElection.date.value"
                  :class="{'text-input': formElection.date.isEmpty}"
                  @blur="validationKey(formElection.date,  'date')"
                  outlined
                  dense
                  append-icon="mdi-calendar"
                  readonly
                  label="Select election date *"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
                <v-date-picker
                  v-model="formElection.date.value"
                  @input="dateElection = false, validationKey(formElection.date,  'Date')"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row
            v-for="(item, index) in form"
            :key="index"
            class="dotted mb-1">
            <h2
              v-if="index === 5"
              class="mt-4 mb-2">
              Chapters
            </h2>
            <v-col
              cols="12"
              sm="12"
              md="12">
              <h3>{{item.position.value.name}}</h3>
              <h5>Candidates:</h5>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="12"
              class="mt-n5">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6">
                  <div
                    v-for="(selected, y) in item.nominate.value"
                    :key="y"
                    class="ma-1"
                  >
                    <v-chip
                      close
                      @click:close="removeMember(index, y)">
                      {{selected.name}}
                    </v-chip>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  class="mt-n5">
                  <v-text-field
                    v-model="item.search.value"
                    append-icon="mdi-magnify"
                    label="Search member..."
                    dense
                    outlined
                    hide-details
                    @keydown.enter="searchMembers(index, item)"
                  />
                  <v-card
                    class="mt-0 member-container"
                    max-width="325px"
                    v-if="item.members.value.length"
                    >
                    <v-list dense>
                      <v-list-item
                        link
                        v-for="(nominees, keys) in item.members.value"
                        :key="keys"
                        @click="selectMember(nominees, index)"
                      >
                        <v-list-item-title>{{ nominees.name }} - {{ nominees.chapterName }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
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
export default {
  name: 'Create-Election',
  props:{
    electionId: {
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
      searchDialog: false,
      members: [],
      loadingSearch: false,
      loading: false,
      search: null,
      dateElection: false,
      formElection: {
        name: this.iRules('', true),
        date: this.iRules('', true),
      },
      form: [
        {
          position: this.iRules({id: '', name: 'President'}, true),
          nominate: this.iRules([], true),
          search: this.iRules('', true),
          members: this.iRules([], true),
        },
        {
          position: this.iRules({id: '', name: 'Vice President'}, true),
          nominate: this.iRules([], true),
          search: this.iRules('', true),
          members: this.iRules([], true),
        },
        {
          position: this.iRules({id: '', name: 'Secretary'}, true),
          nominate: this.iRules([], true),
          search: this.iRules('', true),
          members: this.iRules([], true),
        },
        {
          position: this.iRules({id: '', name: 'Treasurer'}, true),
          nominate: this.iRules([], true),
          search: this.iRules('', true),
          members: this.iRules([], true),
        },
        {
          position: this.iRules({id: '', name: 'PRO/Auditor'}, true),
          nominate: this.iRules([], true),
          search: this.iRules('', true),
          members: this.iRules([], true),
        },
        {
          position: this.iRules({ id: 5, name: 'Eastern President'}, true),
          nominate: this.iRules([], true),
          search: this.iRules('', true),
          members: this.iRules([], true),
        },
        {
          position: this.iRules({ id: 4, name: 'North Central President'}, true),
          nominate: this.iRules([], true),
          search: this.iRules('', true),
          members: this.iRules([], true),
        },
        {
          position: this.iRules({ id: 3, name: 'Western President'}, true),
          nominate: this.iRules([], true),
          search: this.iRules('', true),
          members: this.iRules([], true),
        },
        {
          position: this.iRules({ id: 2, name: 'West Central President'}, true),
          nominate: this.iRules([], true),
          search: this.iRules('', true),
          members: this.iRules([], true),
        },
        {
          position: this.iRules({ id: 1, name: 'South Central President'}, true),
          nominate: this.iRules([], true),
          search: this.iRules('', true),
          members: this.iRules([], true),
        }
      ],
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Create Member',
        variant: 'primary'
      }
    }
  },
  

  fetch () {
    if (this.electionId) this.fetchElectionDetails()
  },

  methods: {
    fetchElectionDetails () {
      this.loading = true
      let formData = new FormData()
      formData.append('id', this.electionId)
      formData.append('type', 'member')
      this.API_POST({ url: 'Members/fetchById', data: formData})
        .then(response => {
          let data = response.data
          let member = data.member
          let image = data.image
          let creator = data.creator
          this.creator = {
            createdBy: `${creator.creator.firstName} ${creator.creator.lastName}`,
            createdAt: creator.createdAt
          }
          this.setForm(member, image)
        }).catch(error => {  })
        .finally(() => { this.loading = false })
    },

    selectMember(item, index) {
      this.form[index].nominate.value.push(item)
      this.form[index].members.value = []
      this.form[index].search.value = ''
    },

    removeMember(index, key) {
      this.form[index].nominate.value.splice(key, 1)
    },

    async searchMembers (index, item = null) {
      this.searchDialog = true
      const chapterId = item.position.value.id
      if (!item.search.value) return
      try {
        this.loadingSearch = true
        let response = await this.API_POST({
          url: '/Election/searchMembers',
          data: this.formParams({
            keyword: item.search.value,
            chapterId: chapterId
          })
        })
        this.form[index].members.value = response.data.map((items, index)  => {
          return {
            id: items.prcNo,
            name: this.capitalizeName(items),
            chapterName: items.chapterName,
          }
        })
        console.log(this.form[index].members.value)
      } catch (error) {
        this.errorHandle(error)
      } finally {this.loadingSearch = false }
    },
  
    confirmSubmit () {
      if (!this.formElection.date.value) {
        this.formElection.date.isEmpty = true
        this.SET_ALERT_ERROR('Election date is required!')
        return false
      }
      let type = this.electionId ? 'Update' : 'Create'
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to ${type.toLowerCase()} this election?`
      this.confirm.title = `${type} Election`
    },

    submit () {
      this.confirm.loading = true
      let formData = new FormData()
      this.form.forEach(items => {
        let component = {}
        Object.keys(items).forEach(index => {
          Object.assign(component, { [index]: items[index].value })
        })
        formData.append('form[]', JSON.stringify(component))
      })
      formData.append('name', this.formElection.name.value)
      formData.append('date', this.formElection.date.value)
      let method = 'create'
      if (this.electionId) {
        method = 'update'
        method = `update/${this.electionId}`
      }
      this.API_POST({
          url: `Election/${method}`, 
          data: formData
        })
        .then(response => {
          this.SET_ALERT_SUCCESS(response.response)
          this.$emit('event')
          this.dialog = false
        })
        .catch(error => { this.SET_ALERT_ERROR(error.response) })
        .finally(() => {
          this.confirm.show = false
          this.confirm.loading = false
        })
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