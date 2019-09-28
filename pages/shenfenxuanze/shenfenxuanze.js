// pages/shenfenxuanze/shenfenxuanze.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputcompanyname:'',
  },
  //跳转到公司认证页面
  tonextpage:function(e){
    var that = this;
    wx.navigateTo({
      url: '../conpanyrenzheng/conpanyrenzheng?companyname='+that.data.inputcompanyname,
    })
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