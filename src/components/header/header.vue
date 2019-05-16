<template>
  <view class="head" >
    <view class="innerHead" :style="{'height':menuPosition.bottom+10+'px','padding-top':menuPosition.top+'px','line-height':(menuPosition.bottom-menuPosition.top)+'px'}">
        <text class="title" v-if="leftWords">{{leftWords}}</text>
            
    </view>
    <view class="blank" :style="{'height':menuPosition.bottom+10+'px'}"></view>
  </view>
</template>

<script>
export default {
  name: "CustomerHeader",
  props: ["leftWords", "input", "rightIcon", "rightWords"],
  data() {
    return {
        menuPosition:{
            top:0,
            bottom:0
        },
        
      value: ""
    };
  },
  methods: {},
  onReady() {
    switch(uni.getSystemInfoSync().platform){
    case 'android':
       console.log('运行Android上')
    this.menuPosition.bottom = 58
    this.menuPosition.top = 26
       break;
    case 'ios':
       console.log('运行iOS上')
    this.menuPosition.bottom = 58
    this.menuPosition.top = 26
       break;
    default:
       console.log('运行在开发者工具上')
       let data = wx.getMenuButtonBoundingClientRect();
    this.menuPosition.bottom = data.bottom
    this.menuPosition.top = data.top
       break;
}
    
  }
};
</script>

<style lang="scss">
$color-base: #00c16f;
$words-color-base: #333333;
$words-color-light: #999999;
.head{
  width: 100%;
  z-index: 999;
  .innerHead{
      width: 100%;
    position: fixed;
    box-sizing: border-box;
    text-align: left;
    padding: 0 30upx;
    background-color: $color-base;
    font-size: 28upx;
    color: #fff;
    display: flex;
    flex-direction: row;
    .title {
      font-size: 26upx;
    }
  }
  }
</style>