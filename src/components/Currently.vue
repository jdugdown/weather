<template>
  <div class="currently">
    <p><strong>time:</strong> {{ forecast.time }}</p>
    <p><strong>summary:</strong> {{ forecast.summary }}</p>
    <p><strong>icon:</strong> {{ forecast.icon }}</p>
    <p><strong>temperature:</strong> {{ forecast.temperature }}</p>
    <p><strong>apparentTemperature:</strong> {{ forecast.apparentTemperature }}</p>
    <p><strong>dewPoint:</strong> {{ forecast.dewPoint }}</p>
    <p><strong>humidity:</strong> {{ forecast.humidity }}</p>
    <p><strong>pressure:</strong> {{ forecast.pressure }}</p>
    <p><strong>windSpeed:</strong> {{ forecast.windSpeed }}</p>
    <p><strong>windBearing:</strong> {{ forecast.windBearing }}</p>
    <p><strong>cloudCover:</strong> {{ forecast.cloudCover }}</p>
    <p><strong>unIndex:</strong> {{ forecast.unIndex }}</p>
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
