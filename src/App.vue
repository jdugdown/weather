<template>
  <div id="app">
    <div id="loading" v-if="loading"></div>

    <div v-else>
      <div v-if="errors && errors.length">
        <div class="container">
          <div class="message message-error" v-for="error in errors"><strong>Error:</strong> {{ error.message }}</div>
        </div>
      </div>

      <div class="bg" :class="background" v-else>
        <div class="container">
          <div class="message" :class="'message--' + alert.severity" v-for="alert in forecast.alerts">
            <div class="message__title"><strong>{{ alert.title }}</strong></div>
            <div class="message__description">{{ alert.description }}</div>
          </div>

          <h1>Somecity, State</h1>

          <Currently :forecast="forecast.currently"></Currently>
          <Today :forecast="forecast.daily.data[0]"></Today>
          <Hourly :forecast="forecast.hourly"></Hourly>
          <Weekly :forecast="forecast.daily"></Weekly>

          <p class="attribution">
            <a href="https://darksky.net/poweredby/" target="_blank">Powered by Dark Sky</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Currently from './components/Currently'
import Today from './components/Today'
import Hourly from './components/Hourly'
import Weekly from './components/Weekly'
import LineChart from './components/LineChart'

export default {
  name: 'app',
  components: {
    Currently,
    Today,
    Hourly,
    Weekly,
    LineChart
  },
  data () {
    return {
      loading: true,
      errors: [],
      forecast: []
    }
  },
  mounted () {
    this.getForecast()
  },
  methods: {
    getForecast () {
      axios.get('../static/testdata.json')
        .then(response => {
          this.forecast = response.data
          this.loading = false
        })
        .catch(error => {
          this.errors.push(error)
          this.loading = false
        })
    }
  },
  computed: {
    background: function () {
      var background = ''
      var daytime = 'night'
      var clouds = 'clear'

      var now = this.forecast.currently.time
      var sunrise = this.forecast.daily.data[0].sunriseTime
      var sunset = this.forecast.daily.data[0].sunsetTime
      var cloudCover = this.forecast.currently.cloudCover

      if (sunrise <= now && now <= sunset) {
        daytime = 'day'
      }

      if (cloudCover > 0.5) {
        clouds = 'clouds'
      }

      background = daytime + '-' + clouds

      return background
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Libre+Barcode+39+Extended+Text|Roboto+Condensed:300,400,700|Roboto:300,400,500,700,900');
</style>
<style src="../node_modules/sanitize.css/sanitize.css" lang="css"></style>
<style src="./styles/main.scss" lang="scss"></style>
