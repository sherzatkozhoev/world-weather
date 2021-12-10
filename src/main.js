import Vue from 'vue'
import '@/styles/app.scss'
import App from './App.vue'
import moment from 'moment'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.prototype.$moment = moment

Vue.use(Vuelidate)

new Vue({
  render: h => h(App)
}).$mount('#app')
