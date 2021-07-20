<template>
  <div>
    <v-card elevation="0">
      <v-container fluid>
        <h4>Administrator Login History</h4>
        <v-text-field
          v-model="searchAdmin"
          append-icon="mdi-magnify"
          label="Search"
          dense
          placeholder="Search members..."
          outlined
          hide-details
          class="mt-5"
        ></v-text-field>
        <v-data-table
          class="pa-3"
          :search="searchAdmin"
          :headers="headers"
          :items="logs.data"
          :items-per-page="15"
          @click:row="showDetail"
          :loading="logs.loading">
        </v-data-table>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'Logs-List',
  data () {
    return {
      searchAdmin: '',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Last Login', value: 'lastLogin' },
      ],
      logs: {
        data: [],
        keyword: '', 
        loading: false
      },
      pager: {
        pageNo: 1,
        totalPage: 1,
        limit: 5000
      },
      showMemberDetail: false,
      memberId: ''
    }
  },

  fetch () {
    this.fetchLogs()
  },

  methods: {
    showDetail (item) {
      this.memberId = item.prc_no
      this.showMemberDetail = true
    },

    search (search) {
      this.logs.keyword = search
      this.fetchLogs(1)
    },

    searchParams (pageNo) {
      return this.formParams({
        keyword: this.logs.keyword,
        currentPage: pageNo,
        limit: this.pager.limit
      })
    },

    async fetchLogs (pageNo) {
      this.pager.pageNo = pageNo || this.pager.pageNo
      this.logs.loading = true
      try {
        let response = await this.API_POST({
          url: '/Logs/adminHistory',
          data: this.searchParams(this.pager.pageNo)
        })
        this.logs.data = response.data.map(items => {
          return {
            id: items.id,
            name: `${items.firstName} ${items.lastName}`,
            lastLogin: items.updatedAt ? this.dateFormat(items.updatedAt, 'LLL') : ''
          }
        })
        this.pager.totalPage = response.totalPage
      } catch (error) {
        this.errorHandle(error)
      } finally {this.logs.loading = false }
    }
  }
}
</script>
