<template>
  <v-card
    elevation="0"
    class="mx-auto">
    <v-card-text class="text-left">
      <v-row>
        <v-col>
          <h3>WEEKLY PATIENT CHART</h3>
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
  name: 'Week',
  data () {
    return {
      labels: ['1st', '2nd', '3th', '4th', '5th', '6th', '7th'],
      data: [
        {
          type: 'line',
          label: 'Patient',
          borderColor: '#fb8c00',
          borderWidth: 4,
          fill: false,
          data: [10, 5, 30, 40, 50, 20, 20]
        }
      ]
    }
  }
}
</script>