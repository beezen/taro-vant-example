# taro-vant-example

这是一个 Taro 框架和 vant UI 组件库结合使用的 Demo 项目。

## 跨端 UI 库选择

Taro 是由 京东·凹凸实验室 倾力打造的多端开发解决方案。当使用 Taro 框架做业务开发时，核心目的就是为了能够只写一套代码，达到在不同端的一致表现。从项目侧，通俗的讲，就是为了让产品快速上线。那么在使用 Taro 框架时，我们还需要选择一个优质的跨端组件库，提升开发人员绘制页面的效率。

目前流行的移动端组件库，主要有`Mint UI`、`WeUI`、`iView UI`、`layui`、`ElementUI`、`vant UI`、`Antd Design Mobile`等。以往在开发 H5 项目时，设计师选中一个合适风格的 UI 组件库，然后开发直接使用就可以了。但当我们使用 Taro 跨端方案后，就不能随意选择这些 UI 库了，因为这些 UI 库可能还未实现对应的跨端兼容能力。不过，也不需要太过担心，Taro 团队早就考虑到了这个问题，对于一些常用的 UI 组件库，已经给予了一些接入方案。当然官方主推的是官方 UI 库：`Taro UI`、`NutUI`，不过有时候我们就 `偏偏不用官方推荐的`。

