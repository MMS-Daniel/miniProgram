// pages/tab/mine/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:app.UTIL.get('user')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.getUserInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  //业务函数
  //获取用户信息
  getUserInfo: function (e) {
    let _this = this;
    _this.setData({
      userInfo: app.UTIL.get('user')
    })
  },
  showAuth:function(){
    let _this = this;
    _this.setData({
      doAuth:true
    })
  },
  //用户选择暂不登录 关闭弹框后的回调函数
  tipsUser:function(){
    //提示 等
  }
})