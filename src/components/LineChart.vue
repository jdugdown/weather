<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChart',
  extends: Line,
  props: [
    'hours',
    'temps'
  ],
  mounted () {
    this.renderChart(
      {
        labels: this.hours,
        datasets: [
          {
            label: 'Temperature',
            backgroundColor: 'rgba(255, 255, 255, .5)',
            data: this.temps
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      }
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
