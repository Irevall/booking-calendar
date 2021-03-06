import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faChevronLeft,
  faChevronRight,
  faStar,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'

import {

} from '@fortawesome/free-regular-svg-icons'

import {

} from '@fortawesome/free-brands-svg-icons'

const icons = [
  // fas
  faChevronLeft,
  faChevronRight,
  faStar,
  faAngleDoubleRight,

  // far

  // fab
]

library.add(...icons)

export default {
  install (Vue) {
    Vue.component('font-awesome-icon', FontAwesomeIcon)
  }
}
