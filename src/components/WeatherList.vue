<template>
  <transition-group class="weather-list" name="weather" v-if="!isEmpty" tag="div">
    <app-weather
      v-for="city in cities"
      :city="city"
      :key="city.id"
      @removeItem="$emit('removeItem', $event)"
      @reloadItem="$emit('reloadItem', $event)"
    />
  </transition-group>
  <p class="weather-list-empty" v-else>Empty List</p>
</template>

<script>
import AppWeather from '@/components/Weather'

export default {
  name: 'AppWeatherList',
  props: {
    cities: {
      type: Array,
      required: true
    }
  },
  computed: {
    isEmpty () {
      return !this.cities.length
    }
  },
  components: { AppWeather }
}
</script>

<style scoped lang="scss">
.weather-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;

  @include breakpoint-min(md) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
  }

  @include breakpoint-min(xl) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @include breakpoint-min(xxl) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.weather-list-empty {
  color: $color-gray;
  text-align: center;

  @include breakpoint-min(md) {
    font-size: 1.8rem;
  }

  @include breakpoint-min(lg) {
    font-size: 2rem;
  }
}
</style>
