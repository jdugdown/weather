<template>
  <div class="today">
    <h2>Today</h2>
    <p><strong>summary:</strong> {{ forecast.summary }}</p>
    <p><strong>temperatureHigh:</strong> {{ forecast.temperatureHigh | temperature }}</p>
    <p><strong>temperatureLow:</strong> {{ forecast.temperatureLow | temperature }}</p>
    <p><strong>sunriseTime:</strong> {{forecast.sunriseTime | formatTime }}</p>
    <p><strong>sunsetTime:</strong> {{forecast.sunsetTime | formatTime }}</p>
    <p><strong>moonPhase:</strong> {{ forecast.moonPhase }}</p>
    <p><strong>precipProbability:</strong> {{ forecast.precipProbability | percent }}</p>
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
