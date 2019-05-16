<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :id="item.tag" :class="item.tag==categoryActive?'active':''"
				    v-for="(item,index) in categoryList">
					{{item.tag}}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-into-view="scrollItem" @scroll="fnScroll" :style="'height:'+height+'px'" scroll-with-animation>
				<block v-for="(list, key) in categoryList" :key="key">
					<block v-if="list.cities.length">
						<view class="uni-list-cell-divider tagName" :id="list.tag">
							{{list.tag}}
						</view>
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list.cities" :key="key+'-'+index"
						 :class="list.cities.length -1 == index ? 'uni-list-cell-last' : ''">
							<view class="uni-list-cell-navigate">
								{{item.name}}
							</view>
						</view>
					</block>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { debounce } from '@/utils/function'
import lodash from 'lodash'
	var cityDate = require("../../common/citylistData.js");
	export default {
		data() {
			return {
				categoryList: cityDate.list,
				subCategoryList: [],
				height: 0,
				categoryActive: 'A',
				scrollHeight: 0,
				scrollItem:'A',
				scrollIndex:'A',
				scrollTagList:[],
				fnScroll:()=>{}
			}
		},
		methods: {
			getLeftIndex(){
				let scrollTagList = uni.createSelectorQuery().in(this).selectAll('.tagName')
				let inView
				scrollTagList.boundingClientRect(data => {
					inView = data.filter((item,index) => {
						return item.top<=0
					}).pop().id
					this.categoryActive = inView
				}).exec();
			},
			categoryClickMain(categroy, index) {
				this.categoryActive = categroy.tag;
				this.subCategoryList = categroy.subCategoryList;
				this.scrollItem = categroy.tag
			},
		},
		onLoad: function () {
			this.height = uni.getSystemInfoSync().windowHeight;
		},
		onReady(){
			this.fnScroll = debounce(this.getLeftIndex,300)
		}
	}
</script>

<style>
	.page-body {
		display: flex;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
	}

	.nav-left-item {
		height: 100upx;
		border-right: solid 1px #E0E0E0;
		border-bottom: solid 1px #E0E0E0;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 70%;
	}

	.nav-right-item {
		width: 28%;
		height: 220upx;
		float: left;
		text-align: center;
		padding: 11upx;
		font-size: 28upx;
	}

	.nav-right-item image {
		width: 100upx;
		height: 100upx;
	}

	.active {
		color: #007AFF;
	}
</style>
