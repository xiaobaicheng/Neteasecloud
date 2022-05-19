<template>
	<view>
		<input type="text" v-model="login.phone" placeholder="请输入你的手机号">
		<input type="password" v-model="login.password" placeholder="请输入你的密码">
		<button @click="loginphone">登录</button>
			<button @click="show">看下数据</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				login:{
					phone:"",
					password:""
				}
			}
		},
		methods: {
			// 展示手机号登录存储的数据
			show(){
					const value = uni.getStorageSync('PHONE_TOKEN')
					console.log(value);
			},
			//手机号码登录
		async	loginphone(){
			let {password,phone} = this.login
				let {data} = await uni.$http.get(`/login/cellphone?phone=${phone}&password=${password}`)
				// localStorage.setItem('PHONE_TOKEN',data.token)
				console.log(data);
					uni.setStorage({
						key: "PHONE_TOKEN",
						data: {...data}
				
					})
			}
		}
	}
</script>

<style>

</style>
