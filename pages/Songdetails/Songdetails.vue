<template>
	<view class="bij">
		<view class="wrap"
			:style="{'backgroundImage': 'url(' + picurl + ')',backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat','filter':'blur(200px)',}">
		</view>
		<!-- <div class="img" :style="{backgroundImage: 'url(' + srcImgUrl + ')', backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}"> -->
		<view class="logobox">
			<view class="logo">
				<img src="../../static/logosmale.png" alt="">
			</view>
			<text class="name">网易云音乐</text>
		</view>
		<view class="bigimg">
			<view class="imgbox">
				<image :src="picurl" mode=""></image>
			</view>
		</view>
		<view class="audio-play" @click="changePlayState" v-show="audioPlay">
			<u-icon name="pause-circle" size="30"></u-icon>
		</view>
		<view class="audio-play" @click="changePlayState" v-show="!audioPlay">
			<u-icon name="play-circle" size="30"></u-icon>
		</view>
		<view class="loop">歌曲已取消自动循环*</view>
		<view class="lycir" v-for="(item,index) in lyric" :key="index">
			<text>{{item}}</text>
		</view>
		<view class="like">
			<text>喜欢这首歌的人也喜欢听</text>
			<button>一键收听</button>
		</view>
		<ul v-for="item in simisongdata" :key="item.id">
			<li class="simi" @click="simiSong(item.id,item.album.blurPicUrl,item.name)">
				<view class="priimg">
					<image :src="item.album.blurPicUrl" mode=""></image>
				</view>
				<view class="songname">
					<text>{{item.name}}</text>
					<text class="alubumname">{{item.album.company}}-{{item.album.name}}</text>
				</view>
				<view class="icon">
					<u-icon name="play-circle" size="30"></u-icon>
				</view>
			</li>
		</ul>
		<view class="like">
			<text>精彩评论</text>
		</view>
		<ul class="comment" v-for="item in Comment" :key="item.commentId">
			<li class="commentbox">
				<view class="commenttop">
					<view class="avtar">
						<image :src="item.user.avatarUrl" mode=""></image>
					</view>
					<view class="actvarname">
						<text>{{item.user.nickname}}</text>
						<text>{{item.timeStr}}</text>
					</view>
					<view class="give">
						<text>{{item.likedCount}}</text>
				<u-icon name="thumb-up"></u-icon>
				
					</view>
				</view>
				<view class="commentbuttom">
					<text>{{item.content}}</text>
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	export default {
		data() {
			return {
				id: "",
				songdetail: [],
				songurl: "",
				audioPlay: true,
				innerAudioContext: null,
				picurl: "",
				lyric: "",
				lrc: [],
				simisongdata: [],
				Comment:[]
			}
		},
		computed: {
			...mapState(['addsong'])
		},
		onLoad(res) {
			this.upsddstng()
			console.log(this.addsong);
			console.log(res);
			uni.setNavigationBarTitle({
				title: res.name
			});
			this.id = res.id
			this.picurl = JSON.parse(decodeURIComponent(res.imgUrl))

		},
		onShow() {
			// if (this.addsong !== 1) {
			// 	console.log("想关闭上一首");
			// 	this.innerAudioContext.onPlay(()=>{
			// 		console.log("sakjhuywar");
			// 	})
			// }
		},
		onReady() {
			this.getsongurl()
			this.getlyric()
			setTimeout(() => {
				this.songupdata()
			}, 500)
			this.simisong()
			this.getComment()
		},
		// onUnload() {				this.innerAudioContext.destroy()},
		methods: {
			//获取评论数据
			async getComment(){
				const {id} = this
			let {data}  =await uni.$http.get(`/comment/music?id=${id}`)
			this.Comment = data.comments
				// console.log(data.comments);
			},
			...mapMutations(['upaddsong']),
			//操作歌曲
			//监听歌曲播放
			upsddstng() {
				this.upaddsong()
			},
			songupdata() {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.loop = true;
				innerAudioContext.src = this.songurl;
				// console.log(innerAudioContext.src);
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
					this.audioPlay = true;
				});
				innerAudioContext.onPause(() => {
					console.log('暂停播放');
					this.audioPlay = false;
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				this.innerAudioContext = innerAudioContext
			},
			// 录音暂停播放
			changePlayState() {
				if (this.audioPlay == false) {
					this.innerAudioContext.play();
				} else {
					this.innerAudioContext.pause()
				}
			},
			//点击推荐音乐
			async simiSong(id, blurPicUrl, name) {
				console.log(id);
				let {
					data
				} = await uni.$http.get(`/song/url?id=${id}`)
				let res = await uni.$http.get(`/lyric?id=${id}`)
				this.lyric = res.data.lrc.lyric.split(/\s*\n*\[.*?\]\s*/).filter(v => !!v)
				this.songurl = data.data[0].url
				this.picurl = blurPicUrl
				uni.setNavigationBarTitle({
					title: name
				});
				this.innerAudioContext.destroy()
				// console.log(this.songurl);
				this.songupdata()
				this.id = id
				this.simisong()

			},
			//获取歌曲url
			async getsongurl() {
				const {
					id
				} = this
				let {
					data
				} = await uni.$http.get(`/song/url?id=${id}`)
				this.songdetail = data.data
				this.songurl = this.songdetail[0].url
			},
			//获取歌词
			async getlyric() {
				const {
					id
				} = this
				let {
					data
				} = await uni.$http.get(`/lyric?id=${id}`)
				this.lyric = data.lrc.lyric.split(/\s*\n*\[.*?\]\s*/).filter(v => !!v)
			},
			//获取相似歌曲推荐/simi/song?id=347230
			async simisong() {
				const {
					id
				} = this
				let {
					data
				} = await uni.$http.get(`/simi/song?id=${id}`)
				this.simisongdata = data.songs
				// console.log(this.simisongdata);
			}

		}
	}
