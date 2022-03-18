<template>
  <view>
    <van-tabs v-if="isH5">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
    </van-tabs>
    <!-- 这里举了一个特例 tabs&tab,需要对组件使用稍作兼容 -->
    <van-tabs-weapp v-if="isWeapp" @change="handlechange">
      <van-tab-weapp title="标签 1" :class="currentIndex !== 0 ? 'hidden' : ''"
        >内容 1</van-tab-weapp
      >
      <van-tab-weapp title="标签 2" :class="currentIndex !== 1 ? 'hidden' : ''"
        >内容 2</van-tab-weapp
      >
      <van-tab-weapp title="标签 3" :class="currentIndex !== 2 ? 'hidden' : ''"
        >内容 3</van-tab-weapp
      >
    </van-tabs-weapp>
  </view>
</template>

<script>
import { Tab, Tabs } from "vant"; // h5 端组件
import "./index.less";
export default {
  name: "Index",
  components: {
    "van-tab": Tab,
    "van-tabs": Tabs,
  },
  data() {
    return {
      currentIndex: 0,
      isH5: process.env.TARO_ENV === "h5",
      isWeapp: process.env.TARO_ENV === "weapp",
    };
  },
  methods: {
    handlechange(e) {
      // 这里举了一个特例 tabs&tab，需要对组件使用时稍作兼容，判断当前激活tab，显示tab内容
      const currentIndex = e.detail.index;
      this.currentIndex = currentIndex;
    },
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
.hidden {
  display: none;
}
</style>
