// pages/qungonggao/qungonggao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workid:'',
    list:''
  },
  //删除公告
  delqungonggao:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除此条公告吗?',
      success: function (data) {
        if (data.confirm) {
          wx.request({
            url: 'https://www.xiaoshetong.cn/api/recruit/delNotice',
            method: 'PUT',
            data: {
              'id': e.currentTarget.dataset.id
            },
            success: function (res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: '删除成功',
                });
                that.getNotice();
              }
            }
          })
        }
      }
    })
    
  },
  //调转到编辑群公告
  toeditqungonggao:function(e){
    var that = this;
    wx.navigateTo({
      url: '../editqungonggao/editqungonggao?workid='+that.data.workid+'&id='+e.currentTarget.dataset.id+'&title='+e.currentTarget.dataset.title+'&content='+e.currentTarget.dataset.content,
    })
  },
  //跳转到新增群公告
  toaddnewgonggao:function(e){
    var that = this;
    wx.navigateTo({
      url: '../addnewgonggao/addnewgonggao?workid='+that.data.workid,
    })
  },
  //获取公告
  getNotice:function(e){
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/recruit/getNotice',
      data:{
        'workid':that.data.workid
      },
      success:function(res){
        if(res.data.code==0){
          that.setData({
            list:res.data.result
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      workid:options.workid
    });
    that.getNotice();
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
    var that = this;
    that.getNotice();
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