<template>
	<view>
		<ul v-for="(item,index) in songList" :key="item.id">
			<li @click="songdetile(item.id,item.name,item.al.picUrl)">
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
				<hr/>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords:"",
				songList:[]
			}
		},
		onLoad(option) {
			// console.log(option.keywords);
			this.keywords = option.keywords
		},
		onReady() {
		this.getserach()	
		},
		methods: {
			//点击前往歌曲详情页面
			songdetile(id,name,...picUrl){ 
				let a =picUrl.toString()
				//传递参数过长会被截断，需要转换一下
				let imgUrl = encodeURIComponent(JSON.stringify(a))
				uni.navigateTo({
					url:`../Songdetails/Songdetails?id=${id}&name=${name}&imgUrl=${imgUrl}`
				})
			},
			//获取搜索详情
			async getserach(){
				const {keywords} = this
				if (keywords.trim() == ''){
					return
				}
				else{
					let {data} = await uni.$http.get(`/cloudsearch/suggest?keywords=${keywords}`)
					this.songList = data.result.songs
				}
			
			}
		}
	}
</script>

<style lang="less" scoped> 
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
</style>