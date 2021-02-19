<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
      md="12">
      <v-card
        elevation="0">
        <v-container
          class="mt-n3"
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
                placeholder="Search user..."
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
                @click="$emit('show', '', 'create')">
                <v-icon>mdi-plus</v-icon>
                Create User
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
            :items="users.data"
            :loading="users.loading">
            <template v-slot:item.actions="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="0"
                    v-bind="attrs"
                    v-on="on"
                    @click="$emit('show', item.id, 'update')"
                    color="primary"
                    small>
                    <v-icon>mdi-brush</v-icon>
                  </v-btn>
                </template>
                <span>Update</span>
              </v-tooltip>
            </template>
            <template v-slot:item.image="{ item }">
              <v-avatar size="35">
                <img
                  v-if="item.image"
                  :src="item.image"
                  alt="John">
                <v-icon v-else large>mdi-account-details</v-icon>
              </v-avatar>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Patient-List',
  props: {
    reFetch: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      headers: [
        { text: 'Profile', value: 'image' },
        { text: 'User ID', value: 'id' },
        { text: 'Complete Name', value: 'fullName' },
        { text: 'Mobile No.', value: 'mobile' },
        { text: 'Sex', value: 'sex' },
        { text: 'Email', value: 'email' },
        { text: 'Action', value: 'actions'}
      ],
      users: {
        data: [], 
        keyword: '', 
        loading: false
      },
      pager: {
        pageNo: 1,
        totalPage: 1,
        limit: 12
      }
    }
  },

  watch: {
    reFetch (val) {
      if (val) this.fetchUsers()
    }
  },

  fetch () {
    this.fetchUsers()
  },

  methods: {
    search (search) {
      this.users.keyword = search
      this.fetchUsers(1)
    },

    searchParams (pageNo) {
      return this.formParams({
        keyword: this.users.keyword,
        currentPage: pageNo,
        limit: this.pager.limit
      })
    },

    async fetchUsers (pageNo) {
      this.pager.pageNo = pageNo || this.pager.pageNo
      this.users.loading = true
      try {
        let response = await this.API_POST({
          url: '/Users',
          data: this.searchParams(this.pager.pageNo)
        })
        this.users.data = []
        this.users.data = response.data
        this.pager.totalPage = response.totalPage
        this.$emit('event')
      } catch (error) {
        this.errorHandle(error)
      } finally {this.users.loading = false }
    }
  }
}
</script>
