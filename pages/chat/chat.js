// pages/chat/chat.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toview:'',
    msglist:[
      {
        name:'my',
        title:'哈喽',
        image:''
      },
      {
        name: 'my',
        title: '哈喽',
        image: ''
      },
      {
        name: 'my',
        title: '哈喽',
        image: ''
      },
      {
        name: 'my',
        title: '哈喽',
        image: ''
      },
      {
        name: 'my',
        title: '哈喽',
        image: ''
      },
      {
        name: 'my',
        title: '哈喽',
        image: ''
      },
      {
        name:'other',
        title:'你好，请问有什么需要帮助的吗？？',
        image:''
      }
    ],
    inputword:''
  },
  //选择发送图片
  chooseimage:function(e){
    var that = this;
    wx.chooseImage({
      success: function(res) {
        that.setData({
          msglist: that.data.msglist.concat([{
            name:'my',
            title:'',
            image:res.tempFilePaths
          }]),
          toview: 'msg-' + (that.data.msglist.length - 1),
          inputword: ''
        })
        var filePath = res.tempFilePaths;
      },
    })
  },
  //input框输入事件
  bindinput:function(e){
    var that = this;
    that.setData({
      inputword:e.detail.value,
    })
  },
  //点击发送按钮事件
  sendmsg:function(e){
    var that = this;
    if(that.data.inputword==''){
      wx.showToast({
        title: '不能发送空白信息',
        duration: 2000,
        icon: 'none'
      })
    }else{
     
      var newarr = [{
        name: 'my',
        title: that.data.inputword
      }];
      that.setData({
        msglist: that.data.msglist.concat(newarr),
        toview: 'msg-' + (that.data.msglist.length - 1),
        inputword: ''
      })
    }
  },
  //输入聚焦是触发的事件
  focus:function(){
    var that = this;
    that.setData({
      toview:'num'
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
  // onPullDownRefresh: function () {

  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPageScroll: function (e) {
    if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
})