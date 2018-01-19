<template>
  <div id="app">
    <div id="loading" v-if="loading"></div>

    <div v-else>
      <div v-if="errors && errors.length">
        <div class="container">
          <div class="message message-error" v-for="error in errors"><strong>Error:</strong> {{ error.message }}</div>
        </div>
      </div>

      <div v-else>
        <div class="bg" :class="background"></div>
        <div class="container">
          <div class="message" :class="'message--' + alert.severity" v-for="alert in forecast.alerts">
            <div class="message__title"><strong>{{ alert.title }}</strong></div>
            <div class="message__description">{{ alert.description }}</div>
          </div>

          <h1>{{ userLocation.city }}, {{  userLocation.region }}</h1>

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
      userLocation: [],
      forecast: []
    }
  },
  mounted () {
    axios.get('https://ipinfo.io/json')
      .then(response => {
        this.userLocation = response.data
        this.getForecast(response.data.loc)
      })
      .catch(error => {
        this.errors.push(error)
        this.loading = false
      })
  },
  methods: {
    getForecast (location) {
      axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/60ef38c117b7dbb115097bf8b54e3ee8/' + location)
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
