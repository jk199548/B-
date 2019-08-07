// pages/qunguanli/qunguanli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showmodal:false,//是否显示模态框
  },
  showmodal:function(e){
    var that = this;
    that.setData({
      showmodal:false,
    })
  },
  //跳转到群聊所有成员列表
  toallqunliaomembers:function(e){
    var that = this;
    wx.navigateTo({
      url: '../allqunliaomembers/allqunliaomembers',
    })
  },
  //退出群聊按钮点击事件
  tuiqun:function(e){
    var that = this;
    that.setData({
      showmodal:true,
    })
  },
  //再想想吧按钮点击事件
  thinkbtn:function(e){
    var that = this;
    that.setData({
      showmodal:false,
    })
  },
  //确定退出按钮事件
  confirmbtn:function(e){
    var that = this;
    that.setData({
      showmodal:false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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