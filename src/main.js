import Vue from 'vue'
import App from './App'
import store from './store/index'
import apiList from './http/api'
import utils from './utils/index'

Vue.prototype.$store = store
Vue.prototype.$http = apiList
Vue.prototype.$utils = utils

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
