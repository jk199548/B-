// pages/zonghepingfen/zonghepingfen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service:'',
    satisfaction: '',//工作环境评分
    wages: '',//薪资待遇评分
    list:''
  },
  //获取c端对该用户的所有评论
  getAllComment:function(e){
    var that = this;
    if(wx.getStorageSync('id')){
      wx.request({
        url: 'https://www.xiaoshetong.cn/api/recruit/getCommentByRec',
        data: {
          'id': wx.getStorageSync('id')
        },
        success: function (res) {
          if(res.data.code==0){
            that.setData({
              list:res.data.result
            });
            var newlist = [];
            for(var item in res.data.result){
              newlist = newlist.concat(res.data.result[item].comment)
            }
            that.setData({
              list:newlist
            });
            console.log(that.data.list)
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
    that.getAllComment()
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