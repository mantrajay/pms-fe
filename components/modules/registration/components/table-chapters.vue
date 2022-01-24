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
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                dense
                placeholder="Search registration..."
                outlined
                hide-details
              ></v-text-field>
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
            :search="search"
            :items="data"
            :items-per-page="15"
            :loading="loading"
            @click:row="goToDetails">
            <template v-slot:item.stats="{ item }">
              <v-chip
                class="white--text"
                :color="!parseInt(item.status) ? 'primary' : 'rgb(16, 148, 109)'">
                {{ item.stats }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="0"
                    v-bind="attrs"
                    v-on="on"
                    @click.stop
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
                    @click.stop
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
  name: 'Postgraduate-Registration-Table',
  data () {
    return {
      showMembers: false,
      headers: [
        { text: 'Full Name', value: 'name' },
        { text: 'PRC No.', value: 'cpNo' },
        { text: 'PRC No. Expiry Date', value: 'expiryDate' },
        { text: 'PMA No.', value: 'pmaNo' },
        { text: 'Email', value: 'email' },
        { text: 'Status.', value: 'stats' },
        // { text: 'Action', value: 'actions'}
      ],
      search: '',
      data: [],
      loading: false,
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Delete Chapter',
        variant: 'error'
      }
    }
  },

  fetch () {
    this.fetchRegistration()
  },

  methods: {
    goToDetails(args) {
      this.$router.push(`/postgraduate-registration/details/${args.id}`)
    },

    async fetchRegistration () {
      try {
        this.loading = true
        let response = await this.API_POST({ url: '/Registration' })
        this.data = response.data.map(item => {
          return {
            name: `${item.lastName}, ${item.firstName} ${item.middleName}`,
            stats: !parseInt(item.status) ? 'For Review' : 'Registered',
            ...item
          }
        })
      } catch (error) {
        this.errorHandle(error)
      } finally {this.loading = false }
    }
  }
}
</script>
