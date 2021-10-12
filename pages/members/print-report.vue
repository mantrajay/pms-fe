<template>
<div>
  <div class="mt-3 ml-3">
    <Header title="MEMBERS REPORT" />
  </div>
  <v-container fluid>
    <v-card>
      <v-btn
        v-print="`#table-print`"
        color="secondary"
        class="ma-2">
        Print
      </v-btn>
      <v-simple-table id="table-print">
        <template v-slot:default>
          <thead>
            <tr>
              <th style="text-align: left;">No.</th>
              <th style="text-align: left;">Member Name</th>
              <th style="text-align: left;">PRC Number</th>
              <th style="text-align: left;">PMA Number</th>
              <!-- <th style="text-align: left;">PRC Expiration</th> -->
              <th style="text-align: left;">Contact No.</th>
              <th style="text-align: left;">Email</th>
              <th style="text-align: left;">Chapter</th>
              <th style="text-align: left;">Membership</th>
              <!-- <th style="text-align: left;">Status</th>
              <th style="text-align: left;">Year Of Arrear</th>
              <th style="text-align: left;">Status</th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in members"
              :key="index">
              <td>{{ index + 1 }}.</td>
              <td>{{ item.fullName }}</td>
              <td>{{ item.prcNumber }}</td>
              <td>{{ item.pmaNo }}</td>
              <!-- <td>{{ item.prcExp }}</td> -->
              <td>{{ item.mobile }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.chapterName }}</td>
              <td>{{ item.membershipName }}</td>
              <!-- <td>{{ item.status }}</td>
              <td>{{ item.membership_id }}</td>
              <td>{{ item.isDeceased }}</td>
              <td>{{ item.yearArrear }}</td> -->
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</div>
</template>
<script>
import print from 'vue-print-nb'
export default {
  middleware: 'routerGuard',
  directives: {
    print   
  },
  data () {
    return {
      loading: false,
      members: []
    }
  },

  created () {
    this.fetchMembers()
  },

  methods: {
    async fetchMembers () {
      try {
        this.loading = true
        let response = await this.API_POST({ url: '/Members/getAllMembersDetail' })
        this.members = response.data.map((items, index)  => {
          return {
            prcNumber: items.prcNo,
            pmaNo: items.pmaNo,
            fullName: this.capitalizeChar(items),
            prcExp: items.prcExp,
            chapterName: items.chapter_name,
            email: items.email,
            mobile: items.mobile,
            membershipName: items.membership_name
          }
        })
      } catch (error) {
        this.errorHandle(error)
      } finally {this.loading = false }
    }
  }
}
</script>
