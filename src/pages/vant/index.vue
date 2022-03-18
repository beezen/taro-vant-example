<template>
  <view class="box">
    <view class="title">按钮类型</view>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <view class="title">朴素按钮</view>
    <van-button plain type="primary">朴素按钮</van-button>
    <van-button plain type="info">朴素按钮</van-button>
    <view class="title">禁用状态</view>
    <van-button disabled type="primary">禁用状态</van-button>
    <van-button disabled type="info">禁用状态</van-button>
    <view class="title">加载状态</view>
    <van-button loading type="primary" loading-type="spinner" />
    <view class="title">按钮形状</view>
    <van-button square type="primary">方形按钮</van-button>
    <van-button round type="info">圆形按钮</van-button>
    <view class="title">按钮尺寸</view>
    <van-button type="primary" size="large">大号按钮</van-button>
    <van-button type="primary" size="normal">普通按钮</van-button>
    <van-button type="primary" size="small">小型按钮</van-button>
    <van-button type="primary" size="mini">迷你按钮</van-button>
    <view class="title">自定义颜色</view>
    <van-button color="#7232dd">单色按钮</van-button>
    <van-button color="#7232dd" plain>单色按钮</van-button>
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">
      渐变色按钮
    </van-button>
  </view>
</template>

<script>
import { Button } from "vant"; // 引入 button 组件
export default {
  components: {
    "van-button": Button,
  },
};
</script>

<style lang="less">
.box {
  padding: 0 10px;
}
.title {
  font-size: 32px;
  padding: 16px 0;
}
</style>
