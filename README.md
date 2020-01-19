## 前言
对于部分开发者可能对于开发小程序时，对实际项目的结构设计有些循规遵矩，官方给出的demo有限 文件结构也相对来说平级笼统，在实际团队项目开发时，要提高人员开发效率开发的第一点就是结构清晰及解决方案能够快速应用实现，本人撸了个demo对微信给出的新限制（授权登陆）的模式例子，满足绝大部分项目基建开发。


## 目录结构
    |-- miniProgram
        |-- app.js                //小程序的APP对象声明，首次启动基础操作及全局声明
        |-- app.json             //小程序的基础配置文件 包括状态栏、页面、tab等颜色字体名称等 具体查看官方文档
        |-- app.wxss             //全局样式 非app.json声明的页面 需@import引入
        |-- project.config.json //工具配置文件
        |-- sitemap.json        //可理解为 小程序的SEO配置
        |-- custom-tab-bar      //自定义TabBar栏
        |-- pages               //页面
        |   |-- tab               //tab页目录
        |       |-- home        
        |       |-- mine       
        |-- public              //公共文件
        |   |-- api.js             //接口声明
        |   |-- request.js         //请求封装
        |   |-- util.js         //常用的公共函数
        |   |-- components        //组件
        |   |   |-- auth          //组件-授权弹框
        |   |-- template        //模板 不同于组件 适合纯布局渲染的模板定义
        |-- static              //静态资源
            |-- font
            |-- images



## 快速上手
`api.js配置`
> 目前还未看到比较好的切换环境方案，不像常规web项目自动根据域名请求，当然小程序也可以让后台通过请求头  Referer 来判断 正式/测试来切换 但是对于大部分团队前后端分离的模式，实际场景中要和后台沟通协调有一定的沟通成本，如果有好的方案 请务必一起交流


    const HOST = {
	   DEV:'测试环境域名',
	   PEV:'正式环境域名'
	}
	const API_PREFIX = HOST['DEV'];   //根据环境切换
   



------------


`app.js配置`
> app.js无太多需要注意的点，在业务页面中通过getApp()可以访问公共函数及参数，需要注意的是路由守卫中定义的是页面全局的一些公共操作，如分享统一 若无须使用在对应页面的data中声明isOverShare：true即可 便不会覆盖统一分享

       //路由守卫 isOverShare定义页面用自定义分享信息
        wx.onAppRoute(function (res) {
          //获取加载的页面
          let view = _this.getPage(),data;
          if (view) {
            data = view.data;
            if (!data.isOverShare) {
              data.isOverShare = true;
              view.onShareAppMessage = function () {
                //执行分享的公共回调也可写在里面
                //分享配置
                return {
                  title: '我是公共的分享配置',
                  path: '我是公共的分享路径',
                  imageUrl: '以及公共的分享图'
                };
              }
            }
          }
        })
------------


`app.wxss配置`
> app.css中声明常用的主题色 和常用的动画效果 在实际业务中可方便换肤和提高交互


     公共样式 模板及组件内不生效需要 @import '/app.wxss'
	.main-bg-color {
	  background-color: #3cc1cc;
	  color: #fff;
	}

	.main-font-color {
	  color: #3cc1cc;
	}

	.main-border-color {
	  border-style: #3cc1cc;
	}
------------
`app.json配置`
> app.json官方也相当于详细 需注意的是tabBar custom属性为自定义tabBar 对应根目录：custom-tab-bar


	"tabBar": {
    "custom": true,
    "color": "#000000",
    "selectedColor": "#000000",
    "backgroundColor": "#000000",
    "list": [
      {
        "pagePath": "pages/tab/home/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/tab/mine/index",
        "text": "我的"
      }
    ]
	},

------------
以上为常规的基建配置 授权可参考mine页面 引入了commonets定义的auth组件，实际业务更改样式和基础逻辑，具体使用已注明

## UI库推荐 
> 直接将所需的组件放入\public\components中 实际页面引入即可

#### VantUI-适合电商类
Vant Weapp 是移动端 Vue 组件库 Vant 的小程序版本，两者基于相同的视觉规范，提供一致的 API 接口，助力开发者快速搭建小程序应用。

GitHub地址：https://youzan.github.io/vant-weapp/#/intro
#### iView WeApp

iView是TalkingData发布的一款高质量的基于Vue.js组件库，而iView weapp则是它们的小程序版本。

GitHub地址：https://github.com/TalkingData/iview-weapp


#### MinUI

MinUI 是蘑菇街前端开发团队开发的基于微信小程序自定义组件特性开发而成的一套简洁、易用、高效的组件库，适用场景广，覆盖小程序原生框架，各种小程序组件主流框架等，并且提供了专门的命令行工具。

GitHub地址：https://github.com/meili/minui


#### Wux WeApp

Wux WeApp也是一个非常不错的微信小程序自定义 UI 组件库，组件比较丰富，值得使用。

GitHub地址：https://github.com/wux-weapp/wux-weapp


#### ColorUI

ColorUI是一个Css类的UI组件库！不是一个Js框架。相比于同类小程序组件库，ColorUI更注重于视觉交互！

其组件在美观性方面比较突出。

GitHub地址：https://github.com/weilanwl/ColorUI





