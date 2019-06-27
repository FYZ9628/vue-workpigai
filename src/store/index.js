import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 用于拦截
export default new Vuex.Store({
  state: {
    user: {
      account: window.localStorage.getItem('user' || '[]') == null ? ''
        : JSON.parse(window.localStorage.getItem('user' || '[]')).account
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    }
  }
})
