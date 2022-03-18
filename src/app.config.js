export default defineAppConfig({
  pages: ["pages/vant/index", "pages/vant-weapp/index", "pages/hybrid/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#000000",
    selectedColor: "#2f2",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/vant/index",
        text: "vant",
      },
      {
        pagePath: "pages/vant-weapp/index",
        text: "vant-weapp",
      },
      {
        pagePath: "pages/hybrid/index",
        text: "hybrid",
      },
    ],
  },
});
