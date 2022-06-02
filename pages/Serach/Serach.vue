<template>
	<view>
		<view class="search">
			<u-search v-model="search" :show-action="false" @change="change" placeholder="搜索音乐"></u-search>
		</view>
		<view class="History" v-show="isSreach">
			<view class="lishi">
				<text>历史记录</text>
				<u-icon name="trash-fill" size="25" @click="detele"></u-icon>
			</view>
			<view class="histname">
				<view class="onename" v-for="(item,index) in Historydata" :key="index"><text @click="Addto(item)">{{item}}</text></view>
			</view>
		</view>
		<Hotlist v-show="isSreach" @getData="teatData" />
		<view class="search" v-show="!isSreach">
			<text class="serachname">搜索‘{{search}}’</text>
			<view class="Aftersearch">
				<ul v-for="item in seachData" :key="item.feature">
					<li @click="fetseachData(item.keyword,search)">
						<u-icon name="search" size="28"></u-icon> {{item.keyword}}
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
				isSreach: true,
				seachData: [],
				data: "",
				list: [],
				Historydata: [],
				arr: []
			}
		},
		watch: {
			search(newvalue, oldvalue) {
			}
		},
		async onLoad() {
			let ges = await uni.getStorage({
				key: 'History'
			});
			let arr = JSON.parse(ges[1].data);
			// console.log(arr);
			this.Historydata = arr
		},
		methods: {
			//点击将历史记录加到搜索框
			Addto(item){
				this.search += item
			},
			//点击删除历史记录
			detele() {
				this.Historydata  = []
				uni.setStorage({
					key: 'History',
					data:JSON.stringify(this.list)
				});
			},
			//前往下一个页面
			async fetseachData(keywords, search) {
				let ges = await uni.getStorage({
					key: 'History'
				});
				this.arr = JSON.parse(ges[1].data);
				this.arr.unshift(search)
				uni.setStorage({
					key: 'History',
					data: JSON.stringify(this.arr) //转换为字符串形式
				});
				uni.navigateTo({
					url: `./../Serachdetil/Serachdetil?keywords=${keywords}`
				})

			},
			//获取子组件的数据
			teatData(data) {
				this.search += data
			},
			async change(e) {
				if (e.trim() == '') {
					return
				} else {
					let res = await uni.$http.get(`/search/multimatch?keywords=${e}`)
					let {
						data
					} = await uni.$http.get(`/search/suggest?keywords=${e}&type=mobile`)
					if (data.code == 200) {
						this.isSreach = false
					}
					this.seachData = data.result.allMatch
				}

			},
		}
	}
</script>

<style lang="less" scoped>
	.History {
		margin-top: 40upx;
		margin-bottom: 40upx;
		margin-left: 4%;

		.histname {
			display: flex;
			// flex-direction: column;
			flex: 3;
			justify-content: flex-start;
			flex-wrap: wrap;

			.onename {
				line-height: 50upx;
				text-align: center;
				margin-top: 2%;
				background-color: aliceblue;
				border-radius: 20px;
				// width: 26%;
				margin-left: 4%;

				text {
					font-size: 1rem;
				}
			}
		}

		.lishi {
			font-size: 30upx;
			font-weight: 600;
			display: flex;
			justify-content: space-between;
		}
	}

	.search {
		margin-right: 5%;
		margin-left: 5%;
		margin-top: 5%;
	}

	.serachname {
		color: #2b85e4;
	}

	.Aftersearch {
		ul {
			line-height: 100upx;

			li {
				display: flex;
			}
		}
	}
</style>
