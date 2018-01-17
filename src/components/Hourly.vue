<template>
  <div class="hourly">
    <h2>Hourly Forecast</h2>
    <p>{{ forecast.summary }}</p>
    <LineChart :hours="hours" :temps="hourlyTemps" :feels="feelsTemps" :humidity="humidity" :precip="precipitation"></LineChart>
  </div>
</template>

<script>
import moment from 'moment'
import LineChart from '../components/LineChart'

export default {
  name: 'Hourly',
  props: [
    'forecast',
  ],
  components: {
    LineChart
  },
  computed: {
    hours: function() {
      var hoursOnly = []
      this.forecast.data.forEach(function(hour) {
        hour = new Date(hour.time*1000);
        hour = moment(hour).format('h A')
        hoursOnly.push(hour)
      })
      return hoursOnly
    },
    hourlyTemps: function() {
      var tempsOnly = []
      this.forecast.data.forEach(function(hour) {
        tempsOnly.push(Math.round(hour.temperature))
      })
      return tempsOnly
    },
    feelsTemps: function() {
      var feelsTempsOnly = []
      this.forecast.data.forEach(function(hour) {
        feelsTempsOnly.push(Math.round(hour.apparentTemperature))
      })
      return feelsTempsOnly
    },
    humidity: function() {
      var humidityOnly = []
      this.forecast.data.forEach(function(hour) {
        humidityOnly.push(Math.round(hour.humidity * 100))
      })
      return humidityOnly
    },
    precipitation: function() {
      var precipitationOnly = []
      this.forecast.data.forEach(function(hour) {
        precipitationOnly.push(Math.round(hour.precipProbability * 100))
      })
      return precipitationOnly
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
