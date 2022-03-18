module.exports = {
  presets: [
    [
      "taro",
      {
        framework: "vue",
        ts: false,
      },
    ],
  ],
  plugins: [
    [
      "import", // 按需加载 vant 组件
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true,
      },
      "vant",
    ],
  ],
};