</script>

<style lang="less" scoped>
	.comment {
		.commentbox {
			display: flex;
			flex-direction: column;
			margin-left: 4%;
			margin-right: 4%;
			.commentbuttom{
				margin-left: 90upx;
				color: white;
			}
			.commenttop {
				display: flex;
				color: #666666;
				// flex: 3;
				align-items: center;
				.actvarname{
					margin-left: 4%;
					display: flex;
					font-size: 20upx;
					flex-direction: column;
				}
				.give{
					position: absolute;
					right: 4%;
					display: flex;
				}
				.avtar{
					height: 65upx;
					width: 65upx;
					image{
						height: 100%;
						border-radius: 50%;
						width: 100%;
					}
					border-radius: 50%;
					background-color: darkcyan;
				}
			}
		}
	}

	.like {
		display: flex;
		margin-left: 5%;
		justify-content: space-between;
		color: white;
		font-weight: 600;
		button {
			line-height: 50upx;
			background: none;
			text-align: center;
			height: 50upx;
			color: white;
			width: 200upx;
			border: 1px white solid;
			border-radius: 20upx;
		}
	}

	.bij {

		position: relative;
	}

	.wrap {
		position: absolute;
		top: 0px;
		right: 0px;
		height: 100%;
		width: 100%;
		z-index: -100;
		outline: 1px black solid;
	}

	.loop {
		margin-top: 20upx;
		color: green;
		text-align: center;
	}

	.lycir {
		text-align: center;
		line-height: 70upx;

		text {
			text-align: center;
		}
	}

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

	.bigimg {
		width: 500upx;
		height: 500upx;
		margin: auto;
		background-color: black;
		border-radius: 50%;
		display: block;
		animation: rotate 10s linear infinite;

		@keyframes rotate {
			0% {
				transform: rotateZ(0deg);
				/*从0度开始*/
			}

			100% {
				transform: rotateZ(360deg);
				/*360度结束*/
			}
		}
	}

	.imgbox {
		width: 400upx;
		height: 400upx;
		margin: auto;
		padding-top: 10%;
		border-radius: 50%;

		&:hover {
			animation-play-state: paused;
		}

		image {
			border-radius: 50%;
			width: 100%;
			height: 100%;
		}
	}

	.audio-play {
		position: absolute;
		width: 4%;
		top: 260upx;
		left: 46%;
	}

	.simi {
		display: flex;
		margin-left: 5%;
		margin-top: 20upx;
		margin-right: 5%;
		align-items: center;

		.priimg {
			height: 80upx;
			width: 80upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.songname {
			margin-left: 4%;
			display: flex;
			flex-direction: column;
			color: white;

			.alubumname {
				font-size: 20upx;
			}
		}

		.icon {
			position: absolute;
			right: 4%;
		}
	}
</style>
