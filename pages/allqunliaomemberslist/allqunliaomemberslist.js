// pages/allqunliaomemberslist/allqunliaomemberslist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberslist: [],
    workid:'',
    group_id:''
  },
  addtogroup:function(e){
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/setGrouping',
      data: {
        'workid':that.data.workid,
        'workerid':e.currentTarget.dataset.id,
        'grouping_id':that.data.group_id
      },
      method: 'POST', 
      success: function(res){
        if(res.data.code==0){
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
            success: function(res){
              // success
            },
          })
        }else{
          wx.showToast({
            title:'加入失败或该成员已在群',
            icon:'none'
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      workid:options.workid,
      group_id:options.group_id
    });
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/getGrouping',
      data: {
        'workid':that.data.workid
      },
      method: 'GET', 
      success: function(res){
        if(res.data.code==0){
          that.setData({
            memberslist:res.data.result
          })
        }
      },
    });
    wx.request({
      //获取该群聊的分组情况
      url: 'https://www.xiaoshetong.cn/api/getGroupingName',
      data: {
        'workid': that.data.workid
      },
      success: function (res) {
        if(res.data.code==0){
          that.setData({
            groupnamearr:res.data.result
          })
        }
      }
    });
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