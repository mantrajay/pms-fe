<template>
  <v-card
    elevation="0"
    class="mx-auto">
    <v-card-text class="text-left">
      <v-row>
        <v-col>
          <h3>MONTHLY PATIENT CHART</h3>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text class="mt-n4">
      <LineChart
        :labels="labels"
        :data="data"/>
    </v-card-text>
  </v-card>
</template>
<script>
/* eslint-disable */
import LineChart from './salesCharts.js'
export default {
  name: 'Month',
  data () {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      data: [
        {
          type: 'line',
          label: 'Patient',
          borderColor: '#4caf50',
          borderWidth: 4,
          fill: false,
          data: [10, 20, 30, 40, 50, 34, 20, 50, 60, 20, 40, 70]
        }
      ]
    }
  }
}
</script>