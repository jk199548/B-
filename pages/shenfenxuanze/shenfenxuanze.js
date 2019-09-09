// pages/shenfenxuanze/shenfenxuanze.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputcompanyname:'',
  },
  //获取用户信息
  getUserInfo:function(e){
    var that = this;
    console.log(e.detail.errMsg)
    if(e.detail.errMsg== "getUserInfo:ok"){
      wx.setStorageSync('header',e.detail.userInfo.avatarUrl);
      wx.setStorageSync('sex',e.detail.userInfo.gender);
      var reg = /^[\u4e00-\u9fa5]{2,10}$/;
      if (that.data.inputcompanyname == '') {
        wx.showToast({
          title: '公司名字不能为空',
          icon: 'none',
          duration: 1500
        })
      } else {
        if(reg.test(that.data.inputcompanyname)){
          wx.navigateTo({
            url: '../conpanyrenzheng/conpanyrenzheng?companyname='+that.data.inputcompanyname,
          })
        }else{
          wx.showToast({
            title:'公司名字只能为汉字',
            icon:'none'
          })
        }
      }
    }else{
      wx.showToast({
        title:'请先登录',
        icon:'none'
      })
    }
  },
  //用户输入公司名字事件
  inputcompanyname:function(e){
    var that = this;
    that.setData({
      inputcompanyname:e.detail.value
    })
  },
  //跳转到个人招聘页面
  togerenrenzheng:function(e){
    wx.navigateTo({
      url: '../gerenrenzheng/gerenrenzheng',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.from=='mine'){
      
    }else{
      console.log(111111)
      if(wx.getStorageSync('token')){
        wx.switchTab({
          url: '../index/index',
        })
      }
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