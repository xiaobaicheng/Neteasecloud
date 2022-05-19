<template>
	<view class="bij">
		<view class="wrap"
			:style="{'backgroundImage': 'url(' + picurl + ')',backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat','filter':'blur(8px)',}">
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
	</view>
</template>

<script>
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
				lrc: []
			}
		},
		onLoad(res) {
			uni.setNavigationBarTitle({
				title: res.name
			});
			this.id = res.id
			this.picurl = JSON.parse(decodeURIComponent(res.imgUrl))

		},
		onReady() {
			this.getsongurl()
			this.getlyric()
			setTimeout(() => {
				this.songupdata()
			}, 1000)
		},
		methods: {
			//操作歌曲
			songupdata() {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.loop = true;
				innerAudioContext.src = this.songurl;
				console.log(innerAudioContext.src);
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
					// console.log(innerAudioContext.duration);
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
			}
		}
	}
</script>

<style lang="less" scoped>
	.bij{
		
    position:relative;

	}
	.wrap {
		position: absolute;
		top: 0px;
		right: 0px;
		height: 100%;
		width: 100%;
		z-index: -1;
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
</style>
