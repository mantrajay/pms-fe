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
                placeholder="Search annuals..."
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
                Create Annual
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
            :items="annuals.data"
            :items-per-page="15"
            :loading="annuals.loading">
            <template v-slot:item.name="{ item }">
              <v-chip
                :outlined="parseInt(item.amount) === 0"
                color="success"
              >
              {{ item.name }}
              </v-chip>
            </template>
            <template v-slot:item.membersCount="{ item }">
              <v-chip
                label
                color="success"
              >
              {{ item.membersCount }}
              </v-chip>
              <!-- <v-chip
                v-if="item.membership_id != 4"
                label
                color="error"
              >
              3
              </v-chip> -->
            </template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    elevation="0"
                    @click="$emit('show', item)"
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
                    v-bind="attrs"
                    v-on="on"
                    elevation="0"
                    color="primary"
                    @click="showMembersAnnual(item)"
                    small>
                    <v-icon>mdi-account-switch</v-icon>
                  </v-btn>
                </template>
                <span>Member's Arrear</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-col>
    <MembersAnnual
      @close="annualMember.show = false"
      v-if="annualMember.show"
      :annualsMember="annualMember" />
  </v-row>
</template>
<script>
import MembersAnnual from './members-annual'
export default {
  name: 'Arrear-List',
  components: {
    MembersAnnual
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
        { text: 'Membership', value: 'name' },
        { text: 'Year', value: 'year' },
        { text: 'Amount', value: 'amount' },
        { text: 'Description', value: 'description' },
        { text: 'Members', value: 'membersCount' },
        { text: 'Actions', value: 'actions' }
      ],
      annuals: {
        data: [], 
        keyword: '', 
        loading: false
      },
      pager: {
        pageNo: 1,
        totalPage: 1,
        limit: 5000
      },
      annualMember: {
        show: false,
        id: '',
        membershipId: '',
        membership: '',
        year: '',
        amount: ''
      }
    }
  },

  watch: {
    reFetch (val) {
      if (val) this.fetchAnnuals()
    }
  },

  fetch () {
    this.fetchAnnuals()
  },

  methods: {
    search (search) {
      this.annuals.keyword = search
      this.fetchAnnuals(1)
    },

    searchParams (pageNo) {
      return this.formParams({
        keyword: this.annuals.keyword,
        currentPage: pageNo,
        limit: this.pager.limit
      })
    },

    async fetchAnnuals (pageNo) {
      this.pager.pageNo = pageNo || this.pager.pageNo
      this.annuals.loading = true
      try {
        let response = await this.API_POST({
          url: '/Arrears',
          data: this.searchParams(this.pager.pageNo)
        })
        this.annuals.data = []
        this.annuals.data = response.data
        this.pager.totalPage = response.totalPage
        this.$emit('event')
      } catch (error) {
        this.errorHandle(error)
      } finally {this.annuals.loading = false }
    },

    showMembersAnnual (items = {}) {
      this.annualMember = {
        show: true,
        id: items.id,
        membershipId: items.membership_id,
        membership: items.name,
        year: items.year,
        amount: items.amount
      }
    }
  }
}
</script>
