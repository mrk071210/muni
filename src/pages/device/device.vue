/**
 * Created by calamus on 2019/05/16
 */
<template>
  <view class="" >
    <uni-list>
			<uni-list-item title="绑定设备" @click="bindDevice" :show-arrow="false"></uni-list-item>
			<uni-list-item title="查看其他设备" @click="viewDevice"></uni-list-item>
			<uni-list-item title="取消绑定" @click="cancelBind" :show-arrow="false"></uni-list-item>
		</uni-list>
  </view>
</template>

<script>
	import { uniList,uniListItem  } from '@dcloudio/uni-ui'
	import http from '@/utils/http.js'
export default {
	components:{ uniList,uniListItem  },
  props: [],
  data() {
    return {
      device:{}
    };
  },
  methods: {
		async bindDevice(){
			this.device = uni.getSystemInfoSync();
			this.device.uuid = plus.device.uuid
			try {
				let res = await this.$request.post('/device/bind',{data:this.device})
				if(res.data.head && res.data.head.success){
					uni.showToast({
							title: res.data.head.msg,
							duration: 2000,
							icon:'none'
					});
				}else{
					uni.showToast({
							title: '坏了',
							duration: 2000,
							icon:'none'
					});
				}
			} catch (error){
				console.log('error:',error)
			}
		},
		async cancelBind(){
			let uuid = plus.device.uuid
			try {
				let res = await this.$request.post('/device/cancel',{data:{uuid:uuid}})
				if(res.data.head && res.data.head.success){
					uni.showToast({
							title: res.data.head.msg,
							duration: 2000,
							icon:'none'
					});
				}else{
					uni.showToast({
							title: '坏了',
							duration: 2000,
							icon:'none'
					});
				}
			} catch (error){
				console.log('error:',error)
			}
		}
	},
  onReady() {  
  }
};
</script>

<style lang="scss">

</style>