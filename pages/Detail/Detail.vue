<template>
	<view>
		<view class="wrap" ref="wrap" :style="{ 'background': (id ==2884035 ?  background[3].color : 
		id ==19723756 ?  background[0].color : id ==3778678 ? background[2].color : background[1].color)}">
		
			<view class="soar" v-for="item in Listdata" :key="item.id">
				<view class="soarimg">
					<img :src="item.coverImgUrl" alt="">
				</view>
				<view class="soardata">
					<text class="taile">{{item.name}}</text>
					<view class="logobox">
						<view class="logo">
							<img src="../../static/logosmale.png" alt="">
						</view>
						<text class="name">网易云音乐</text>
					</view>
					<text class="mesge">{{item.description}}</text>
				</view>
			</view>
			<button class="square">
				<u-icon name="share-square"></u-icon>分享给微信好友
			</button>
		</view>
		<view class="content">
			<view class="header">
				<u-icon name="play-circle" size="27"></u-icon>
				<p>播放全部</p>
				<text>(共{{songList.length}}首)</text>
			</view>
			<ul v-for="(item,index) in songList" :key="item.id">
				<li @click="songdetile(item.id,item.name)">
					<text>{{index+1}}</text>
					<view class="namebox">
						<text class="name">{{item.name}}</text>
						<view class="songname">
							<view v-for="newitem in item.ar" :key="newitem.id">
								<text>{{newitem.name}}/</text>
							</view>
							<text class="">
								{{item.al.name}}
							</text>
						</view>
					</view>
					<view class="icon">
						<u-icon name="play-circle" size="30"></u-icon>
					</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				Listdata: [],
				songList: [],
				background: [{
						id: 19723756,
						color: '#F375AB'
					},
					{
						id: 2884035,
						color: '#3ECABD'
					},
					{
						id: 3778678,
						color: '#F97C6F'
					},
					{
						id: 3779629,
						color: '#58C1EB'
					}
				]
			}
		},
		onLoad(res) {
			this.id = res.id
			// uni.setNavigationBarColor(OBJECT)
		},
		onReady(){
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				// backgroundColor:
			})
		},
		mounted() {
			this.getdatil()
			const wrap = this.$refs.wrap
			console.log(1);
		},
		methods: {
			//点击前往歌曲详情页面
			songdetile(id,name){
				console.log(id);
				uni.navigateTo({
					//	url:`../../pages/Detail/Detail?id=${id}`
					url:`../Songdetails/Songdetails?id=${id}&name=${name}`
				})
			},
			//获取歌单详情页面
			async getdatil() {
				const {
					id
				} = this
				let {
					data
				} = await uni.$http.get(`/playlist/detail?id=${id}`)
				this.Listdata.push(data.playlist)
				this.songList = data.playlist.tracks
				console.log(...this.songList.splice(0,1));
				//http://localhost:3000/song/url?id=1947537070从列表点进去获取取歌曲详情
				}
		}
	}
</script>

<style lang="less" scoped>
	.songsheet {
		width: 100%;
		font-size: 25upx;
		color: white;
		padding-top: 20upx;
		text-align: center;
	}

	.wrap {
		width: 100%;
		height: 500upx;
		background-color: #F375AB;

	}

	.square {
		width: 260upx;
		margin: auto;
		border: 1px white solid;
		border-radius: 20upx;
		font-weight: 600;
		color: white;
		margin-top: 60upx;
		display: flex;
		align-items: center;
		font-size: 20upx;
		background: none;
	}

	.soar {
		display: flex;
		margin-left: 5%;
		margin-right: 5%;
		padding-top: 90upx;
		.soarimg {
			height: 200upx;
			width: 420upx;
			border-radius: 10upx;

			img {
				border-radius: 10upx;
				width: 100%;
				height: 100%;
			}
		}

		.soardata {
			margin-left: 5%;
			width: 100%;
			display: flex;
			flex-direction: column;
			font-size: 18upx;
			color: aliceblue;

			// line-height: 40upx;
			.taile {
				font-size: 29upx;
				font-weight: 500;
			}

			.logobox {
				margin-top: 30upx;
				display: flex;

				.name {
					font-size: 24upx;
					margin-left: 3%;
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

			.mesge {
				margin-top: 30upx;
			}
		}
	}

	.content {
		width: 100%;
		// height: 3000upx;
		background-color: white;
		margin-top: -30upx;
		border-radius: 40upx;
			ul{
				padding-left: 4%;
				
				li{
					margin-top: 30upx;
					align-items: center;
					display: flex;
					.icon{
						position: absolute;
						right: 4%;
					}
					.namebox{
						margin-left: 4%;
						display: flex;
						font-size: 25upx;
						flex-direction: column;
						.name{
							font-size: 35upx;
						}
						.songname{
							display: flex;
							margin-top: 10upx;
							color: #B7B7B7;
						}
					}
				}
			}
		.header {
			display: flex;
			padding-left: 5%;
			padding-top: 5%;
			align-items: center;
			font-size: 37upx;

			p {
				margin-left: 3%;
			}

			text {
				margin-left: 3%;
				color: #DBDBDB;
				font-size: 34upx;
			}
		}
	}
</style>
