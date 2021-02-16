<template>
  <v-row class="text-center">
    <v-col
      class="mb-5"
      cols="12"
      md="12"
      sm="12">
      <WeeklyChart />
    </v-col>
    <v-col
      class="mb-5"
      cols="12"
      md="12"
      sm="12">
      <MonthlyChart />
    </v-col>
    <v-col
      class="mb-5"
      cols="12"
      md="12"
      sm="12">
      <YearlyChart />
    </v-col>
  </v-row>
</template>
<script>
import LineChart from './salesCharts.js'
import WeeklyChart from './chart-weekly'
import MonthlyChart from './chart-monthly'
import YearlyChart from './chart-yearly'
export default {
  name: 'Charts',
  components: {
    WeeklyChart,
    MonthlyChart,
    YearlyChart
  }
}
</script>