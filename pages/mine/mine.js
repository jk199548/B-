// pages/mine/mine.js
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header:'',
    username:'',
    phonenum:'',
    name:'',
    isComPany:0,//0是个人,1是公司
  },
  //跳转到公司认证页面
  tocompanyrenzheng:function(e){
    var that = this;
    wx.navigateTo({
      url: '../shenfenxuanze/shenfenxuanze?from=mine',
    })
  },
  //跳转到个人资料页面
  togerenziliao:function(e){
    var that = this;
    wx.navigateTo({
      url: '../gerenziliao/gerenziliao',
    })
  },
  //跳转到综合评分
  tozonghepingfen:function(e){
    var that = this;
    wx.navigateTo({
      url: '../zonghepingfen/zonghepingfen',
    })
  },
  //跳转到我的简历库
  tomyjianliku:function(e){
    var that = this;
    wx.navigateTo({
      url: '../myjianliku/myjianliku',
    })
  },
  //获取已过认证的个人或公司信息
  getMyDetail:function(e){
    var that = this;
    api._get('/getMyDetails',{
      'token':wx.getStorageSync('token'),
      'id':wx.getStorageSync('id')
    }).then(res=>{
      console.log(res)
      if(res.result.is_company==1){
        that.setData({
          name:res.result.company,
          header:wx.getStorageSync('header'),
          phonenum:res.result.phone,
          isComPany:res.result.is_company,
        })
      }else{
        wx.setStorageSync('is_company',res.result.is_company);
        that.setData({
          name:res.result.username,
          header:wx.getStorageSync('header'),
          phonenum:res.result.phone,
          isComPany:res.result.is_company,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getMyDetail()
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
    that.getMyDetail();
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