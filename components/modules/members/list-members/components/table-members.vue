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
                placeholder="Search members..."
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
                Create Member
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
            :items-per-page="pager.limit"
            :headers="headers"
            :items="members.data"
            :loading="members.loading"
            hide-default-footer>
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
                    @click="goTo(item, list)"
                  >
                    <v-list-item-title>
                      <v-icon class="mr-2">{{ list.icon }}</v-icon>
                      {{ list.title }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
            <template v-slot:item.photo="{ item }">
              <v-avatar size="35">
                <img
                  v-if="item.photo"
                  :src="item.photo">
                <v-icon v-else large>mdi-account-details</v-icon>
              </v-avatar>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip
                small
                :color="item.yearArrear.length >= 3 ? 'default' : 'success'">
                {{ item.yearArrear.length >= 3 ? 'Inactive' : 'Active' }}
              </v-chip>
            </template>
            <template v-slot:item.yearArrear="{ item }">
              <div v-if="item.membershipName !== 'Emeritus'">
                <div
                  class="unsettled"
                  @click="settleArrear(item)"
                  v-if="item.yearArrear.length">
                  <v-chip
                    class="ma-1 unsettled"
                    color="error"
                    small
                    v-for="(chip, index) in item.yearArrear"
                    :key="index">
                    {{ chip.years }}
                  </v-chip>
                </div>
                <div v-else>
                  <v-chip
                    class="mt-1"
                    color="success"
                    small>
                    Updated
                  </v-chip>
                </div>
              </div>
            </template>
          </v-data-table>
          <Pagination
            @go-to-page="fetchMembers"
            :currentPage="pager.currentPage"
            :length="pager.totalPage" />
        </v-container>
      </v-card>
    </v-col>
  <MemberTransaction
    v-if="showTransaction"
    :items="memberArrears"
    @event="fetchMembers"
    @close="showTransaction = false" />
  <Activities
    v-if="showActivity"
    :memberId="memberId"
    :memberDetail="memberDetail"
    @close="showActivity = false" />
  <AnnualFees
    v-if="showAnnualFees"
    :memberId="memberId"
    :memberDetail="memberDetail"
    @close="showAnnualFees = false" />
  <AlertCallBack
    v-if="confirm.show"
    :callBack="confirm"
    @close="confirm.show = false"
    @event="deleteSubmit"/>
  </v-row>
</template>
<script>
import Activities from './activities'
import AnnualFees from './annualFees'
import MemberTransaction from './member-transaction'
import { mapGetters } from 'vuex'
export default {
  name: 'Members-List',
  components: {
    Activities,
    AnnualFees,
    MemberTransaction
  },
  props: {
    reFetch: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      headers: [
        { text: 'Member Name', value: 'fullName' },
        { text: 'PRC Number', value: 'prcNo' },
        { text: 'PMA Number', value: 'pmaNo' },
        { text: 'PRC Expiration', value: 'prcExp' },
        { text: 'Chapter', value: 'chapterName' },
        { text: 'Membership', value: 'membershipName' },
        { text: 'Status', value: 'status' },
        { text: 'Year Of Arrear', value: 'yearArrear' },
        { text: 'Action', value: 'actions'}
      ],
      menus: [
        { id: 1, icon: 'mdi-brush', title: 'Update' },
        { id: 2, icon: 'mdi-book-marker-outline', title: 'Show Activities' },
        { id: 3, icon: 'mdi-cards', title: 'Show Annual Fee / Arrears' },
        { id: 4, icon: 'mdi-eraser', title: 'Remove Member' },
      ],
      memberId: '',
      members: {
        data: [], 
        keyword: '', 
        loading: false
      },
      pager: {
        pageNo: 1,
        totalPage: 1,
        limit: 10
      },
      showActivity: false,
      showAnnualFees: false,
      memberDetail: {},
      memberArrears: {},
      showTransaction: false,
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Delete Member',
        variant: 'error'
      }
    }
  },

  watch: {
    reFetch (val) {
      if (val) this.fetchMembers()
    }
  },

  computed: {
    ...mapGetters({
      GET_API_ASSETS: 'common/GET_API_ASSETS'
    })
  },

  mounted () {
    this.fetchMembers()
  },

  methods: {
    goTo (item, list) {
      if (list.id === 4) {
        this.memberId = item.prcNo
        this.confirm = {
          msg: `Are you sure you want to delete (${item.fullName})?`,
          show: true,
          loading: false,
          title: 'Delete Member',
          variant: 'error'
        }
        return
      }
      if (list.id === 3) {
        this.showAnnualFees = true
        this.memberId = item.prcNo,
        this.memberDetail = item
        return
      }
      if (list.id === 2) {
        this.showActivity = true
        this.memberId = item.prcNo,
        this.memberDetail = item
        return
      }
      if (list.id === 1) {
        this.$emit('show', item.prcNo)
      }
    },

    deleteSubmit () {
      this.confirm.loading = true
      this.API_POST({ url: `Members/removeMembers/${this.memberId}` })
        .then(response => {
          this.SET_ALERT_SUCCESS(response.response)
          this.fetchMembers(1)
          this.confirm.show = false
        }).catch(error => { this.SET_ALERT_ERROR(error.response) })
        .finally(() => {
          this.confirm.loading = false
        })
    },
  
    search (search) {
      this.members.keyword = search
      this.fetchMembers(1)
    },

    searchParams (pageNo) {
      return this.formParams({
        keyword: this.members.keyword,
        currentPage: pageNo,
        limit: this.pager.limit
      })
    },

    async fetchMembers (pageNo) {
      this.pager.pageNo = pageNo || this.pager.pageNo
      this.members.loading = true
      try {
        let response = await this.API_POST({
          url: '/Members',
          data: this.searchParams(this.pager.pageNo)
        })
        this.members.data = response.data.map((items, index)  => {
          return {
            prcNo: items.prcNo,
            pmaNo: items.pmaNo,
            fullName: this.capitalizeName(items),
            prcExp: items.prcExp,
            chapterName: items.chapterName,
            membershipName: items.membershipName,
            status: items.status,
            membershipId: items.membership_id,
            yearArrear: items.yearArrear
          }
        })
        this.pager.totalPage = response.totalPage
        this.$emit('event')
      } catch (error) {
        this.errorHandle(error)
      } finally {this.members.loading = false }
    },

    getValue (item) {
      return Object.values(item)
    },

    settleArrear (item){
      this.showTransaction = true
      this.memberArrears = item
    }
  }
}
</script>
<style scoped>
  .unsettled {
    cursor: pointer;
  }
  .updated {
    color: #4caf50;
  }
</style>