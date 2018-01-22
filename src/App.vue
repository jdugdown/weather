<template>
  <div id="app">
    <div id="loading" v-if="loading"><div></div></div>

    <div v-else>
      <div v-if="errors && errors.length">
        <div class="container">
          <div class="message message--error" v-for="error in errors"><strong>Error:</strong> {{ error.message }}</div>
        </div>
      </div>

      <div v-else>
        <div class="bg" :class="background"></div>

        <div class="navbar">
          <div class="container">
            <form v-on:submit.prevent="searchForecast(searchTerm)">
              <input type="text" placeholder="City or Zip Code" v-model="searchTerm">
              <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24"><path fill="white" d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"/></svg></button>
            </form>

            <button type="button" name="findMe" @click="locateForecast()"><svg xmlns="http://www.w3.ord/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path fill="white" d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z" /></svg></button>
          </div>
        </div>

        <div class="container">
          <div class="message" :class="'message--' + alert.severity" v-for="alert in forecast.alerts">
            <div class="message__title"><strong>{{ alert.title }}</strong></div>
            <div class="message__description">{{ alert.description }}</div>
          </div>

          <h1 v-if="formattedAddress">{{ formattedAddress }}</h1>
          <h1 v-else>{{ userLocation.city }}, {{  userLocation.region }}</h1>

          <div class="app-top">
            <Currently :forecast="forecast.currently"></Currently>
            <Today :forecast="forecast.daily.data[0]"></Today>
          </div>

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
      searchTerm: '',
      userLocation: [],
      formattedAddress: '',
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
    },
    searchForecast (location) {
      this.loading = true

      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&language=en'

      axios.get(url)
        .then(location => {
          if (location.data.status == 'OK') {
            this.formattedAddress = location.data.results[0].formatted_address
            var lat = location.data.results[0].geometry.location.lat
            var lng = location.data.results[0].geometry.location.lng
            var weather = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/60ef38c117b7dbb115097bf8b54e3ee8/' + lat + ',' + lng

            axios.get(weather)
            .then(response => {
              this.forecast = response.data
              this.loading = false
            })
            .catch(error => {
              this.errors.push(error)
              this.loading = false
            })
          } else {
            var geoError = {message: 'Location not found.'}
            this.errors.push(geoError)
            this.loading = false
          }
        })
        .catch(error => {
          this.errors.push(error)
          this.loading = false
        })
    },
    locateForecast () {
      this.loading = true

      var geoOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }

      navigator.geolocation.getCurrentPosition(
        pos => {
          var location = pos.coords.latitude + ',' + pos.coords.longitude

          var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&language=en'

          axios.get(url)
            .then(location => {
              if (location.data.status == 'OK') {
                this.formattedAddress = location.data.results[0].formatted_address
              } else {
                var geoError = {message: 'Location not found.'}
                this.errors.push(geoError)
                this.loading = false
              }
            })
            .catch(error => {
              this.errors.push(error)
              this.loading = false
            })

          this.getForecast(location)
        },

        error => {
          this.errors.push(error)
          this.loading = false
        },

        geoOptions
      )
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
