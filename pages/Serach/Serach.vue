<template>
	<view>
		<view class="search">
			<u-search v-model="search" :show-action="false" @change="change" placeholder="搜索音乐"></u-search>
		</view>
		<Hotlist v-show="isSreach"/>
		<view class="search" v-show="!isSreach">
			<text class="serachname">搜索‘{{search}}’</text>
			<view class="Aftersearch" >
				<ul v-for="item in seachData" :key="item.feature">
					<li>
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
			async change(e) {
				let res = await uni.$http.get(`/search/multimatch?keywords=${e}`)
				console.log(res.data.result.artist);
				let {
					data
				} = await uni.$http.get(`/search/suggest?keywords=${e}&type=mobile`)
				if(data.code == 200 ){
					this.isSreach = false
				}
				this.seachData  = data.result.allMatch
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
