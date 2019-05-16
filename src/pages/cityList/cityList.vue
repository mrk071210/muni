<template>
	<view class="page">
        <!-- <customer-header :leftWords="titleWords"></customer-header> -->
        <view class="content">
		<scroll-view class="scrollList" scroll-y :scroll-into-view="scrollViewId" :style="{height:winHeight + 'px'}">
			<view class="uni-list">
				<block v-for="(list, key) in lists" :key="key">
					<block v-if="list.cities.length">
						<view class="uni-list-cell-divider" :id="list.tag">
							{{list.tag}}
						</view>
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list.cities" :key="key+'-'+index"
						 :class="list.cities.length -1 == index ? 'uni-list-cell-last' : ''"
                         @click="chooseCity(item)">
							<view class="uni-list-cell-navigate">
								{{item.name}}
							</view>
						</view>
					</block>
				</block>
			</view>
		</scroll-view>
		<view class="uni-indexed-list-bar" :class="touchmove ? 'active' : ''" @touchstart="touchStart" @touchmove="touchMove"
		 @touchend="touchEnd" @touchcancel="touchCancel" :style="{height:winHeight + 'px'}">
			<text v-for="(list,key) in lists" :key="key" class="uni-indexed-list-text" :class="touchmoveIndex == key ? 'active' : ''"
			 :style="{height:itemHeight + 'px',lineHeight:itemHeight + 'px'}">{{list.tag === '热门城市'?'*':list.tag}}</text>
		</view>
		<view class="uni-indexed-list-alert" v-if="touchmove">
			{{lists[touchmoveIndex].tag}}
		</view>
        </view>
	</view>
</template>

<script>
	var cityDate = require("../../common/citylistData.js");

	export default {
		data() {
			return {
                titleWords:'切换城市',
				title: 'grid',
				lists: cityDate.list,
				touchmove: false,
				touchmoveIndex: -1,
				itemHeight: 0,
				winHeight: 0,
				scrollViewId: "热门城市",
				titleHeight: 0
			}
		},
		onLoad() {
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.itemHeight = winHeight / 26;
			this.winHeight = winHeight;
		},
		methods: {
			touchStart(e) {
				this.touchmove = true;
				let pageY = e.touches[0].pageY;
				let index = Math.floor((pageY - this.titleHeight) / this.itemHeight);
				let item = this.lists[index];
				if (item) {
					this.scrollViewId = item.tag;
					this.touchmoveIndex = index;
				}
			},
			touchMove(e) {
				let pageY = e.touches[0].pageY;
				let index = Math.floor((pageY - this.titleHeight) / this.itemHeight);
				let item = this.lists[index];
				if (item) {
					this.scrollViewId = item.tag;
					this.touchmoveIndex = index;
				}
			},
			touchEnd() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			},
			touchCancel() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
            },
            chooseCity(item){
				let city = JSON.stringify(item)
				uni.setStorage({
					key: 'cityInfo',
					data: {cityName:item.name,cityCode:item.id},
					success: function () {
						uni.navigateBack()
					}
				});
            }
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
	}

	.scrollList {
		flex: 1;
	}

	.uni-indexed-list-bar {
		width: 46upx;
		background-color: lightgrey;
		display: flex;
		flex-direction: column;
	}
	.uni-list-cell-divider {
		position: relative;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		color: #999;
		background-color: #f7f7f7;
		padding: 7px 10px;
	}
	.uni-list-cell {
    position: relative;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.uni-list-cell-navigate {
    padding-right: 18px;
}
.uni-list-cell-navigate {
    font-size: 15px;
    padding: 11px 15px;
    line-height: 24px;
    position: relative;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.uni-list-cell::after {
    position: absolute;
    z-index: 3;
    right: 0;
    bottom: 0;
    left: 15px;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    -ms-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
}
	.uni-indexed-list-bar.active {
		background-color: rgb(200, 200, 200);
	}

	.uni-indexed-list-text {
		color: #aaa;
		font-size: 22upx;
		text-align: center;
	}

	.uni-indexed-list-bar.active .uni-indexed-list-text {
		color: #333;
	}

	.uni-indexed-list-text.active,
	.uni-indexed-list-bar.active .uni-indexed-list-text.active {
		color: #007AFF;
	}

	.uni-indexed-list-alert {
		position: absolute;
		z-index: 20;
		width: 160upx;
		height: 160upx;
		left: 50%;
		top: 50%;
		margin-left: -80upx;
		margin-top: -80upx;
		border-radius: 80upx;
		text-align: center;
		line-height: 160upx;
		font-size: 70upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
