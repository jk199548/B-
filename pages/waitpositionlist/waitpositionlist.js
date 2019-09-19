// pages/waitpositionlist/waitpositionlist.js

const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workid:'',
    showmodal: false,
    shaixuanisactive: false,
    selectedid: 0,
    shaixuantext:'筛选',
    alllist:[],
    title:'',
    schoolarr: ['请选择学历', '初中', '中专', '高中', '职高', '大专', '本科', '研究生'],
  },
  //获取所有面试者
  getAllInterviewer:function(e){
    var that = this;
    api._get('/allIntentionWorkers',{
      'workid':that.data.workid
    }).then(res=>{
      that.setData({
        alllist:res.result
      })
    })
  },
  //获取待面试
  getWaitInterview:function(e){
    var that = this;
    that.setData({
      shaixuantext:'待面试',
      showmodal: !that.data.showmodal,
      shaixuanisactive: !that.data.shaixuanisactive,
    })
  },
  //获取已投递
  getPosted:function(e){
    var that = this;
    that.setData({
      shaixuantext: '已投递',
      showmodal:!that.data.showmodal,
      shaixuanisactive: !that.data.shaixuanisactive,
    })
  },
  //跳转到个人投递详情
  togerentoudixiangqing:function(e){
    var that = this;
    wx.navigateTo({
      url: '../gerentoudixiangqing/gerentoudixiangqing?workerid='+e.currentTarget.dataset.id+"&workid="+that.data.workid+"&title="+that.data.title+"&created_at="+e.currentTarget.dataset.created_at,
    })
  },
  //点击模态框隐藏
  showmodal: function (e) {
    var that = this;
    that.setData({
      showmodal: false,
    })
  },
  //点击招聘筛选
  shaixuan: function (e) {
    var that = this;
    that.setData({
      shaixuanisactive: !that.data.shaixuanisactive,
      showmodal: !that.data.showmodal,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      workid:options.workid,
      title:options.title
    });
    that.getAllInterviewer();
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