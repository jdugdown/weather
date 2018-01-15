<template>
  <div class="hourly">
    <h2>Hourly Forecast</h2>
    <p>{{ forecast.summary }}</p>
  </div>
</template>

<script>
export default {
  name: 'Hourly',
  props: [
    'forecast',
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
