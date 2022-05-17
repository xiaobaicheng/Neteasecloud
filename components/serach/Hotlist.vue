<template>
	<view class="Hotsearch">
		<ul v-for="(item,index) in searchhot" :key="index">
			<li>
				<view class="Serial">
					<i>{{index + 1}}</i>
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
		created() {
			this.getsearch()
		},
		methods: {
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
		ul{
			line-height: 100upx;
			margin-left: 5%;
			margin-right: 5%;
			li{
				display: flex;
				justify-content: space-between;
				.Serial{
					display: flex;
					i{
						padding-right: 70upx;
					}
				}
				.hot{
	
				}
			}
		}
	}
</style>
