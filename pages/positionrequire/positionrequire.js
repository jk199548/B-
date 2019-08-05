// pages/positionrequire/positionrequire.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workexselectedid:0,
    schoolexselectedid:0,
    sexselectedid:0,
    workexrequirelist: ['无要求','一年以内','1年~3年','3年~5年','5年~10年','10年以上',],
    schoolexrequirelist: ['无要求', '高中以上', '中专以上', '大专以上', '本科以上',],
    sexrequirelist:['男女不限','仅限男生','仅限女生']
  },
  //选择工作经验要求
  chooseworkex:function(e){
    var that = this;
    console.log(e)
    that.setData({
      workexselectedid:e.currentTarget.dataset.id
    })
  },
  //选择学历要求
  chooseschoolex:function(e){
    var that = this;
    console.log(e)
    that.setData({
      schoolexselectedid: e.currentTarget.dataset.id
    })
  },
  //选择性别要求
  choosesex:function(e){
    var that = this;
    that.setData({
      sexselectedid: e.currentTarget.dataset.id
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