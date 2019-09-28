// pages/allqunliaomembers/allqunliaomembers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showmodalgroup:false,
    memberslist:[],
    selectedgroupid:0,
    workid:'',
    showdelbtn:false,
    groupnamearr:[]
  },
  //点击显示delimage
  showdelbtn:function(e){
    var that = this;
    that.setData({
      showdelbtn:!that.data.showdelbtn
    })
  },
  //获取分组情况
  getGrouping:function(e){
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/getGrouping',
      data:{
        'workid':that.data.workid
      },
      success:function(res){
        if(res.data.code==0){
          that.setData({
            memberslist:res.data.result
          })
        }
      }
    })
  },
  
  //跳转到分组情况页面
  toqunliaofenzu:function(e){
    var that = this;
    wx.navigateTo({
      url: '../qunliaofenzu/qunliaofenzu?workid='+that.data.workid,
    })
  },
  //长按显示分组
  showgroupmodal:function(e){
    var that = this;
    that.setData({
      showmodalgroup:true,
      selectedgroupid: e.currentTarget.dataset.id
    })
  },
  //获取群聊所有分组名
  getAllGroupName:function(e){
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/getGroupingName',
      data: {
        'workid':that.data.workid
      },
      method: 'GET', 
      success: function(res){
        if(res.data.code==0){
          that.setData({
            groupnamearr:res.data.result
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
      workid:options.workid
    })
    that.getGrouping();
    //获取群聊所有分组名
    that.getAllGroupName();
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
    that.getGrouping();
    that.getAllGroupName();
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