<template>
	<view>
		<view class="search">
			<u-search v-model="search" :show-action="false" @change="change" placeholder="搜索音乐"></u-search>
		</view>
		<Hotlist v-show="isSreach" @getData="teatData"/>
		<view class="search" v-show="!isSreach">
			<text class="serachname">搜索‘{{search}}’</text>
			<view class="Aftersearch" >
				<ul v-for="item in seachData" :key="item.feature">
					<li @click="fetseachData(item.keyword)">
					<u-icon name="search" size="28"></u-icon>	{{item.keyword}}
					</li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
	import Hotlist from "../../components/serach/Hotlist.vue"
	export default {
		components: {
			Hotlist
		},
		data() {
			return {
				search: "",
				isSreach:true,
				seachData:[]
			}
		},
		watch: {
			search(newvalue, oldvalue) {
				// console.log(newvalue,oldvalue);
			}
		},
		created() {
		},
		methods: {
			fetseachData(keywords){
			uni.navigateTo({
				url:`./../Serachdetil/Serachdetil?keywords=${keywords}`
			})
	
			},
			//获取子组件的数据
			teatData(data){
				this.search += data
			},
			async change(e) {
				if (e.trim() == ''){return} else{
					let res = await uni.$http.get(`/search/multimatch?keywords=${e}`)
					let {
						data
					} = await uni.$http.get(`/search/suggest?keywords=${e}&type=mobile`)
					if(data.code == 200 ){
						this.isSreach = false
					}
					this.seachData  = data.result.allMatch
				}
		
			},
		}
	}
</script>

<style lang="less" scoped>
	.search {
		margin-right: 5%;
		margin-left: 5%;
		margin-top: 5%;
	}
	.serachname{
		color: #2b85e4;
	}
	.Aftersearch{
		ul{
			line-height: 100upx;
			li{
				display: flex;
			}
		}
	}
</style>
