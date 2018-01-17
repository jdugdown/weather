<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChart',
  extends: Line,
  props: [
    'hours',
    'temps',
    'feels',
    'humidity',
    'precip'
  ],
  mounted () {
    Chart.defaults.global.defaultFontColor = '#fff'
    Chart.defaults.global.defaultFontFamily = 'Roboto'
    Chart.defaults.global.defaultFontSize = 14
    this.renderChart(
      {
        labels: this.hours.slice(0, 24),
        datasets: [
          {
            label: 'Temperature',
            borderColor: '#fff',
            borderWidth: 1,
            lineTension: 0.5,
            pointRadius: 0,
            pointBackgroundColor: '#fff',
            pointHitRadius: 25,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            fill: false,
            data: this.temps.slice(0, 24),
            yAxisID: 'A'
          },
          {
            label: 'Feels Like',
            borderColor: 'rgba(255, 255, 255, .5)',
            borderWidth: 1,
            lineTension: 0.5,
            pointRadius: 0,
            pointBackgroundColor: '#fff',
            pointHitRadius: 25,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            fill: false,
            borderDash: [10, 10],
            data: this.feels.slice(0, 24),
            yAxisID: 'A',
            hidden: true
          },
          {
            label: 'Humidity',
            borderColor: '#409ad5',
            borderWidth: 1,
            lineTension: 0.5,
            pointRadius: 0,
            pointBackgroundColor: '#fff',
            pointHitRadius: 25,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            fill: false,
            data: this.humidity.slice(0, 24),
            yAxisID: 'B',
            hidden: true
          },
          {
            label: 'Chance of Precipitation',
            borderColor: '#409ad5',
            borderWidth: 1,
            lineTension: 0.5,
            pointRadius: 0,
            pointBackgroundColor: '#fff',
            pointHitRadius: 25,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            fill: false,
            borderDash: [2, 2],
            data: this.precip.slice(0, 24),
            yAxisID: 'B',
            steppedLine: true
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 24,
            right: 16,
            bottom: 16,
            left: 16
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: '#ffffff',
            padding: 40
          }
        },
        tooltips: {
          mode: 'x',
          displayColors: false,
          backgroundColor: 'rgba(255, 255, 255, .75)',
          titleFontColor: '#000',
          bodyFontColor: '#000',
          caretSize: 0,
          cornerRadius: 8,
          xPadding: 8,
          yPadding: 8,
          callbacks: {
            label: function(tooltipItems, data) {
              if (data.datasets[tooltipItems.datasetIndex].label == 'Humidity' | data.datasets[tooltipItems.datasetIndex].label == 'Chance of Precipitation' ) {
                return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + '%'
              } else {
                return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + '\xB0'
              }
            }
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 12,
              padding: 16
            },
            gridLines: false
          }],
          yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'left',
            ticks: {
              fontSize: 12,
              padding: 16
            },
            gridLines: false
          }, {
            id: 'B',
            type: 'linear',
            position: 'right',
            ticks: {
              fontSize: 12,
              padding: 16,
              min: 0,
              max: 100
            },
            gridLines: false
          }]
        }
      }
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
