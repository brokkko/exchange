<template>
  <div class="graphics">
    <Line
        v-bind:data="getChartData()"
        v-bind:options="getChartOptions()"
    />
  </div>

</template>


<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, Filler)

export default {
  name: 'BarChart',
  components: { Line },
  props: ['hist'],
  data() {
    return {
      chartId: 'line-chart',
      width:  400,
      height:  10,
      cssClasses: String,
      styles: {},
      plugins:  [],
    }
  },
  methods: {
    getChartData(){
      return {
        labels: this.hist.map((price) => price.Date).reverse(),
        datasets: [
          {
            label: "Last",
            fill: "start",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 500);
              gradient.addColorStop(0, "rgb(50,243,250)");
              gradient.addColorStop(1, "rgba(102,139,255,0)");
              return gradient;
            },
            borderColor: "rgba(75,192,192,1)",
            data: this.hist.map((price) => price.Open).reverse()
          },
        ]
      }
    },
    getChartOptions(){
      return {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false
            }
          }
        },
        elements: {
          line: {
            tension: 0.35
          }
        },
        plugins: {
          filler: {
            propagate: false
          }
        },
        interaction: {
          intersect: true
        },
        // animation: {
        //     duration: 0
        // }
      }
    }
  }
}
</script>

<style>
.graphics{
  height: 80%;
  width: 80%;
}
</style>