// pages/peoplechat/peoplechat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msglist: [
      {
        name: 'my',
        title: '哈喽嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻阿打算打开你的蓝淡蓝色懒得弄没啥大计算机打烂了电脑',
        image: ''
      },
      {
        name: 'my',
        title: '哈喽',
        image: ''
      },
      {
        name: 'my',
        title: '哈喽',
        image: ''
      },
      {
        name: 'my',
        title: '哈喽',
        image: ''
      },
      {
        name: 'my',
        title: '哈喽',
        image: ''
      },
      {
        name: 'my',
        title: '哈喽',
        image: ''
      },
      {
        name: 'my',
        title: '哈喽',
        image: ''
      },
      {
        name: 'my',
        title: '哈喽',
        image: ''
      },
      {
        name: 'my',
        title: '哈喽',
        image: ''
      },
      {
        name: 'other',
        title: '你好，请问有什么需要帮助的吗？？你好，请问有什么需要帮助的吗？？你好，请问有什么需要帮助的吗？？',
        image: ''
      }
    ],
  },
  //跳转到职位详情
  topositiondetail:function(e){
    wx.navigateTo({
      url: '../positiondetail/positiondetail',
    })
  },
  //跳转到群公告
  toqungonggao:function(e){
    wx.navigateTo({
      url: '../qungonggao/qungonggao',
    })
  },
  //跳转到群签到
  toqiandao:function(e){
    wx.navigateTo({
      url: '../qiandao/qiandao',
    })
  },
  //跳转到群管理
  toqunguanli:function(e){
    wx.navigateTo({
      url: '../qunguanli/qunguanli',
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