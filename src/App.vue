<template>
  <div id="app" class="app">
    <h1 class="title">World Weather</h1>

    <template v-if="hasCurrentCity">
      <p class="description">Watch weather in your current location</p>
      <app-weather :city="currentCity" :is-current-location="true" @reloadItem="reloadItem" />
    </template>

    <app-weather-list :cities="cities" @removeItem="removeItem" @reloadItem="reloadItem" />

    <button class="btn-add-weather" :class="{'is-hide' : isShowModal}" @click="toggleModal" />

    <app-modal v-if="isShowModal" @closeModal="toggleModal">
      <app-form @submitForm="submitForm" @closeModal="toggleModal" />
    </app-modal>
  </div>
</template>

<script>
import AppModal from '@/components/Modal'
import AppForm from '@/components/Form'
import AppWeather from '@/components/Weather'
import AppWeatherList from '@/components/WeatherList'
import { API_URL, API_KEY } from '@/helpers/vars'
import { getCoords, serializeData } from '@/helpers/utils'

export default {
  name: 'App',
  components: {
    AppModal,
    AppForm,
    AppWeather,
    AppWeatherList
  },
  data: () => ({
    cities: [],
    currentCity: {},
    isShowModal: false
  }),
  computed: {
    hasCurrentCity () {
      return Object.keys(this.currentCity).length
    }
  },
  methods: {
    async fetchCurrentCity () {
      const coords = await getCoords()

      if (!coords) return

      const { lat, lon } = coords

      try {
        const response = await fetch(`${API_URL}?&units=metric&lang=en&appid=${API_KEY}&lat=${lat}&lon=${lon}`)
        const data = await response.json()

        if (data.cod === 200) {
          this.currentCity = serializeData(data)
        } else {
          alert(`ERROR (${data.cod}): ${data.message}`)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async submitForm (value) {
      try {
        const response = await fetch(`${API_URL}?&units=metric&lang=en&appid=${API_KEY}&q=${value}`)
        const data = await response.json()

        if (data.cod === 200) {
          if (!this.isSelectedCity(data.id)) {
            this.cities.push(serializeData(data))
            this.toggleModal()
          } else {
            alert('This city has already been selected')
          }
        } else {
          alert(`ERROR (${data.cod}): ${data.message}`)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async reloadItem ({ id, isCurrentLocation }) {
      try {
        const response = await fetch(`${API_URL}?&units=metric&lang=en&appid=${API_KEY}&id=${id}`)
        const data = await response.json()
        const serializedData = serializeData(data)

        if (isCurrentLocation) {
          this.currentCity = serializedData
        } else {
          const index = this.cities.findIndex(city => city.id === id)
          this.cities.splice(index, 1, serializedData)
        }
      } catch (error) {
        console.error(error)
      }
    },
    removeItem ({ id, isCurrentLocation }) {
      if (isCurrentLocation) {
        this.currentCity = {}
      } else {
        const index = this.cities.findIndex(city => city.id === id)
        this.cities.splice(index, 1)
      }
    },
    toggleModal () {
      this.isShowModal = !this.isShowModal
    },
    isSelectedCity (id) {
      return Boolean(this.cities.find(city => city.id === id))
    }
  },
  watch: {
    cities: function () {
      localStorage.setItem('cities', JSON.stringify(this.cities))
    },
    currentCity: function () {
      localStorage.setItem('currentCity', JSON.stringify(this.currentCity))
    }
  },
  mounted () {
    const currentCity = localStorage.getItem('currentCity')

    if (currentCity) {
      this.currentCity = JSON.parse(currentCity)
    } else {
      this.fetchCurrentCity()
    }

    const cities = localStorage.getItem('cities')

    if (cities) {
      this.cities = [...JSON.parse(cities)]
    }
  }
}
</script>
