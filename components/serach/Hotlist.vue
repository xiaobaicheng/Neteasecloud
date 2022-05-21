<template>
	<view class="Hotsearch">
		<text class="hotde">热搜榜</text>
		<ul v-for="(item,index) in searchhot" :key="index">
			<li @click="word(item.searchWord)">
				<view class="Serial">
					<i :class="'indexi'+(index+1)">{{index + 1}}</i>
					{{item.searchWord}}
				</view>
				<text class="hot">{{item.score}}</text>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		name: "Hotlist",
		data() {
			return {
				searchhot: []
			}
		},
		onReady() {
			this.getsearch()
		},
		methods: {
			word(value){
				this.$emit('getData',value)
			},
			async getsearch() {
				let {
					data
				} = await uni.$http.get('/search/hot/detail')
				this.searchhot = data.data
			}
		}
	}
</script>

<style lang="less" scoped>
	.Hotsearch{
		.hotde{
			margin-left: 5%;
			padding-top: 20upx;
		}
		ul{
			line-height: 100upx;
			margin-left: 5%;
			margin-right: 5%;
			font-family: monospace;
			li{
				display: flex;
				font-size: 30upx;
				justify-content: space-between;
				.Serial{
					display: flex;
					i{
						padding-right: 70upx;
					}
					.indexi1{
						color: red;
					}
					.indexi2{
						color: red;
					}	.indexi3{
						color: red;
					}
				}
				.hot{
	
				}
			}
		}
	}
</style>
