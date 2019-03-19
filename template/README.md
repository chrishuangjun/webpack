# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn startdev //本地连接dev环境
yarn startsit //本地连接sit环境
yarn startuat //本地连接uat环境

# build for production with minification
yarn builddev //打包测试环境
yarn buildprod //打包生产环境

# 发布前预览页面效果
yarn serve

# 生成部署配置文件
yarn gcfg

# 部署测试环境
yarn publish

# build for production and view the bundle analyzer report
npm run build --report
{{#unit}}

# run unit tests
npm run unit
{{/unit}}
{{#e2e}}

# run e2e tests
npm run e2e
{{/e2e}}
{{#if_or unit e2e}}

# run all tests
npm test
{{/if_or}}
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
