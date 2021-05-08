<template>
  <v-row>
    <v-col cols="12"
      sm="12"
      md="12"
      class="mt-n3">
      <v-card elevation="0">
        <v-container fluid>
          <v-data-table
            class="pa-3"
            :headers="headers"
            :items="logs.data"
            :items-per-page="15"
            @click:row="showDetail"
            :loading="logs.loading">
          </v-data-table>
        </v-container>
      </v-card>
    </v-col>
    <MemberDetail
      v-if="showMemberDetail"
      :memberId="memberId"
      @close="showMemberDetail = false"/>
  </v-row>
</template>
<script>
import MemberDetail from '~/components/modules/members/list-members/components/member-detail'
export default {
  name: 'Logs-List',
  data () {
    return {
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
      console.log(item)
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
          url: '/Logs',
          data: this.searchParams(this.pager.pageNo)
        })
        this.logs.data = response.data.map(items => {
          return {
            prc_no: items.prc_no,
            name: `${items.first_name} ${items.last_name}`,
            lastLogin: items.updatedAt ? this.getLocalDate(items.updatedAt, true) : ''
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
