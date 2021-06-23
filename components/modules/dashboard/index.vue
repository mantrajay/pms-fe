<template>
<div>
  <Header title="Dashboard"/>
  <IncomingActivities />
  <MemberArrearBalance v-if="GET_AUTH.roleId == 2" />
</div>
</template>
<script>
import Charts from './chart'
import IncomingActivities from './child/incoming-activities'
import MemberArrearBalance from './child/arrear'
export default {
  name: 'Dashboard',
  components: {
    Charts,
    IncomingActivities,
    MemberArrearBalance
  }
}
</script>
