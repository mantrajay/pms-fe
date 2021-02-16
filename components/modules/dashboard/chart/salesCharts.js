import Vue from 'vue'
import VueCharts from 'vue-chartjs'
const LineChart = Vue.component('LineChart', {
  extends: VueCharts.Line,
  props: {
    labels: {
      type: Array,
      default: null
    },

    data: {
      type: Array,
      default: null
    }
  },
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: this.data
    }, {responsive: true, maintainAspectRatio: false})
  }
})
export default LineChart