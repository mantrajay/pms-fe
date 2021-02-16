<template>
  <v-card
    elevation="0"
    class="mx-auto">
    <v-card-text class="text-left">
      <v-row>
        <v-col>
          <h3>YEARLY PATIENT CHART</h3>
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
  name: 'Year',
  data () {
    return {
      labels: ['12', '13', '14', '15', '16', '17', '18', '19', '20'],
      data: [
        {
          type: 'line',
          label: 'Patient',
          borderColor: '#1565c0',
          borderWidth: 4,
          fill: false,
          data: [40, 10, 6, 40, 25, 34, 20, 50, 60]
        }
      ]
    }
  }
}
</script>