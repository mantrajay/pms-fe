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
            :loading="logs.loading">
            <template v-slot:item.actions="{ item }">
               <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    v-bind="attrs"
                    small
                    v-on="on"
                  >
                  <v-icon>mdi-menu-down</v-icon>
                  Menu
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(list, index) in menus"
                    :key="index"
                    @click="showDetail(list, item)">
                    <v-list-item-title>
                      <v-icon class="mr-2">{{ list.icon }}</v-icon>
                      {{ list.title }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-col>
    <MemberDetail
      v-if="showMemberDetail"
      :memberId="memberId"
      @close="showMemberDetail = false"/>
    <AlertCallBack
      v-if="confirm.show"
      closeBtn="Close"
      okBtn="Send to Gmail"
      :callBack="confirm"
      @close="confirm.show = false"
      @event="redirectToGmail"/>
  </v-row>
</template>
<script>
export default {
  name: 'Logs-List',
  data () {
    return {
      headers: [
        { text: 'PRC Number', value: 'prcNumber' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Reset Email', value: 'resetEmail' },
        { text: 'Last Login', value: 'lastLogin' },
        { text: 'Actions', value: 'actions' },
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
      memberDetails: {},
      menus: [
        { id: 1, icon: 'mdi-cards', title: 'Show Details' },
        { id: 2, icon: 'mdi-brush', title: 'Generate Temporary Password' },
      ],
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Success',
        variant: 'success'
      }
    }
  },

  fetch () {
    this.fetchLogs()
  },

  methods: {
    showDetail (menu, item) {
      this.memberId = item.prcNo
      this.memberDetails = item
      if (menu.id === 1) {
        this.showMemberDetail = true
        return
      }
      this.generateTemPassword(item)
    },

    redirectToGmail () {
      window.open(`https://mail.google.com/mail/?view=cm&to=${this.memberDetails.resetEmail}`, '_blank')
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

    async generateTemPassword (item) {
      try {
        let response = await this.API_POST({
          url: '/Logs/generateTemporaryPassword/' + item.prcNo,
        })
        this.confirm = {
          msg: `<b>Temporary password:</b> ${response.response} <br/> <b>Recipient:</b> ${item.resetEmail}`,
          show: true,
          loading: false,
          title: 'Success',
          variant: 'success'
        }
      } catch (error) {
        this.errorHandle(error)
      } finally {this.logs.loading = false }
    },

    async fetchLogs (pageNo) {
      this.pager.pageNo = pageNo || this.pager.pageNo
      this.logs.loading = true
      try {
        let response = await this.API_POST({
          url: '/Logs/fetchResetPasswordRequest',
          data: this.searchParams(this.pager.pageNo)
        })
        this.logs.data = response.data.map(items => {
          return {
            prcNo: items.prc_no,
            prcNumber: items.prcNumber,
            name: `${items.first_name} ${items.last_name}`,
            resetEmail: items.reset_email,
            email: items.email,
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
