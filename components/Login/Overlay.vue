<template>
	<view class="wrap">
		<view class="login">
			<view class="span">检测到该微信号未注册过云音乐账号，请尝试使用手机号进行登录</view>
			<view class="button">
				<u-button text="微信一键授权登录" size="normal" type="error" @click="Login"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Overlay",
		data(){
			return{
				
			}
		},
		methods:{
			Login(){
				uni.getUserProfile({
					desc:"登录接口",
					success: (res) => {
						uni.setStorage({
							key:"Token",
							data:{...res.userInfo},
							
						})
						this.show = false
						const value = uni.getStorageSync('Token')
						this.updatauser({...value})
					},
					fail: (err) => {
						uni.$showMsg('你已取消登录')
					}
				})	
			}
		}
	}
</script>

<style lang="less" scoped>
	.login {
		text-align: center;
		align-items: center;

		.span {
			width: 80%;
			padding-left: 10%;
			margin-top: 2%;
		}

		.button{
			width: 80%;
			margin-top: 5%;
			margin-left: 10%;
			& /deep/ u-button{
				border-radius: 30upx;
			}
		}
	}
</style>
