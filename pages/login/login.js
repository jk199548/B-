// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getUserInfo:function(e){
    var that = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.setStorageSync('header', e.detail.userInfo.avatarUrl);
      wx.setStorageSync('sex', e.detail.userInfo.gender);
      wx.navigateTo({
        url:'../shenfenxuanze/shenfenxuanze'
      })
    }else{
      wx.showToast({
        title: '登录失败,请先登录',
        icon:'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(wx.getStorageSync('token')){
      wx.switchTab({
        url: '../index/index',
      })
    }else{
      
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