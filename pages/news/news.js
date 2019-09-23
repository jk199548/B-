// pages/news/news.js
var websocket = require('../../utils/websocket.js');
const api = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ["职位管理", "互动"],
    interestNavbar: ['对我感兴趣', '看过我', '我感兴趣的'],
    currentIndex: 0,//tabbar索引
    interestcurrentIndex: 0,
    newslist:[],
    workerid:[],
  },
  interestnavbarTab: function (e) {
    this.setData({
      interestcurrentIndex: e.currentTarget.dataset.index
    })
  },
  navbarTab: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
  },
 //绑定私聊聊天
  bindMyGroup: function (data) {
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/bindMyGroup',
      data: {
        'id': wx.getStorageSync('id'),
        'client_id': data.client_id,
        'is_rec': 1
      },
      success: function (res) {
        
      }
    })
  },
  //跳转到聊天页面
  tochat:function(e){
    var that = this;
    wx.navigateTo({
      url: '../chat/chat?workerid='+e.currentTarget.dataset.id,
    })
  },
  //获取消息列表
  getNewsList:function(e){
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/getLastPrivateMsg',
      data:{
        'id':wx.getStorageSync('id'),
        'is_rec':1
      },
      success:function(res){
        for(var item in res.data.result){
          if (res.data.result[item]!=''){
            that.setData({
              workerid:that.data.workerid.concat([item]),
              newslist: that.data.newslist.concat([res.data.result[item]])
            })
          }
        }     
        console.log(that.data.newslist)
      }
    })
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.isconnect)
    if (app.globalData.isconnect){
      wx.onSocketMessage(function(res){
        console.log(res)
      })
    }else{
      websocket.connect(function (res) {
        var data = JSON.parse(res.data);
        if (data.type == 'is_ok') {

        } else if(data.type==0||data.type==1) {
          if (that.data.workerid.includes(data.c_id)) {
            for (var item in that.data.newslist) {
              if (that.data.workerid[item] == data.c_id) {
                that.data.newslist[item] = data
                that.setData({
                  newslist: that.data.newslist
                })
              } else {
              }
            }
          } else {
            that.setData({
              newslist: that.data.newslist.concat([data])
            })
          }
        }
        if (data.type == 'init') {
          //绑定群,发送请求
          app.globalData.isconnect=true;
          that.bindMyGroup(data);
        } else if (data.type == 'say') {
          //得到聊天消息
        } else if (data.type == 'notice') {
          //得到公告信息
        }
      });
      wx.onSocketMessage(function(res){
        
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.onSocketMessage(function (res) {
      var data = JSON.parse(res.data);
      if (data.type == 'is_ok') {

      } else {
        if (that.data.workerid.includes(data.c_id)) {
          for (var item in that.data.newslist) {
            if (that.data.workerid[item] == data.c_id) {
              that.data.newslist[item] = data
              that.setData({
                newslist: that.data.newslist
              })
            } else {
            }
          }
        } else {
          that.setData({
            newslist: that.data.newslist.concat([data])
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      workerid: [],
      newslist: []
    });
    that.getNewsList();
    wx.onSocketMessage(function (res) {
      var data = JSON.parse(res.data);
      if (data.type == 'is_ok') {

      } else {
        if (that.data.workerid.includes(data.c_id)) {
          for (var item in that.data.newslist) {
            if (that.data.workerid[item] == data.c_id) {
              that.data.newslist[item] = data
              that.setData({
                newslist: that.data.newslist
              })
            } else {
            }
          }
        } else {
          that.setData({
            newslist:that.data.newslist.concat([data])
          })
        }
      }
    })
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