import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: getItem('user') || null,
    userChannels: getItem('userChannels') || []
  },
  mutations: {
    updatedUser (state, payload) {
      state.userInfo = payload.userInfo
      setItem('user', state.userInfo)
    }
  },
  actions: {
    updatedUser ({ commit }, user) {
      commit('updatedUser', user)
    }
  },
  modules: {
  }
})
