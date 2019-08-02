// pages/indexdongtai/indexdongtai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdelmodal:false,
    imageurl:[
      '../../images/index/dongtai.png',
      '../../images/index/dongtai.png',
      '../../images/index/dongtai.png',
      '../../images/index/dongtai.png',
      
    ]
  },
  delbtn:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除此条动态',
      confirmText: '确定',
      cancelText: '取消',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            showdelmodal: false
          })
        } else {
          console.log('取消删除')
        }
      }
    })
  },
  showdelbtn:function(e){
    var that = this;
    that.setData({
      showdelmodal:!that.data.showdelmodal,
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