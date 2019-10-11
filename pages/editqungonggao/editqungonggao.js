// pages/addnewgonggao/addnewgonggao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gonggaotitle: '',
    gonggaocontent: '',
    workid: '',
    id:'',//群公告id
    active:false,//用户是否已经输入新的公告标题或者内容
  },
  //用户输入时保存的公告名称
  saveinputtitle: function (e) {
    var that = this;
    that.setData({
      gonggaotitle: e.detail.value,
      active:true,
    })
  },
  //用户输入时保存的公告内容
  saveinputcontent: function (e) {
    var that = this;
    that.setData({
      gonggaocontent: e.detail.value,
      active:true
    })
  },
  //点击保存并发布按钮
  savegonggao: function (e) {
    var that = this;
    if (that.data.gonggaotitle == '') {
      wx.showToast({
        title: '公告标题不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (that.data.gonggaocontent == '') {
      wx.showToast({
        title: '公告内容不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        method: 'POST',
        url: 'https://www.xiaoshetong.cn/api/recruit/editNotice',
        data: {
          'workid': that.data.workid,
          'id': that.data.id,
          'title': that.data.gonggaotitle,
          'content': that.data.gonggaocontent
        },
        success: function (res) {
          if (res.data.code == 0) {
            wx.navigateBack({
              delta: 1,
              success: function (res) {
                wx, wx.showToast({
                  title: '修改成功',
                  icon: 'none',
                  duration: 2000,
                })
              }
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      workid: options.workid,
      id:options.id,
      gonggaotitle:options.title,
      gonggaocontent:options.content
    })
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