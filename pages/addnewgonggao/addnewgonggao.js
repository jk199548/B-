// pages/addnewgonggao/addnewgonggao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gonggaotitle:'',
    gonggaocontent:''
  },
  //用户输入时保存的公告名称
  saveinputtitle:function(e){
    var that = this;
    that.setData({
      gonggaotitle:e.detail.value
    })
  },
  //用户输入时保存的公告内容
  saveinputcontent: function (e) {
    var that = this;
    that.setData({
      gonggaocontent: e.detail.value
    })
  },
  //点击保存草稿
  savecaogao:function(e){
    var that = this;
    if(that.data.gonggaotitle=='' || that.data.gonggaocontent==''){
      wx.showToast({
        title: '公告名称或内容不能为空',
        icon:'none',
        duration:2000,
      })
    }else{
      wx.setStorageSync('caogao', {
        'gonggaotitle':that.data.gonggaotitle,
        'gonggaocontent':that.data.gonggaocontent
      })
    }
  },
  //点击保存并发布按钮
  savegonggao:function(e){
    var that = this;
    if(that.data.gonggaocontent=='' || that.data.gonggaotitle==''){
      wx.showToast({
        title: '公告标题或内容不能为空',
        icon:'none',
        duration:2000
      })
    }else{
      
    }
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