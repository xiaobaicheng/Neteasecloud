<template>
	<view>
	<view class="logobox">
		<view class="logo">
			<img src="../../static/logosmale.png" alt="">
		</view>
		<text class="name">网易云音乐</text>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(res) {
			uni.setNavigationBarTitle({
			    title: res.name
			});
			console.log(res);
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
		.logobox {
				margin-top: 30upx;
				display: flex;
				margin-left: 3%;
				.name {
					font-size: 24upx;
					margin-left: 1%;
				}

				.logo {
					height: 36upx;
					width: 36upx;
					border-radius: 50%;

					img {
						border-radius: 50%;
						width: 100%;
						height: 100%;
					}
				}
			}
</style>
