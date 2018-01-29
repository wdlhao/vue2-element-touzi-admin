<b>xxx金融后台管理系统</b>

**A magical vue element touzi admin.**

- [效果演示地址](http://www.jiouai.com)

- [使用文档](http://www.cnblogs.com/wdlhao/p/8075646.html)

## About

此项目是 vue2.0 + element-ui + node+mongodb 构建的后台管理系统，所有的数据都是从服务器实时获取的真实数据，具有真实的注册、登录、数据显示、新增数据、修改数据、删除数据等功能。

```bash
  如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！ ^_^
  
  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目
  
  开发环境 windows 64 、nodejs 6.11.0
  
  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR
```

## 技术栈

**前端技术栈：** vue2 + vuex + vue-router + webpack2.0 + ES6/7 + less + element-ui

**服务端技术栈：**nodejs + express  + mongodb


## 前序准备

**运行前准备：**

1、不需要在本地调试及开发：
   [请访问本项目的服务器地址。](http://www.jiouai.com)
   
2、需要在本地调试及开发：

   由于此项目是基于nodejs和mongodb的前后端结合项目，你需要进行nodejs和mongodb的相关准备工作。项目运行之前，请确保系统已经安装以下应用：
   
   (1)、node (6.0 及以上版本)。使用细节，请参考：[node的下载及安装。](https://nodejs.org/en/download/)
   
   (2)、mongodb 。使用细节，请参考：[mongodb的下载及使用。](https://pan.baidu.com/s/1jIxPJrK)【下载，db/log配置，开启服务，use touzi，导入数据】
   
   (3)、robomongod。使用细节，请参考：[robomongod的下载及使用。](https://pan.baidu.com/s/1hsQuc08)（注意：mongodb可视化视图工具，本项目不是必须安装，主要用于方便查看数据库数据）。
        

## 开发：
git clone https://github.com/wdlhao/vue2-element-touzi-admin

cd vue2-element-touzi-admin

npm install

**npm run dev** (访问本地后台系统，需开启服务端express服务)。运行之后，会默认打开本地访问路径：http://localhost:8012

  开启服务端express服务方法如下：双击server/start.bat启动文件，执行命令>node index.js即可，启动后切记不要关闭cmd窗口。


## 发布
**npm run bulid** (生成打包之后的项目文件,此文件主要用于项目部署)。

## 功能
 - 登录/退出 -- 完成
 - 首页 -- 完成
 - 用户列表 -- 完成
 - 信息列表 -- 完成
 - 信息管理
   -  个人信息 -- 完成
   -  修改信息 -- 完成
 - 资金管理
   -  资金流水 -- 完成
   -  支付单据 -- 完成
 - 投资管理
   -   省份投资 -- 完成
   -   区域投资 -- 完成
 - 金融文章
   -  文章发布 -- 完成
   -  文章编辑 -- 完成
   - 查看文章 -- 完成
 - 资金数据
   -  投资分布 -- 完成
   -  项目分布 -- 完成
   -  收支统计 -- 完成

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── exampleImgs                // 项目示例图片
├── outdb                      // 导入数据库的初始化数据
├── server                     // node服务端
│   ├── api.js                    // 封装的接口请求
│   ├── db.js                     // db数据模型定义
│   ├── index.js                  // express服务器
│   ├── mutils.js                 // 服务端工具类
├── src                        // 源代码
│   ├── assets                 // 图片等静态资源
│   ├── components             // 全局公用组件
│   ├── config                 // 接口请求配置
│   ├── fonts                  // fontawesome字体库文件
│   ├── layout                 // 全局 组件
│   ├── page                   // 项目所有的视图
│   ├── register               // 第三方库注册
│   ├── router                 // 登录路由
│   ├── store                  // 项目vuex数据存储器
│   ├── style                  // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── .gitignore                 // git 忽略项
├── eslintrc.js                // eslint 配置项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
├── package.json               // 包依赖配置
└── README.md                  // 说明文件

```

## [查看更多demo](http://www.jiouai.com)
![image](https://github.com/wdlhao/vue2-element-touzi-admin/blob/master/exampleImgs/1.jpg)
![image](https://github.com/wdlhao/vue2-element-touzi-admin/blob/master/exampleImgs/2.jpg)
![image](https://github.com/wdlhao/vue2-element-touzi-admin/blob/master/exampleImgs/3.jpg)
![image](https://github.com/wdlhao/vue2-element-touzi-admin/blob/master/exampleImgs/4.gif)
![image](https://github.com/wdlhao/vue2-element-touzi-admin/blob/master/exampleImgs/5.gif)
![image](https://github.com/wdlhao/vue2-element-touzi-admin/blob/master/exampleImgs/6.gif)
![image](https://github.com/wdlhao/vue2-element-touzi-admin/blob/master/exampleImgs/7.gif)

## License

项目讨论qq群：684775824，欢迎大家加群，一起来学习和交流。
MIT
