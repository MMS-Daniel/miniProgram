//获取当前时间的时间戳

const getNowTime = function () {
  return new Date().getTime();
}

// 设置同步缓存
const set = function (name, value) {
  return wx.setStorageSync(name, value);
}

//获取缓存
const get = function (name) {
  return wx.getStorageSync(name);
}
//移除缓存
const remove = function (name) {
  return wx.removeStorageSync(name);
}

//时间戳转日期
const timestampToTime = function (timestamp) {
  let Timestamp;
  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  if (timestamp.length == 10) {
    Timestamp = timestamp * 1000;
  } else {
    Timestamp = timestamp;
  }
  let date = new Date(Timestamp);
  let Y = date.getFullYear();
  let M = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
  let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
}

//验证手机号码
const regMobile = function (mobile) {
  let myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
  return myreg.test(mobile);
}

//验证身份证号码 数字和结尾字母x
const regIdcard = function (idcard) {
  let myreg = /(^\d{17}(\d|X|x)$)/;
  return myreg.test(idcard);
}

//字符串转数组 （character：分隔符号
const stringToArray = function (string, character) {
  return string.split(character);
}

//截取字符串
const formatString = function (string, num) {
  if (string) {
    if (string.length > num) {
      return string.slice(0, num) + "...";
    } else {
      return string;
    }
  } else {
    return " ";
  }
}


//自定义错误提示信息
const alert = (msg, time) => {
  if (time) {
    wx.showToast({
      title: msg,
      duration: time,
      mask: true,
      icon: "none"
    })
  } else {
    wx.showToast({
      title: msg,
      duration: 2000,
      mask: true,
      icon: "none"
    })
  }
}


// 数组去重
const reArray = (array) => {
  return Array.from(new Set(array));
}


export default {
  getNowTime: getNowTime,
  set: set,
  get: get,
  remove: remove,
  timestampToTime: timestampToTime,
  regMobile: regMobile,
  regIdcard: regIdcard,
  stringToArray: stringToArray,
  formatString: formatString,
  alert: alert,
  reArray: reArray
}