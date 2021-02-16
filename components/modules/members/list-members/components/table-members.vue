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
            :headers="headers"
            :items="members.data"
            :items-per-page="15"
            :loading="members.loading">
            <template v-slot:item.actions="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="0"
                    v-bind="attrs"
                    v-on="on"
                    @click="showAnnualFees = true, memberId = item.prcNo, memberDetail = item"
                    color="success"
                    small>
                    <v-icon>mdi-cards</v-icon>
                  </v-btn>
                </template>
                <span>Show Annual Fees</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="0"
                    v-bind="attrs"
                    v-on="on"
                    @click="showActivity = true, memberId = item.prcNo, memberDetail = item"
                    color="warning"
                    small>
                    <v-icon>mdi-book-marker-outline</v-icon>
                  </v-btn>
                </template>
                <span>Show Activities</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="0"
                    v-bind="attrs"
                    v-on="on"
                    @click="$emit('show', item.prcNo)"
                    color="primary"
                    small>
                    <v-icon>mdi-brush</v-icon>
                  </v-btn>
                </template>
                <span>Update</span>
              </v-tooltip>
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
                :color="item.yearArrear.length >= 3 ? 'default' : 'success'">
                {{ item.yearArrear.length >= 3 ? 'Inactive' : 'Active' }}
              </v-chip>
            </template>
            <template v-slot:item.yearArrear="{ item }">
              <v-chip
                class="mt-1"
                color="error"
                small
                v-for="(chip, index) in item.yearArrear"
                :key="index">
                {{ chip }}
              </v-chip>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-col>
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
  </v-row>
</template>
<script>
import Activities from './activities'
import AnnualFees from './annualFees'
import { mapGetters } from 'vuex'
export default {
  name: 'Members-List',
  components: {
    Activities,
    AnnualFees
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
        { text: 'Photo', value: 'photo' },
        { text: 'PRC Number', value: 'prcNo' },
        { text: 'PMA Number', value: 'pmaNo' },
        { text: 'Member Name', value: 'fullName' },
        { text: 'PRC Expiration', value: 'prcExp' },
        { text: 'Chapter', value: 'chapterName' },
        { text: 'Membership', value: 'membershipName' },
        { text: 'Status', value: 'status' },
        { text: 'Year Of Arrear', value: 'yearArrear' },
        { text: 'Action', value: 'actions'}
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
        limit: 5000
      },
      showActivity: false,
      showAnnualFees: false,
      memberDetail: {}
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
        this.members.data = []
        this.members.data = response.data.map(items => {
          return {
            photo: items.photo,
            prcNo: items.prcNo,
            pmaNo: items.pmaNo,
            fullName: items.fullName,
            prcExp: items.prcExp,
            chapterName: items.chapterName,
            membershipName: items.membershipName,
            status: items.status,
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
    }
  }
}
</script>
