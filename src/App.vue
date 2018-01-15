<template>
  <div id="app">
    <div id="loading" v-if="loading"></div>

    <div class="container" v-else>
      <div v-if="errors && errors.length">
        <div class="message message-error" v-for="error in errors"><strong>Error:</strong> {{ error.message }}</div>
      </div>

      <div v-else>
        <div class="message" :class="'message-' + alert.severity" v-for="alert in forecast.alerts">
          <div><strong>{{ alert.title }}</strong></div>
          <div>{{ alert.description }}</div>
        </div>

        <h1>Somecity, State</h1>

        <Currently :forecast="forecast.currently"></Currently>
        <Today :forecast="forecast.daily.data[0]"></Today>
        <Hourly :forecast="forecast.hourly"></Hourly>
        <Weekly :forecast="forecast.daily"></Weekly>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Currently from './components/Currently'
import Today from './components/Today'
import Hourly from './components/Hourly'
import Weekly from './components/Weekly'

export default {
  name: 'app',
  components: {
    Currently,
    Today,
    Hourly,
    Weekly
  },
  data () {
    return {
      loading: true,
      errors: [],
      forecast: []
    }
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
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
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Libre+Barcode+39+Extended+Text|Roboto+Condensed:300,400,700|Roboto:300,400,500,700,900');
</style>
<style src="../node_modules/sanitize.css/sanitize.css" lang="css"></style>
<style src="./styles/main.scss" lang="scss"></style>
