//app.js
const api = require('utils/util.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: 'https://xiaoshetong.cn/api/recruit/isFirst',
          data:{
            'code':res.code
          },
          success:function(res){
            console.log(res)
            if(res.data.code==1){
              // 未注册
              that.globalData.isregister=false;
              wx.setStorageSync('openid', res.data.result)
            }else if(res.data.code==0){
              // 已注册过
              that.globalData.isregister=true;
              wx.setStorageSync('token', res.data.result.token);
              wx.setStorageSync('id', res.data.result.id);
            }
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    isregister:'',
    isconnect:false,
  }
})