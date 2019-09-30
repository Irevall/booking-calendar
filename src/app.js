import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
import icons from '@/plugins/icons'

import App from '@/App.vue'

Vue.use(Vue2TouchEvents)
Vue.use(icons)

Vue.filter('date', function (date) {
  return date.toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
})

Vue.config.productionTip = false

export const app = new Vue({
  el: '#app',
  render: h => h(App),
})
