const path = require("path");
const config = {
  projectName: "taro-vant-example",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  alias: {
    "@/vant": path.resolve(__dirname, "../src/components/vant-weapp"),
  },
  sourceRoot: "src",
  outputRoot: `dist`,
  plugins: [
    [
      "@tarojs/plugin-html",
      {
        // 过滤 vant 组件库的前缀：van-
        pxtransformBlackList: [/van-/],
      },
    ],
  ],
  defineConstants: {},
  copy: {
    patterns: [
      {
        from: "src/components/vant-weapp/wxs",
        to: "dist/components/vant-weapp/wxs",
      },
      {
        from: "src/components/vant-weapp/common/",
        to: "dist/components/vant-weapp/common/",
      },
      {
        from: "src/components/vant-weapp/button",
        to: "dist/components/vant-weapp/button",
      },
      {
        from: "src/components/vant-weapp/info",
        to: "dist/components/vant-weapp/info",
      },
      {
        from: "src/components/vant-weapp/icon",
        to: "dist/components/vant-weapp/icon",
      },
      {
        from: "src/components/vant-weapp/loading",
        to: "dist/components/vant-weapp/loading",
      },
      {
        from: "src/components/vant-weapp/tab",
        to: "dist/components/vant-weapp/tab",
      },
      {
        from: "src/components/vant-weapp/tabs",
        to: "dist/components/vant-weapp/tabs",
      },
      {
        from: "src/components/vant-weapp/sticky", // 被 tabs 组件调用,所以一并拷贝
        to: "dist/components/vant-weapp/sticky",
      },
    ],
    options: {},
  },
  framework: "vue",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        // config: {
        //   selectorBlackList: [/van-/],
        // },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
