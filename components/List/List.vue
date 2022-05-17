<template>
	<view class="">
		<view class="banner" v-for="item in detail" :key="item.id" @click="Getdetail(item.id)">
			<view class="bannerleft baxkone">
				<p>{{item.name}}</p>
				<text>{{item.updateFrequency}}</text>
			</view>
			<view class="bannerright">
				<ul v-for="(newitem,index) in item.tracks" :key="index">
					<li>
						<i>{{index + 1}}</i>.
						{{newitem.first}}-{{newitem.second}}
					</li>
				</ul>
			</view>
		</view>
		<view class="banner" v-for="item in detail1" :key="item.id" @click="Getdetail(item.id)">
			<view class="bannerleft baxktwo">
				<p>{{item.name}}</p>
				<text>{{item.updateFrequency}}</text>
			</view>
			<view class="bannerright">
				<ul v-for="(newitem,index) in item.tracks" :key="index">
					<li> <i>{{index + 1}}</i>.{{newitem.first}}-{{newitem.second}}</li>
				</ul>
			</view>
		</view>
		<view class="banner" v-for="item in detail2" :key="item.id" @click="Getdetail(item.id)">
			<view class="bannerleft baxkthree">
				<p>{{item.name}}</p>
				<text>{{item.updateFrequency}}</text>
			</view>
			<view class="bannerright">
				<ul v-for="(newitem,index) in item.tracks" :key="index">
					<li> <i>{{index + 1}}</i>.{{newitem.first}}-{{newitem.second}}</li>
				</ul>
			</view>
		</view>
		<view class="banner" v-for="item in detail3" :key="item.id" @click="Getdetail(item.id)">
			<view class="bannerleft baxkfive">
				<p>{{item.name}}</p>
				<text>{{item.updateFrequency}}</text>
			</view>
			<view class="bannerright">
				<ul v-for="(newitem,index) in item.tracks" :key="index">
					<li> <i>{{index + 1}}</i>.{{newitem.first}}-{{newitem.second}}</li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "List",
		data() {
			return {
				detail: [],
				detail1: [],
				detail2: [],
				detail3: [],
				detaildata: []
			}
		},
		created() {
			this.getdetail()
		},
		methods: {
			Getdetail(id){
				uni.navigateTo({
					url:`../../pages/Detail/Detail?id=${id}`
				})
			},
			async getdetail() {
				let {
					data
				} = await uni.$http.get('/toplist/detail')
				this.detail = data.list.slice(0, 1)
				this.detail1 = data.list.slice(2, 3)
				this.detail2 = data.list.slice(3, 4)
				this.detail3 = data.list.slice(1, 2)

			}
		}
	}
</script>

<style lang="less" scoped>
	.banner {
		display: flex;
		margin-left: 5%;
		margin-right: 5%;
		margin-top: 49upx;

		.bannerright {
			margin-left: 37%;

			ul {
				font-size: 23upx;
				font-family: monospace;
				li {
					margin-top: 30upx;
					display: flex;
					// line-height: 50upx;
				}
			}
		}

		.baxkone {
			background-color: #F375AB;

		}

		.baxktwo {
			background-color: #3ECABD;
		}

		.baxkthree {
			background-color: #F97C6F;
		}

		.baxkfive {
			background-color: #58C1EB;
		}

		.bannerleft {
			position: absolute;
			border-radius: 10rpx;
			width: 30%;
			height: 200upx;

			p {
				position: relative;
				left: 17%;
				top: 27%;
				font-size: 25px;
				color: white;
				font-weight: 600;

			}

			text {
				font-family: monospace;
				position: relative;
				left: 5%;
				font-size: 20upx;
				color: white;
				bottom: -40%;
			}
		}
	}
</style>
