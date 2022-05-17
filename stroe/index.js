import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
	  logindata:{}
  },
  mutations: {
	  //添加登录数据
	  updatauser(state,logindata){
		  state.logindata = logindata//将用户数据更新到state中
	  }
  },
  actions: {
  },
  modules: {
  }
})
export default store
