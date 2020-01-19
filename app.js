//app.js
import MMSAPI from '/public/api.js'
import UTIL from '/public/util.js'
App({
  MMSAPI: new MMSAPI(),
  UTIL: UTIL,
  onLaunch: function () {
    let _this = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权
          wx.getUserInfo({
            success: res => {
              _this.globalData.userInfo = res.userInfo;
              UTIL.set('user', res.userInfo)
            }
          })
          _this.refreshToken();
        }
      }
    })
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
  },
  //刷新
  refreshToken(cb) {
    let _this = this;
    if (UTIL.get('token')) {
      _this.MMSAPI.refreshToken({
        token: UTIL.get('token')
      }).then(res => {
        if (res.data && !res.data.success) {
          _this.auth();
        }
        typeof cb=='function' && cb()
      })
    } else {
      _this.auth(cb);
    }
  },
  // 授权
  auth: function (cb) {
    let _this = this;
    let obj = {};
    wx.getUserInfo({
      success: res => {
        obj = res.userInfo;
        UTIL.set('user', res.userInfo)
        wx.login({
          success: res => {
            obj.code = res.code;
            _this.MMSAPI.authr(obj).then(res => {
              if (res) {
                UTIL.set("token", res.data);
                typeof cb == 'function' && cb()
              }
            })
          }
        });
      }
    })
  },
  // 获取当前页面Page对象
  getPage:function(){
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象
    return currentPage;
  },
  globalData: {
    userInfo: null
  }
})