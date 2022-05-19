<template>
	<view class="">
		<header>
			<view class="havtar">
				<!-- <u-avatar :src="src" v-show="isloginshow"></u-avatar> -->
				<u-avatar :src="userdata ? userdata.avatarUrl : src" v-show="!isloginshow"></u-avatar>
				<text v-show="isloginshow">未登录</text>
				<text v-show="!isloginshow">{{userdata.nickName}}</text>
			</view>
			<view class="button" v-show="isloginshow">
				<u-button text="立即登录" size="normal" plain shape="circle" type="warning" @click="login"></u-button>
			</view>
			<view class="button" v-show="!isloginshow">
				<u-button v-show="!isloginshow" text="退出登录" size="normal" plain shape="circle" type="warning"
					@click="updatalogin"></u-button>
			</view>
		</header>
		<view class="u-demo-block__content">
			<view class="u-page__tag-item" @click="seach">
				<u-search :show-action="false"></u-search>
			</view>
		</view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			:duration="duration">
			<swiper-item>
				<view class="swiper-item uni-bg-red">
					<img src="../../static/img/1645586879166.jpg" alt="">
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-red" @click="loginphone">
					<img src="../../static/img/1645586879166.jpg" alt="">
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-red">
					<img src="../../static/img/1645586879166.jpg" alt="">
				</view>
			</swiper-item>
		</swiper>
		<u-overlay :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<Overlay />
				</view>
			</view>
		</u-overlay>
		<List />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import Overlay from "../../components/Login/Overlay.vue"
	import List from "@/components/List/List.vue"
	export default {
		components: {
			Overlay,
			List
		},
		data() {
			return {
				src: "https://cdn.uviewui.com/uview/album/noExist.jpg",
				autoplay: true,
				show: true,
				isloginshow: true,
				userdata: []
			}
		},
		computed: {
			...mapState(['logindata'])
		},
		onLoad() {
			const value = uni.getStorageSync('Token')
			//如果登录数据里面未有数据，则弹出提示登录
			if (JSON.stringify({
					...value
				}) == "{}") {
				this.show = true
			} else {
				this.isloginshow = false
				//如果登录数据里面有数据，则不弹出
				this.show = false
			}
			this.userdata = value
		},
		methods: {
			loginphone (){
			uni.navigateTo({
				url:'../Loginphone/Loginphone'
			})	
			},
			...mapMutations(['updatauser']),
			//退出登录
			updatalogin() {
				this.userdata = []
				this.isloginshow = true
				uni.removeStorage({
					key: 'Token',
					success: function(res) {
					}
				});
			},
			//微信授权登录
			login() {
				uni.getUserProfile({
					desc: "登录接口",
					success: (res) => {
						uni.setStorage({
							key: "Token",
							data: {
								...res.userInfo
							},

						})
						const value = uni.getStorageSync('Token')
						this.userdata = value
						this.isloginshow = false
						this.updatauser({
							...value
						})
					},
					fail: (err) => {
						uni.$showMsg('你已取消登录')
					}
				})
			},
			seach() {
				uni.navigateTo({
					url: '/pages/Serach/Serach'
				});
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 150%;
		width: 90%;
		margin-left: 5%;

		.rect {
			width: 100%;
			border-radius: 10rpx;
		}
	}

	.rect {
		width: 120px;
		height: 120px;
		background-color: #fff;
	}

	.swiper {
		margin-top: 30rpx;
	}

	header {
		display: flex;
		margin-top: 30upx;
		margin-left: 5%;
		margin-right: 5%;
		justify-content: space-between;
		align-items: center;

		.havtar {
			display: flex;
			align-items: center;

			text {
				padding-left: 10upx;
			}
		}

		.button {
			width: 170upx;

			color: black;

		}

		.button /deep/ .u-button {
			color: black;
			height: 60upx;
			border: 1px sandybrown solid;
		}
	}

	.u-demo-block__content {
		width: 90%;
		margin-left: 5%;
		margin-top: 2%;
	}

	.swiper-item {
		height: 400upx;
		width: 90%;
		margin-left: 5%;
		border-radius: 15upx;

		img {
			border-radius: 15upx;
			height: 100%;
			width: 100%;
		}
	}
</style>
