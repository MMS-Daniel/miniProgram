class request {
  constructor(o={}) {
    this._header = o.header || {};
    this.statusCode = o.code || 'SUCCESS';
    this.prefix = o.prefix || '';
    this.noLogin = o.code_TOKENERROR || 'TOKEN_ERROR';
    this._errorHandler = (res,url) => {
      if (res.data && res.data.code && res.data.code!=this.noLogin){
        console.error(url + '---接口错误:' + res.errMsg)
      }
      
    };
  }
  GET(o) {
    return this.requestAll({
      noprefix: o.noprefix,
      method: 'GET',
      url:o.url,
      data: o.data || {},
      header:o.header || this._header,
    })
  }
  POST(o) {
    return this.requestAll({
      noprefix: o.noprefix,
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
      console.log((!o.noprefix ? this.prefix : '') + o.url)
      wx.request({
        url: (!o.noprefix ? this.prefix:'') + o.url,
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