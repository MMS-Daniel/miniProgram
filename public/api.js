/** 
 * 业务接口js
 * API_LIST 接口列表
 * API_PREFIX   
 **/
import request from './request.js'
const HOST = {
   DEV:'测试环境域名',
   PEV:'正式环境域名'
}
const API_PREFIX = HOST['DEV'];
const API_LIST = {
  //网盘上传
  netdisc: {
    upload: 'netdisc/upload'
  },
  // 用户管理
  user: {
    record:'user/record',
    auth: 'miniApp/user/auth', // 授权
    refreshToken: 'miniApp/user/refreshToken', // 刷新token
    getInfo:'miniApp/user/getInfo'//获取用户基本信息
  }
}


//业务接口类
class MMSAPI {
  constructor() {
    this._request = new request({
      prefix: API_PREFIX,
      code: 'SUCCESS',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
  }
  netdiscUpload(data) {
    let o = {
      ...data,
      url: API_PREFIX + API_LIST.netdisc.upload
    };
    return wx.uploadFile(o)
  }
  // 授权
  authr(data) {
    return this._request.POST({
      url: API_LIST.user.auth,
      data
    })
  }
  // 刷新token
  refreshToken(data) {
    return this._request.POST({
      url: API_LIST.user.refreshToken,
      data
    })
  }
  // 查询用户基本信息
  getInfo() {
    return this._request.POST({
      url: API_LIST.user.getInfo
    })
  }
}


export default MMSAPI