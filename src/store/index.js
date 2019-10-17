// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    update: (state, config) => {
      Object.keys(config).map((item, key) => {
        state[item] = config[item]
      })
    }
  },
  getters: {
    count: (state) => state.count
  }
})

export default store
