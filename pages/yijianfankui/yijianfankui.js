// pages/yijianfankui/yijianfankui.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isinput:false,
    inputcontent:'',
  },
  //用户点击提交按钮事件
  submit:function(e){
    var that = this;
    if(that.data.inputcontent==''){
      wx.showToast({
        title: '内容不能为空哦',
        icon:'none',
        duration:2000
      })
    }else{

    }
  },
  //用户输入文字的事件
  inputhandler:function(e){
    var that = this;
    that.setData({
      inputcontent:e.detail.value,
      isinput:true
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