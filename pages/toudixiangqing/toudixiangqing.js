// pages/toudixiangqing/toudixiangqing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedid:0,
    navarr:[
      {
        'text':'已报名',
        'num':120
      },
      {
        'text': '审核通过',
        'num': 120
      },
      {
        'text': '面试通过',
        'num': 120
      }
    ]
  },
  changenav:function(e){
    var that = this;
    that.setData({
      selectedid:e.currentTarget.dataset.id
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