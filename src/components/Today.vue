<template>
  <div class="today">
    <h2>Today</h2>
    <div class="today__details">
      <div class="today__summary">
        <h6>Summary:</h6>
        <p>{{ forecast.summary }}</p>
      </div>
      <div class="today__detail today__detail--temps">
        <h6>Temperature:</h6>
        <span class="high">{{ forecast.temperatureHigh | temperature }}</span>
        <span class="low">{{ forecast.temperatureLow | temperature }}</span>
        <h6>Wind:</h6>
        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" :style="'transform: rotate(' + forecast.windBearing + 'deg);'" width="24" height="24"><path d="M20.485 372.485l99.029 99.03c4.686 4.686 12.284 4.686 16.971 0l99.029-99.03c7.56-7.56 2.206-20.485-8.485-20.485H156V44c0-6.627-5.373-12-12-12h-32c-6.627 0-12 5.373-12 12v308H28.97c-10.69 0-16.044 12.926-8.485 20.485z"/></svg> {{ forecast.windSpeed | round }}mph</span>
      </div>
      <div class="today__detail today__detail--sun">
        <h6>Sunrise:</h6>
        <img src="/static/img/icon-sunrise.svg" alt="sunrise" width="36" height="36">
        <span>{{ forecast.sunriseTime | formatTime }}</span>
        <h6>Sunset:</h6>
        <img src="/static/img/icon-sunset.svg" alt="sunset" width="36" height="36">
        <span>{{ forecast.sunsetTime | formatTime }}</span>
      </div>
      <div class="today__detail today__detail--moonphase">
        <h6>Moon Phase:</h6>
        <img :src="'/static/img/icon-moon-' + moonphaseIcon + '.svg'" :alt="moonphase" width="60" height="60">
        <span>
          {{ moonphase }}
          <small>{{ moonphaseIllumination | percent }} Illuminated</small>
        </span>
      </div>
      <div class="today__detail today__detail--donuts">
        <div class="today__detail today__detail--humidity">
          <h6>Humidity:</h6>
          <svg class="donut" width="100" height="100" viewBox="0 0 100 100">
            <circle class="donut__background" cx="50" cy="50" r="46" stroke-width="8" />
            <circle class="donut__fill" cx="50" cy="50" r="46" stroke-width="8" stroke-dasharray="289.0265" :stroke-dashoffset="289.0265 * (1 - forecast.humidity)" />
            <text class="donut__value" text-anchor="middle" x="52%" y="56%" fill="#fff">{{ forecast.humidity | percent }}</text>
          </svg>
        </div>
        <div class="today__detail today__detail--chanceofprecip">
          <h6>Precipitation:</h6>
          <svg class="donut" width="100" height="100" viewBox="0 0 100 100">
            <circle class="donut__background" cx="50" cy="50" r="46" stroke-width="8" />
            <circle class="donut__fill" cx="50" cy="50" r="46" stroke-width="8" stroke-dasharray="289.0265" :stroke-dashoffset="289.0265 * (1 - forecast.precipProbability)" />
            <text class="donut__value" text-anchor="middle" x="52%" y="56%" fill="#fff">{{ forecast.precipProbability | percent }}</text>
          </svg>
        </div>
        <div class="today__detail today__detail--cloudcover">
          <h6>Cloud Cover:</h6>
          <svg class="donut" width="100" height="100" viewBox="0 0 100 100">
            <circle class="donut__background" cx="50" cy="50" r="46" stroke-width="8" />
            <circle class="donut__fill" cx="50" cy="50" r="46" stroke-width="8" stroke-dasharray="289.0265" :stroke-dashoffset="289.0265 * (1 - forecast.cloudCover)" />
            <text class="donut__value" text-anchor="middle" x="52%" y="56%" fill="#fff">{{ forecast.cloudCover | percent }}</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Today',
  props: [
    'forecast',
  ],
  computed: {
    moonphase: function() {
      var moonphase = this.forecast.moonPhase

      if (moonphase >= 0.00 && 0.01 >= moonphase) {
        moonphase = 'New'
      } else if (moonphase >= 0.02 && 0.23 >= moonphase) {
        moonphase = 'Waxing Crescent'
      } else if (moonphase >= 0.24 && 0.26 >= moonphase) {
        moonphase = 'First Quarter'
      } else if (moonphase >= 0.27 && 0.48 >= moonphase) {
        moonphase = 'Waxing Gibbous'
      } else if (moonphase >= 0.49 && 0.51 >= moonphase) {
        moonphase = 'Full'
      } else if (moonphase >= 0.52 && 0.73 >= moonphase) {
        moonphase = 'Waning Gibbous'
      } else if (moonphase >= 0.74 && 0.76 >= moonphase) {
        moonphase = 'Last Quarter'
      } else if (moonphase >= 0.77 && 0.98 >= moonphase) {
        moonphase = 'Waxing Crescent'
      } else if (moonphase >= 0.99 && 1.00 >= moonphase) {
        moonphase = 'New'
      } else {
        moonphase = 'error'
      }

      return moonphase
    },
    moonphaseIcon: function() {
      var moonphaseIcon = this.moonphase
      return moonphaseIcon.replace(/\s+/g, '-').toLowerCase()
    },
    moonphaseIllumination: function() {
      var illumination = this.forecast.moonPhase

      if (illumination <= 0.50) {
        illumination = illumination * 2
      } else {
        illumination = 1 - illumination
        illumination = illumination * 2
      }

      return illumination
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
