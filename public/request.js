class request {
  constructor(o={}) {
    this._header = o.header || {};
    this.statusCode = o.code || 'SUCCESS';
    this.prefix = o.prefix || '';
    this.noLogin = o.code_TOKENERROR || 'NO_LOGIN';
    this._errorHandler = (res,url) => {
      let pages = getCurrentPages(),
        //获取当前页面的对象
        view = pages[pages.length - 1];
      console.error(url + '---接口状态码错误:' + res.msg)
      if (res && res.data && res.data.code.indexOf('TOKEN_') != -1 && view.route != 'pages/author/index') {
          wx.setStorageSync('sokIn', true)
          wx.removeStorageSync('token')
          wx.navigateTo({
            url: '/pages/author/index'
          })
          return false;
      }
    };
  }
  GET(o) {
    return this.requestAll({
      noprefix: o.noprefix || '',
      method: 'GET',
      url:o.url,
      data: o.data || {},
      header:o.header || this._header,
    })
  }
  POST(o) {
    return this.requestAll({
      noprefix: o.noprefix || '',
      method: 'POST',
      url: o.url,
      data: o.data || {},
      header: o.header || this._header
    })
  }


  /**
   * 网络请求
   */
  requestAll(o) {
    return new Promise((resolve, reject) => {
      o.header['OAuth-Token']=wx.getStorageSync('token');
      wx.request({
        url: o.noprefix ? o.url: (this.prefix + o.url),
        data: o.data,
        header: o.header,
        method: o.method,
        success: (res => {
          if (res.data.code === this.statusCode) {
            resolve(res)
          } else if(res.data.code) {
            this._errorHandler(res, o.url)
            reject(res)
          }
          else{
              resolve(res)
          }
        }),
        fail: (res => {
          this._errorHandler(res, o.url)
          reject(res)
        })
      })
    })
  }
}

export default request