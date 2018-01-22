<template>
  <div class="currently">
    <div class="overview">
      <div class="overview__top">
        <span class="overview__temperature">{{ forecast.temperature | temperature }}</span>
        <span class="overview__icon"><img :src="'./static/img/icon-' + forecast.icon + '.svg'" :alt="forecast.icon" width="96" height="96"></span>
      </div>
      <h4 class="overview__summary">{{ forecast.summary }}</h4>
    </div>

    <div class="currently__details">
      <span>Feels Like: {{ forecast.apparentTemperature | temperature }}</span>
      <span>Humidity: {{ forecast.humidity | percent }}</span>
      <span>Wind: {{ forecast.windSpeed | round }}mph <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" :style="'transform: rotate(' + forecast.windBearing + 'deg);'"><path d="M20.485 372.485l99.029 99.03c4.686 4.686 12.284 4.686 16.971 0l99.029-99.03c7.56-7.56 2.206-20.485-8.485-20.485H156V44c0-6.627-5.373-12-12-12h-32c-6.627 0-12 5.373-12 12v308H28.97c-10.69 0-16.044 12.926-8.485 20.485z"/></svg></span>
      <span>Cloud Cover: {{ forecast.cloudCover | percent }}</span>
      <span>UV Index: {{ forecast.uvIndex }}</span>
      <span>Visibility: {{ forecast.visibility | round }} mi</span>
    </div>
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
