import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
	  logindata:{},
	  addsong:0,//记录添加音乐播放
  },
  mutations: {
	  //添加登录数据
	  updatauser(state,logindata){
		  state.logindata = logindata//将用户数据更新到state中
	  },
	  upaddsong(state){
		  state.addsong++
	  }
  },
  actions: {
  },
  modules: {
  }
})
export default store
