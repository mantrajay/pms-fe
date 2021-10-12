<template>
  <div>
    <Header title="Dashboard" />
    <IncomingActivities />
    <MemberArrearBalance v-if="GET_AUTH.roleId == 2" />
    <!-- <Notification /> -->
  </div>
</template>
<script>
// import Charts from './chart'
import IncomingActivities from './child/incoming-activities'
import MemberArrearBalance from './child/arrear'
import Notification from './child/notification'
export default {
  name: 'Dashboard',
  components: {
    // Charts,
    IncomingActivities,
    MemberArrearBalance,
    Notification
  },

  async created () {
    try {
      await this.API_POST({
        url: '/Checker/logUserSession'
      })
    } catch (error) {

    }
  }
}
</script>
