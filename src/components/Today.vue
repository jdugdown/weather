<template>
  <div class="today">
    <h2>Today</h2>
    <div class="today__details">
      <div class="today__summary">
        <h6>Summary:</h6>
        <p>{{ forecast.summary }}</p>
      </div>
      <div class="today__temps">
        <h6>High:</h6>
        <span>{{ forecast.temperatureHigh | temperature }}</span>
        <h6>Low:</h6>
        <span>{{ forecast.temperatureLow | temperature }}</span>
      </div>
      <div class="today__sun">
        <h6>Sunrise:</h6>
        <img src="/static/img/icon-sunrise.svg" alt="sunrise" width="36" height="36">
        <span>{{ forecast.sunriseTime | formatTime }}</span>
        <h6>Sunset:</h6>
        <img src="/static/img/icon-sunset.svg" alt="sunset" width="36" height="36">
        <span>{{ forecast.sunsetTime | formatTime }}</span>
      </div>
      <div class="today__moon">
        <h6>Moon Phase:</h6>
        <span>{{ forecast.moonPhase | percent }} Illuminated</span>
      </div>
      <div class="today__chanceofprecip">
        <h6>Precipitation:</h6>
        <svg class="donut" width="100" height="100" viewBox="0 0 100 100">
          <circle class="donut__background" cx="50" cy="50" r="46" stroke-width="8" />
          <circle class="donut__fill" cx="50" cy="50" r="46" stroke-width="8" stroke-dasharray="289.0265" :stroke-dashoffset="289.0265 * (1 - forecast.precipProbability)" />
          <text class="donut__value" text-anchor="middle" x="52%" y="56%" fill="#fff">{{ forecast.precipProbability | percent }}</text>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Today',
  props: [
    'forecast',
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
