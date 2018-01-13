<template>
  <div class="currently">
    <p><strong>time:</strong> {{ forecast.time | formatDate }}</p>
    <p><strong>summary:</strong> {{ forecast.summary }}</p>
    <p><strong>icon:</strong> {{ forecast.icon }}</p>
    <p><strong>temperature:</strong> {{ forecast.temperature | temperature }}</p>
    <p><strong>apparentTemperature:</strong> {{ forecast.apparentTemperature | temperature }}</p>
    <p><strong>dewPoint:</strong> {{ forecast.dewPoint | temperature }}</p>
    <p><strong>humidity:</strong> {{ forecast.humidity | percent }}</p>
    <p><strong>pressure:</strong> {{ forecast.pressure | round }}</p>
    <p><strong>windSpeed:</strong> {{ forecast.windSpeed | round }}</p>
    <p><strong>windBearing:</strong> {{ forecast.windBearing }}</p>
    <p><strong>cloudCover:</strong> {{ forecast.cloudCover | percent }}</p>
    <p><strong>uvIndex:</strong> {{ forecast.uvIndex }}</p>
    <p><strong>visibility:</strong> {{ forecast.visibility }}</p>
  </div>
</template>

<script>
export default {
  name: 'Currently',
  props: [
    'forecast',
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
