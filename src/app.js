import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'

import App from '@/App.vue'

Vue.use(Vue2TouchEvents)

Vue.config.productionTip = false

export const app = new Vue({
  el: '#app',
  render: h => h(App),
})
