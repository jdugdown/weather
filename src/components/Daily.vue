<template>
  <div class="daily">
    <h2>Weekly Forecast</h2>
    <div class="daily-forecast">
      <div class="day" v-for="day in forecast.data">
        <span class="day__date">{{ day.time | formatDate }}</span>
        <span class="day__icon" :class="'day__icon--' + day.icon">{{ day.icon }}</span>
        <span class="day__temps">{{ day.temperatureHigh | round }} <small>{{ day.temperatureLow | round }}</small></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Daily',
  props: [
    'forecast',
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
