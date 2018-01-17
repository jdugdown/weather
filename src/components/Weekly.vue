<template>
  <div class="weekly">
    <h2>Weekly Forecast</h2>
    <p>{{ forecast.summary }}</p>
    <div class="weekly-forecast">
      <div class="day" v-for="day in forecast.data">
        <span class="day__date">{{ day.time | formatDate }}</span>
        <span class="day__icon" :class="'day__icon--' + day.icon">
          <img :src="'./static/img/icon-partly-cloudy-day.svg'" alt="partly cloudy" width="60" height="60" v-if="day.icon == 'partly-cloudy-night'">
          <img :src="'./static/img/icon-clear-day.svg'" alt="clear" width="60" height="60" v-else-if="day.icon == 'clear-night'">
          <img :src="'./static/img/icon-' + day.icon + '.svg'" :alt="day.icon" width="60" height="60" v-else>
        </span>
        <span class="day__temps">{{ day.temperatureHigh | round }} <small>{{ day.temperatureLow | round }}</small></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Weekly',
  props: [
    'forecast',
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
