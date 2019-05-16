<template>
	<view class="home">
		<!-- <customer-header :leftWords="titleWords"></customer-header> -->
		<!-- <view class="content">
			<text class="iconfont icon-address"></text>
			<text class="cityName" @click="chooseCity">{{choosedCity.cityName}}</text>
			<text class="otherInfo" v-if="addressException">定位信息与当前选择不同,切换至</text>
			<text class="rightCity" v-if="addressException" @click="switchRight">{{gpsCity.cityName}}</text>
		</view> -->
		<view  class="homeMap" :style="{width: '100%', height: mapHeight + 'px'}">
			<map style="width: 100%; height: 100%;" :markers=markers :latitude="latitude" :longitude="longitude" :show-location="true" id="myMap"></map>
			<text></text>
		</view>
	</view>
</template>

<script>
	const amapFile = require("../../common/amap-wx.js");
	import io from '@/common/weapp.socket.io.js'
	export default {
		components: {},
		data() {
			return {
				gpsCity: {
					cityName: "定位中...",
					cityCode: ""
				},
				choosedCity: {
					cityName: "定位中...",
					cityCode: ""
				},
				addressException: false,
				titleWords: "星和宅配",
				background: ["color1", "color2", "color3"],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				mapHeight: 0,
				latitude: 0,
				longitude: 0,
				socket: null,
				uuid:'',
				markers:[]
			};
		},
		onLoad(data){
			this.uuid = plus.device.uuid
			uni.getSystemInfo({
				success: (res) => {
					this.mapHeight = res.windowHeight
					console.log('windowHeight',res.windowHeight)
					console.log('screenHeight',res.screenHeight)
					console.log('windowTop',res.windowTop)
					console.log('windowBottom',res.windowBottom)
				}
			})
						uni.getLocation({
							type: 'gcj02', //返回可以用于uni.openLocation的经纬度
							success: (res) => {
								this.latitude = res.latitude;
								this.longitude = res.longitude;
								this.openSocket()
					}
				})
		},
		onReady() {
			uni.createMapContext("myMap");
		},
		onShow() {
			uni.getStorage({
				key: "cityInfo",
				success: res => {
					if (res) {
						this.choosedCity = {
							cityName: res.data.cityName,
							cityCode: res.data.cityCode
						};
					}
				}
			});
		},
		methods: {
			openSocket(){
				uni.connectSocket({
					url: 'ws://192.168.0.142:3001'
				});
				uni.onSocketOpen( (res) => {
					uni.showToast({
							title: '开始了',
							duration: 2000,
							icon:'none'
					});
					this.startSocket()
				});
				uni.onSocketError( (res) => {
					uni.showToast({
							title: 'websocket出错了',
							duration: 2000,
							icon:'none'
					});
				});
				uni.onSocketClose(function (res) {
					uni.showToast({
							title: 'websocket关闭了',
							duration: 2000,
							icon:'none'
					});
				});
				// const socket = (this.socket = io(
				// 	'ws://192.168.0.142:3000'
				// ))
				// console.log(socket)
				// socket.on('connect', () => {
				// 	console.log('socket初始化成功')
					// this.startSocket()
				// })
			},
			startSocket(){
				// socket.on('time', (data) => {
				// 	console.log(date)
				// })
				setInterval(()=>{
					uni.getLocation({
							type: 'gcj02',
							success:  (res) => {
									// socket.emit('pushPosition',res )
									res.uuid =  this.uuid
									this.latitude = res.latitude
									this.longitude = res.longitude
									this.markers[0] = {
										id:1,
										latitude:this.latitude,
										longitude:this.longitude,
										iconPath:'/src/common/cat.png'
									}
									uni.sendSocketMessage({
										data: JSON.stringify(res)
									});
							}
					});
				},5000)
			},
			chooseCity() {
				uni.navigateTo({
					url: "/pages/cityList/cityList"
				});
			},
			switchRight() {
				console.log(this.choosedCity);
				this.choosedCity = JSON.parse(JSON.stringify(this.gpsCity));
				uni.setStorage({
					key: "cityInfo",
					data: this.choosedCity,
				});
				this.addressException = false;
			}
		}
	};
</script>

<style lang="scss" scoped>
	page,
	view {
		
	}

	.home {
		
	}

	.iconfont {
		align-self: center;
		font-size: 30px;
	}

	page {
		min-height: 100%;
	}

	.content {
		position: absolute;
		align-items: baseline;
		font-size: 12px;
		height: 30px;
		line-height: 30px;
	}

	.otherInfo {
		margin-left: 20px;
	}

	.rightCity {
		color: #576b95;
	}
	.homeMap{
		width: 100%;
	}
</style>
