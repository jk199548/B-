// pages/mine/mine.js
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header:'',
    username:'',
    phonenum:'',
    name:'',
    isComPany:0,//0是个人,1是公司
    zonghefen:'',
    login:false,
  },
  //跳转到意见反馈页面
  toyijianfankui:function(e){
    var that = this;
    wx.navigateTo({
      url: '../yijianfankui/yijianfankui',
    })
  },
  //跳转到公司认证页面
  tocompanyrenzheng:function(e){
    var that = this;
    wx.navigateTo({
      url: '../shenfenxuanze/shenfenxuanze?from=mine',
    })
  },
  //跳转到个人资料页面
  togerenziliao:function(e){
    var that = this;
    wx.navigateTo({
      url: '../gerenziliao/gerenziliao',
    })
  },
  //跳转到综合评分
  tozonghepingfen:function(e){
    var that = this;
    wx.navigateTo({
      url: '../zonghepingfen/zonghepingfen',
    })
  },
  //跳转到我的简历库
  tomyjianliku:function(e){
    var that = this;
    wx.navigateTo({
      url: '../myjianliku/myjianliku',
    })
  },
  //获取已过认证的个人或公司信息
  getMyDetail:function(e){
    var that = this;
    if(wx.getStorageSync('id')){
      api._get('/getMyDetails', {
        'token': wx.getStorageSync('token'),
        'id': wx.getStorageSync('id')
      }).then(res => {
        if (res.result.is_company == 1) {
          that.setData({
            name: res.result.company,
            header: wx.getStorageSync('header'),
            phonenum: res.result.phone,
            isComPany: res.result.is_company,
            username: res.result.username
          })
        } else {
          wx.setStorageSync('is_company', res.result.is_company);
          that.setData({
            name: res.result.username,
            header: wx.getStorageSync('header'),
            phonenum: res.result.phone,
            isComPany: res.result.is_company,
            username: wx.getStorageSync('username')
          })
        }
      })
    }
  },
  //获取综合评分
  getFraction:function(e){
    var that = this;
    if(wx.getStorageSync('id')){
      wx.request({
        url: 'https://www.xiaoshetong.cn/api/recruit/fraction',
        data: {
          'id': wx.getStorageSync('id')
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 0) {

            that.setData({
              zonghefen: res.data.result.fraction
            })
          }
        }
      })
    }else{

    }
  },
  //用户点击登录按钮
  getUserInfo: function (e) {
    var that = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.setStorageSync('header', e.detail.userInfo.avatarUrl);
      wx.navigateTo({
        url: '../shenfenxuanze/shenfenxuanze'
      });
    } else {
      wx.showToast({
        title: '登录失败,请先登录',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getMyDetail();
    that.getFraction();
    if(wx.getStorageSync('token')){
      that.setData({
        login:true,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.getMyDetail();
    that.getFraction();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})