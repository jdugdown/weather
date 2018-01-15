// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import moment from 'moment'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

Vue.filter('temperature', function (value) {
  if (!value) return ''
  value = Math.round(value)
  return value + '\xB0'
})

Vue.filter('percent', function (value) {
  if (!value) return ''
  value = value * 100
  return value + '%'
})

Vue.filter('round', function (value) {
  if (!value) return ''
  value = Math.round(value)
  return value
})

Vue.filter('formatDate', function (value) {
  if (!value) return ''
  value = new Date(value*1000);
  value = moment(value).format('ddd DD')
  return value
})

Vue.filter('formatTime', function (value) {
  if (!value) return ''
  value = new Date(value*1000);
  value = moment(value).format('h:mm a')
  return value
})
