// pages/addgerenjieshao/addgerenjieshao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qiyelogourl:[],
    qiyeimage:[],
  },
  //选择企业图片
  uploadimage:function(e){
    var that = this;
    wx.chooseImage({
      success: function(res) {
        if(res.tempFiles[0].size>=1024*1024){
          wx.showToast({
            title: '图片的尺寸不能超过2M哦',
            icon:'none'
          })
        }else{
          that.setData({
            qiyeimage:that.data.qiyeimage.concat(res.tempFilePaths)
          })
        }
      },
    })
  },
  //选择企业logo
  chooselogo:function(e){
    var that = this;
    wx.chooseImage({
      count:6,
      success: function(res) {
        that.setData({
          qiyelogourl:that.data.qiyelogourl.concat(res.tempFilePaths)
        })
      },
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