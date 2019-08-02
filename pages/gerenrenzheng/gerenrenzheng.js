// pages/shimingrenzheng/shimingrenzheng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showfronttext: true,
    showbacktext: true,
    username: '',//用户输入的名字
    idcard: '',//用户输入的身份证号
    idcardfront: '../../images/shiming/shenfenzheng.png',//身份证正面照片
    idcardback: '../../images/shiming/shenfenzheng.png',//身份证反面照片
  },
  //获取用户输入的姓名
  getusername: function (e) {
    var reg = /^(([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$))/;
    console.log(reg.test(e.detail.value))
    if (reg.test(e.detail.value)) {
      var that = this;
      that.setData({
        username: e.detail.value,
      })
    } else {
      wx.showToast({
        title: '请输入正确的名字格式',
        duration: 2000,
        icon: 'none'
      })
    }
  },
  // 获取用户输入的身份证号
  getidcard: function (e) {
    var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (reg.test(e.detail.value)) {
      var that = this;
      that.setData({
        idcard: e.detail.value,
      })
    } else {
      wx.showToast({
        title: '请输入正确的身份证号码',
        duration: 2000,
        icon: 'none'
      })
    }
  },
  //用户选择正面照片
  chooseimagefront: function (e) {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        that.setData({
          idcardfront: res.tempFilePaths,
          showfronttext: !that.data.showfronttext
        })
      },
    })
  },
  chooseimageback: function (e) {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        that.setData({
          idcardback: res.tempFilePaths,
          showbacktext: !that.data.showbacktext
        })
      },
    })
  },
  //用户选择反面照片
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