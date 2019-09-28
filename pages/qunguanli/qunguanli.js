// pages/qunguanli/qunguanli.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showmodal:false,//是否显示模态框
    workid:'',
    groupmenber:[],
    groupname:'',
    groupQRcode:'',
    showallmenbers:false,//是否显示查看所有成员按钮
    groupnamearr:'',//群聊分组名
  },
  showmodal:function(e){
    var that = this;
    that.setData({
      showmodal:false,
    })
  },
  //跳转到查看聊天记录页面
  tosearchchatrecord:function(e){
    var that = this;
    wx.navigateTo({
      url: '../chatrecord/chatrecord',
    })
  },
  //跳转到群聊所有成员列表
  toallqunliaomembers:function(e){
    var that = this;
    wx.navigateTo({
      url: '../allqunliaomembers/allqunliaomembers?workid='+that.data.workid,
    })
  },
  //退出群聊按钮点击事件
  tuiqun:function(e){
    var that = this;
    that.setData({
      showmodal:true,
    })
  },
  //再想想吧按钮点击事件
  thinkbtn:function(e){
    var that = this;
    that.setData({
      showmodal:false,
    })
  },
  //确定退出按钮事件
  confirmbtn:function(e){
    var that = this;
    that.setData({
      showmodal:false,
    })
  },
  //跳转到展示群聊二维码
  toshowgroupQRcode:function(e){
    var that = this;
    wx.navigateTo({
      url: '../showgroupQRcode/showgroupQRcode?workid='+that.data.workid,
    })
  },
  //获取群聊所有成员
  getAllGroupMembers:function(e){
    var that = this;
    //获取群聊所有成员
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/getGrouping',
      data: {
        'workid':that.data.workid
      },
      method: 'GET', 
      success: function(res){
        if(res.data.code==0){
          if(res.data.result.length>10){
            that.setData({
              groupmenber: res.data.result,
              showallmenbers:true,
            })
          }else{
            that.setData({
              groupmenber: res.data.result,
              showallmenbers:false
            })
          }
        }
      },
    });
  },
  //获取群聊所有分组名
  getGroupAllName:function(e){
    var that = this;
    //获取群聊所有分组名
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
    });
    //获取群聊基本信息
    api._get('/workDetails',{
      'workid':that.data.workid
    }).then(res=>{
      if(res.code==0){
        that.setData({
          groupname: res.result[0].title,
        })
      }
    });
    that.getAllGroupMembers();
    that.getGroupAllName();
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
    that.getAllGroupMembers();
    that.getGroupAllName();
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