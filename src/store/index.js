import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 用于存储登录过的用户的信息
export default new Vuex.Store({
  state: {
    account:''||localStorage.getItem('account'),
    password:''||localStorage.getItem('password'),
    name:''||localStorage.getItem('name')
  },
  mutations: {
    login (state, user) {

      state.account=user.account
      localStorage.setItem('account',user.account)

      state.password=user.password
      localStorage.setItem('password',user.password)

      if(user.name==null){
        state.name=user.name
        localStorage.setItem('name','管理员')
      }else{
        state.name=user.name
        localStorage.setItem('name',user.name)
      }

    },
    logout(state){
      localStorage.clear()
      state.account=null
      state.password=null
      state.name=null
    }
  },
  getters : {
    account: (state) => state.account,
    password:(state) => state.password,
    name:(state) => state.name
  }
})
