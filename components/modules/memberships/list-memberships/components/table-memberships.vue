<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
      md="12">
      <v-card
        elevation="0">
        <v-container
          class="mt-n1"
          fluid>
          <v-row>
            <v-col
              cols="12"
              sm="5"
              md="5">
              <v-text-field
                v-debounce:300="search"
                append-icon="mdi-magnify"
                label="Search"
                dense
                placeholder="Search memberships..."
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12"
              md="7"
              sm="7"
              class="text-right">
              <v-btn
                elevation="0"
                color="primary"
                @click="$emit('show')">
                <v-icon>mdi-plus</v-icon>
                Create Membership
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12"
      sm="12"
      md="12"
      class="mt-n3">
      <v-card elevation="0">
        <v-container fluid>
          <v-data-table
            class="pa-3"
            :headers="headers"
            :items="memberships.data"
            :items-per-page="15"
            :loading="memberships.loading">
            <template v-slot:item.actions="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="0"
                    v-bind="attrs"
                    v-on="on"
                    @click="$emit('show', item.id)"
                    color="primary"
                    small>
                    <v-icon>mdi-brush</v-icon>
                  </v-btn>
                </template>
                <span>Update</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="0"
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteConfirm(item.id)"
                    color="error"
                    small>
                    <v-icon>mdi-eraser</v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-col>
    <AlertCallBack
      v-if="confirm.show"
      :callBack="confirm"
      @close="confirm.show = false"
      @event="deleteSubmit"/>
  </v-row>
</template>
<script>
export default {
  name: 'Membership-List',
  props: {
    reFetch: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Action', value: 'actions'}
      ],
      memberships: {
        data: [], 
        keyword: '', 
        loading: false
      },
      pager: {
        pageNo: 1,
        totalPage: 1,
        limit: 5000
      },
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Delete Membership',
        variant: 'error'
      },
      membershipId: ''
    }
  },

  watch: {
    reFetch (val) {
      if (val) this.fetchMemberships()
    }
  },

  fetch () {
    this.fetchMemberships()
  },

  methods: {
    search (search) {
      this.memberships.keyword = search
      this.fetchMemberships(1)
    },

    searchParams (pageNo) {
      return this.formParams({
        keyword: this.memberships.keyword,
        currentPage: pageNo,
        limit: this.pager.limit
      })
    },

    async fetchMemberships (pageNo) {
      this.pager.pageNo = pageNo || this.pager.pageNo
      this.memberships.loading = true
      try {
        let response = await this.API_POST({
          url: '/Memberships',
          data: this.searchParams(this.pager.pageNo)
        })
        this.memberships.data = []
        this.memberships.data = response.data
        this.pager.totalPage = response.totalPage
        this.$emit('event')
      } catch (error) {
        this.errorHandle(error)
      } finally {this.memberships.loading = false }
    },

    deleteSubmit () {
      let formData = this.formParams({
        id: this.membershipId
      })
      this.API_POST({url: `Memberships/delete`, data: formData})
        .then(response => {
          this.fetchMemberships()
          this.SET_ALERT_SUCCESS(response.response)
        })
        .catch(error => { this.SET_ALERT_ERROR(error.response) })
        .finally(() => {
          this.confirm.show = false
          this.confirm.loading = false
        })
    },

    deleteConfirm (id) {
      this.membershipId = id
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to delete this membership?`
      this.confirm.title = `Delete Membership`
    }
  }
}
</script>