从官方[博客日志](https://taro-docs.jd.com/taro/blog/2021-08-13-Taro-3.3)中，我们发现有提到可使用 `WeUI`、`vant UI`、`Antd Design Mobile`这三个 UI 库，官方做了对应的模块封装。因为考虑到团队后期使用 vue 语法栈，同时分析了目前三个 Demo 案例的整体情况，最终认为 `Vant UI` 可能更满足后期的业务场景。

- [兼容 WeUI 的例子](https://github.com/NervJS/taro-weui)
- [兼容 Antd Design Mobile 的例子](https://github.com/NervJS/taro-antd-mobile)
- [兼容 VantUI 的例子](https://github.com/NervJS/taro-vant)

## Taro 中 Vant UI 的兼容性

在 Taro 中使用有赞前端团队开源的移动端组件库 Vant，能直接兼容使用的组件大概为 70%，而无法做到百分百兼容。原因无他，因为 Vant 是针对于 web 研发的移动端组件库，而在小程序中因为部分特有 API 的调用限制（例如:获取元素尺寸系列的 API 等）而无法做到所有功能同步兼容。

目前组件支持度可参考：[taro-vant 组件支持列表](https://github.com/NervJS/taro-vant#%E7%BB%84%E4%BB%B6%E6%94%AF%E6%8C%81%E5%88%97%E8%A1%A8)

## Taro 中如何合理使用 Vant 组件库

Vant 是有赞前端团队开源的移动端组件库，于 2017 年开源。目前官方提供了 Vant vue 版本（vant）和微信小程序版本（vant-weapp），也就是说针对不同的场景，应该因地制宜的选择不同组件库。

### Vant Weapp 单独使用

[Vant Weapp](https://github.com/youzan/vant-weapp) 组件库是有赞前端团队开源的支持微信小程序的移动端组件库。如果业务场景上，用 Taro 框架仅仅是来开发微信小程序的，不外乎直接使用 Vant Weapp 一定会比 Vant 更合适。

> 注：使用 Vant Weapp 原生第三方组件库进行开发的项目，不再具有多端转换的能力。

【第一步】：配置忽略 vant 的样式尺寸转换。如果直接使用 Vant weapp 组件，会发现样式偏小的情况，这是因为 Taro 默认将 Vant weapp 的样式尺寸从 px 转换为了 rpx，可以通过配置来禁止转换，如下两种方式挑一种即可：

方式一： 配置 selectorBlackList

```javascript
// config/index.js

const config = {
  // ...
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          // 过滤 vant 组件库的前缀：van-
          selectorBlackList: [/van-/],
        },
      },
    },
  },
};
```

方式二：配置 @tarojs/plugin-html 插件（用来兼容 web 组件的 html 标签）

```javascript
// config/index.js
const config = {
  // ...
  plugins: [
    [
      "@tarojs/plugin-html",
      {
        // 过滤 vant 组件库的前缀：van-
        pxtransformBlackList: [/van-/],
      },
    ],
  ],
};
```

【第二步】：通过配置，将 Vant weapp 原生小程序文件拷贝到编译后的 `dist` 目录下,`特别注意`：因为不会检索组件相互调用关系，所以需要主动将`wxs`，`common`,以及部分组件调用的组件也一并拷贝，例如：

```javascript
const config = {
  // ...
  copy: {
    patterns: [
      {
        from: "src/components/vant-weapp/dist/wxs", // 公共模块
        to: "dist/components/vant-weapp/dist/wxs",
      },
      {
        from: "src/components/vant-weapp/dist/common/", // 公共模块
        to: "dist/components/vant-weapp/dist/common/",
      },
      {
        from: "src/components/vant-weapp/dist/button", // 当前将要使用的组件
        to: "dist/components/vant-weapp/dist/button",
      },
      {
        from: "src/components/vant-weapp/dist/loading", // button 组件调用的组件
        to: "dist/components/vant-weapp/dist/loading",
      },
      // ...
    ],
    options: {},
  },
};
```

【第三步】：引用 Vant Weapp 组件，在 app 或者页面 config 配置文件中配置 `usingComponents` 字段，例如：

```javascript
export default {
  navigationBarTitleText: "按钮显示页",
  usingComponents: {
    "van-button": "../../components/vant-weapp/dist/button/index",
  },
};
```

【第四步】：在页面中便可以直接使用 button 组件了。`特别注意`：在 Taro 3.x 版本中发现样式不生效时，需要将属性默认值改为传参形式，原因参考：[8955](https://github.com/NervJS/taro/issues/8955)，例如：将`<van-button plain>朴素按钮</van-button>` 改为 `<van-button plain="plain">朴素按钮</van-button>`。

```vue
<template>
  <view>
    <van-button type="primary" :loading="true" loading-text="ing"
      >Button</van-button
    >
    <van-button plain="plain" type="info">朴素按钮</van-button>
  </view>
</template>

<script>
export default {
  name: "index",
};
</script>
```

小程序效果示例如下图：
<img src="https://img.dongbizhen.com/blog/20220317_001.jpeg" width="400"/>

### Vant 单独使用

在 Taro 项目中使用 vant 组件库，与使用其他 npm 包并无多大差别。我们主要还是应该关注 vant 组件在各端上的兼容性差异，然后通过部分调整进行适配。

安装依赖

```bash
yarn add vant -S # 或 npm install vant -S
```

在页面中直接使用

```vue
<template>
  <view>
    <van-button type="primary">primary</van-button>
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
```

H5 和小程序效果示例如下图：
<img src="https://img.dongbizhen.com/blog/20220316_001.png" />

### Vant 和 Vant Weapp 结合使用

在 Taro 中使用 Vant 时，如果存在只有 H5 端适配，而小程序端不适配的情况时。那么我们应该引入 Vant Weapp 库，然后去单独适配微信小程序端。主要方式就是通过 Taro 内置的编译环境变量 `process.env.TARO_ENV` 来分别加载两个不同端的组件。具体操作如下：

首先，需要将 Vant Weapp 的原生组件引入到当前应用中

```javascript
// app.config.js  vant weapp 的原生组件可定义在全局配置
export default {
  usingComponents: {
    "van-tab-weapp": "./components/vant-weapp/dist/tab/index",
    "van-tabs-weapp": "./components/vant-weapp/dist/tabs/index",
  },
};
```

然后,将编译时环境变量 `process.env.TARO_ENV` 赋值到逻辑变量中

```javascript
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
      isH5: process.env.TARO_ENV === "h5",
      isWeapp: process.env.TARO_ENV === "weapp",
    };
  },
};
```

最后，我们可以在页面中添加判断条件，h5 加载 Vant 组件，小程序则加载 Vant Weapp 组件

```vue
<template>
  <view>
    <van-tabs v-if="isH5">
      <van-tab title="标签 1">内容 1</van-tab>
    </van-tabs>
    <van-tabs-weapp v-if="isWeapp">
      <van-tab-weapp title="标签 1">内容 1</van-tab-weapp>
    </van-tabs-weapp>
  </view>
</template>
```

H5 和小程序效果示例如下图：
<img src="https://img.dongbizhen.com/blog/20220316_003.png" />

## 自定义跨端组件

虽然通过社区优秀的开源组件库项目 Vant，已经能够满足绝大部分的业务场景，但也必然会存在部分组件功能在实际场景中无法满足需求。对于这部分未覆盖到的功能，在实际开发中我们需要通过自定义兼容方案去解决，实际上就是开发者自己写一个跨端组件。

通过 Taro 框架提供的内置环境变量`process.env.TARO_ENV`，我们可以为不同端写有差异的业务代码，也可以对不同端不一样的表现进行兼容处理。

例如：需要开发一个标签组件，如果要求两端表现存在差异，那我们需要分别开发一个 H5 组件和一个小程序组件，再通过编译时环境变量判断是 H5 还是小程序环境，来分别加载不同端平台的组件。同样值得一提的是，对于逻辑 js，Taro 还会根据当前编译环境，优先调用对应的端类型后缀的 js 文件，例如：编译微信小程序时，会优先查询是否存在 xxx.weapp.js 文件，编译 h5 时会优先查询 xxx.h5.js 文件是否存在，如果不存在则调用 xxx.js。那么我们写自定义跨端组件时，就可以用这些特性了，下面举了一个小栗子。

自定义兼容，文件目录结构可如下：

```bash
.
├── components
│   ├── customLabel-h5.vue # 单独 h5 组件
│   └── customLabel-weapp.vue # 单独微信小程序组件
├── index.config.js
├── index.less
├── index.vue
├── utils.h5.js # h5优先调用 utils.h5.js
└── utils.weapp.js # 微信小程序优先调用 utils.weapp.js
```

具体代码示例如下：

```html
<template>
  <view>
    <custom-label>自定义标签内容</custom-label>
    <view>正文内容</view>
  </view>
</template>
```

```javascript
let customLabel;
// 在编译阶段，会移除不属于当前编译类型的代码，只保留当前编译类型下的代码
if (process.env.TARO_ENV === "h5") {
  customLabel = require("./components/customLabel-h5.vue").default;
} else {
  customLabel = require("./components/customLabel-weapp.vue").default;
}
import { customFn } from "./utils"; // 会根据编译时环境，找对应的环境后缀文件。若都不存在则找默认`.js`文件
export default {
  name: "Index",
  components: {
    customLabel,
  },
};
```

H5 和小程序效果示例如下图：
<img src="https://img.dongbizhen.com/static/taro_vant_0101.png" />

## 参考资料

- [taro-vant](https://github.com/NervJS/taro-vant)
- [使用 Vant Weapp](https://docs.taro.zone/docs/vant)
