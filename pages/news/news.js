// pages/news/news.js
var websocket = require('../../utils/websocket.js');
const api = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ["职位管理", "互动"],
    interestNavbar: ['对我感兴趣', '看过我', '我感兴趣的'],
    currentIndex: 0,//tabbar索引
    interestcurrentIndex: 0,
  },
  interestnavbarTab: function (e) {
    this.setData({
      interestcurrentIndex: e.currentTarget.dataset.index
    })
  },
  navbarTab: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // wx.setTabBarBadge({
    //   index: 1,
    //   text: '11',
    // })
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