// public/components/auth/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     //授权成功回调
     loginSuccess:String,
    //不登录回调
     loginFail:String,
     show:{
      type: Boolean,
      value: false
    },
  },
  data:{
     
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取用户信息
    getUserInfo: function (e) {
      let _this = this;
      if (e.detail['errMsg'] == 'getUserInfo:ok') {
        try{
          var cb = _this.data.loginSuccess && app.getPage()[_this.data.loginSuccess];
        }catch(err){
          throw '授权成功回调参数错误' + err;
        }
        wx.showLoading({
          title: '登录中',
        })
        // 同意了授权
        app.auth(()=>{
          cb && cb();
          wx.hideLoading()
          _this.closeDialog();
        });
      }
      else{
        // 拒绝了授权
        try {
          _this.data.loginFail && app.getPage()[_this.data.loginFail];
        } catch (err) {
          throw '取消授权参数' + err;
        }
      }
    },
    closeDialog:function(){
      let _this = this;
      _this.setData({
        show:false
      })
    }
  }
})
