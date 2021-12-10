<template>
  <div class="weather" :class="{ 'weather--hero': isCurrentLocation }">
    <div class="weather__header">
      <h3 class="weather__title">{{ name }}</h3>
      <p class="weather__location">{{ country }}</p>
    </div>
    <div class="weather__body">
      <ul class="weather__details">
        <li class="weather__detail">
          <span>Weather</span>
          <span>{{ city.weather }}</span>
        </li>
        <li class="weather__detail">
          <span>Temperature</span>
          <span>{{ city.temp }} °C</span>
        </li>
        <li class="weather__detail">
          <span>Humidity</span>
          <span>{{ city.humidity }} %</span>
        </li>
      </ul>
      <div class="weather__date-wrap">
        <time class="weather__date">{{ relativeTime }}</time>
      </div>
    </div>
    <div class="weather__footer">
      <div class="weather__btn-group">
        <button
          class="weather__btn btn"
          v-if="!isCurrentLocation"
          @click="onRemove(city.id)"
        >Remove</button>
        <button class="weather__btn btn" @click="onReload(city.id)">Reload</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppWeather',
  props: {
    city: {
      type: Object,
      require: true
    },
    isCurrentLocation: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    timerId: null,
    relativeTime: null
  }),
  computed: {
    name () {
      return this.isCurrentLocation
        ? `${this.city.name}, ${this.city.countryAbbr}`
        : this.city.name
    },
    country () {
      return this.isCurrentLocation ? 'Your current location' : this.city.country
    }
  },
  methods: {
    onRemove (id) {
      const { isCurrentLocation } = this
      this.$emit('removeItem', { id, isCurrentLocation })
    },
    onReload (id) {
      const { isCurrentLocation } = this
      this.$emit('reloadItem', { id, isCurrentLocation })
    },
    getRelativeTime () {
      return this.$moment(this.city.createdAt).fromNow()
    },
    setRelativeTime () {
      clearInterval(this.timerId)

      this.relativeTime = this.getRelativeTime()
      this.timerId = setInterval(() => {
        this.relativeTime = this.getRelativeTime()
      }, 1000 * 60)
    }
  },
  watch: {
    'city.createdAt': 'setRelativeTime'
  },
  created () {
    this.setRelativeTime()
  },
  destroyed () {
    clearInterval(this.timerId)
  }
}
</script>

<style scoped lang="scss">
.weather {
  padding: 20px;
  background-color: $color-white;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(10, 10, 10, 0.25);
  transition: .5s;

  @include breakpoint-min(sm) {
    padding: 24px;
  }

  &__header {
    margin-bottom: 20px;

    @include breakpoint-min(sm) {
      margin-bottom: 40px;
    }
  }

  &__title {
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 10px;

    @include breakpoint-min(md) {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    @include breakpoint-min(lg) {
      font-size: 3.2rem;
    }
  }

  &__body {
    margin-bottom: 20px;

    @include breakpoint-min(sm) {
      margin-bottom: 30px;
    }
  }

  &__details {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__detail {
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 1px solid #C4C4C4;

    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  &__date-wrap {
    margin-top: 8px;
    text-align: right;
  }

  &__date {
    color: #A8A8A8;
    line-height: 1.5;
    text-align: right;

    @include breakpoint-min(sm) {
      font-size: 1.6rem;
    }
  }

  &__btn-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    > *:not(:last-child) {
      margin-right: 30px;
    }
  }

  &--hero {
    margin: 0 auto 30px;
    max-width: 824px;

    .weather__btn {
      margin-left: auto;
    }

    @include breakpoint-min(md) {
      margin-bottom: 50px;
    }

    @include breakpoint-min(lg) {
      margin-bottom: 80px;
    }
  }
}

.weather-enter,
.weather-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
