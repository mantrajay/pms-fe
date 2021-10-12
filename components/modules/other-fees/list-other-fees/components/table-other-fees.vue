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
                placeholder="Search otherFees..."
                outlined
                hide-details
              ></v-text-field>
            </v-col>
            <v-col
              v-if="GET_AUTH.roleId == 1"
              cols="12"
              md="7"
              sm="7"
              class="text-right">
              <v-btn
                elevation="0"
                color="primary"
                @click="$emit('show')">
                <v-icon>mdi-plus</v-icon>
                Create Other Fee
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
            :headers="tableHeader"
            :items="otherFees.data"
            :items-per-page="15"
            :loading="otherFees.loading">
            <template v-slot:item.actions="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="0"
                    @click="$emit('show', item.id)"
                    color="primary"
                    small>
                    <v-icon>mdi-brush</v-icon>
                  </v-btn>
                </template>
                <span>Update</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Other-Fees-List',
  props: {
    reFetch: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      headers: [
        { text: 'Member Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Date', value: 'date' },
        { text: 'Amount', value: 'amount' },
        { text: 'Actions', value: 'actions' }
      ],
      otherFees: {
        data: [], 
        keyword: '', 
        loading: false
      },
      pager: {
        pageNo: 1,
        totalPage: 1,
        limit: 5000
      }
    }
  },

  computed: {
    tableHeader () {
      if (this.GET_AUTH.roleId == 1) {
        return this.headers
      } else {
        return [
          { text: 'Description', value: 'description' },
          { text: 'Date', value: 'date' },
          { text: 'Amount', value: 'amount' }
        ]
      }
    }
  },

  watch: {
    reFetch (val) {
      if (val) this.fetchOtherFees()
    }
  },

  fetch () {
    this.fetchOtherFees()
  },

  methods: {
    search (search) {
      this.otherFees.keyword = search
      this.fetchOtherFees(1)
    },

    searchParams (pageNo) {
      return this.formParams({
        keyword: this.otherFees.keyword,
        currentPage: pageNo,
        limit: this.pager.limit
      })
    },

    async fetchOtherFees (pageNo) {
      this.pager.pageNo = pageNo || this.pager.pageNo
      this.otherFees.loading = true
      try {
        let response = await this.API_POST({
          url: '/Other_Fees',
          data: this.searchParams(this.pager.pageNo)
        })
        this.otherFees.data = []
        this.otherFees.data = response.data.map(items => {
          return {
            id: items.id,
            name: `${items.last_name}, ${items.first_name} ${items.middle_name}`,
            description: items.description,
            date: this.getLocalDate(items.payment_date),
            amount: this.formatMoney(items.amount)
          }
        })
        this.pager.totalPage = response.totalPage
        this.$emit('event')
      } catch (error) {
        this.errorHandle(error)
      } finally {this.otherFees.loading = false }
    }
  }
}
</script>
