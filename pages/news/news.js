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
    interestNavbar: ['对我感兴趣', '看过我', '工作群'],
    currentIndex: 0,//tabbar索引
    interestcurrentIndex: 0,
    newslist:[],
    workerid:[],
    newsarr: [],
    groupIdArr: [],
    unreadnumberarr: '',
    lastmsg:[],
    friendlist: [],
  },
  //获取好友列表
  getFriendList: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/getFriend',
      data: {
        'id': wx.getStorageSync('id'),
        'is_rec': 0
      },
      success: function (res) {
        that.setData({
          friendlist: res.data.result
        })
      }
    })
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
  //跳转到聊天页面
  tochatpage: function (e) {
    wx.navigateTo({
      url: '../peoplechat/peoplechat?group_id=' + e.currentTarget.dataset.id,
    })
  },
  //绑定群群
  bindmygroup: function (data) {
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/bindMyGroup',
      data: {
        'id': wx.getStorageSync('id'),
        'client_id': data.client_id,
        'is_rec': 1
      },
      success: function (res) {
        //返回群id
        if (res.data.code == 1) {
          wx.showModal({
            title: '提示',
            content: '您暂未加入任何群聊',
          })
        } else {
          that.setData({
            newsarr: res.data.result
          })
          if (res.data.result.length == 0) {
            that.setData({
              nochat: true
            })
          } else {
            for (var i = 0; i < res.data.result.length; i++) {
              that.setData({
                groupIdArr: that.data.groupIdArr.concat([res.data.result[i].id]),
              })
            }
            that.getLastMsg(that)
          }
        }
      }
    })
  },
  //获取群聊最后一条消息
  getLastMsg: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/getLastMsg',
      data: {
        'workid': that.data.groupIdArr
      },
      success: function (res) {
        for (var item in res.data.result) {
          if (res.data.result[item].content == undefined) {

          } else {
            res.data.result[item].created_at = res.data.result[item].created_at.substring(0, 10)
            res.data.result[item].content = JSON.parse(res.data.result[item].content);
          }
        }
        that.setData({
          lastmsg: res.data.result
        })
        that.getUnreadNumber(that)
      }
    })
  },
  //获取群聊未读消息条数
  getUnreadNumber: function (e) {
    var that = this;
    var str = "" + that.data.groupIdArr + "";
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/getUnreadNumber',
      data: {
        'workid': str,
        'id': wx.getStorageSync('id'),
        'is_rec': 1
      },
      success: function (res) {
        that.setData({
          unreadnumberarr: res.data.result
        })
      }
    })
  },
  //跳转到聊天页面
  tochat: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../chat/chat?hrid=' + e.currentTarget.dataset.id,
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
        for (var item in res.data.result) {
          if (res.data.result[item] != '') {
            that.setData({
              newslist: that.data.newslist.concat([res.data.result[item]])
            })
          }
        }
      }
    })
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getFriendList();
    if (app.globalData.isconnect){
      
    }else{
      websocket.connect(function (res) {
        app.globalData.isconnect = true;
        var data = JSON.parse(res.data);
        if (data.content == undefined) {
          //为私聊
          if (data.type == 'is_ok') {

          } else if (data.type == 0 || data.type == 1) {
            if (that.data.newslist.length == 0) {
              var newlog = data.c_id;
              that.setData({
                friendlist: {
                  [newlog]: {
                    'username': data.username,
                    'header': data.header
                  }
                },
                newslist: that.data.newslist.concat([data])
              })
            } else {
              for (var item in that.data.newslist) {
                if (that.data.newslist[item].c_id == data.c_id) {
                  that.data.newslist[item] = data;
                  that.setData({
                    newslist: that.data.newslist
                  })
                } else {
                  var newheader = 'friendlist[' + data.c_id + '].header';
                  var newusername = 'friendlist[' + data.c_id + '].username';
                  that.setData({
                    ['newusername']: data.username,
                    ['newheader']: data.header,
                    newslist: that.data.newslist.concat([data])
                  })
                }
              }
            }
          }
        } else {
          //群聊
          if (data.type == 'is_ok') {

          } else {
            if (data.content == undefined) {

            } else {
              var newworkid = data.content.workid;
              that.data.unreadnumberarr[newworkid] += 1;
              that.setData({
                unreadnumberarr: that.data.unreadnumberarr
              })
            }
            if (that.data.groupIdArr.includes(parseInt(data.content.workid))) {
              for (var item in that.data.lastmsg) {
                if (item == parseInt(data.content.workid)) {
                  if (that.data.lastmsg[item].content == undefined) {
                    that.data.lastmsg[item] = data
                    that.setData({
                      lastmsg:that.data.lastmsg
                    })
                  } else {
                    that.data.lastmsg[item].content = data.content
                    that.setData({
                      lastmsg: that.data.lastmsg
                    })
                  }
                }
              }
            } else {

            }
          }
        }
        if (data.type == 'init') {
          //绑定群,发送请求
          that.bindmygroup(data);
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
      if(data.content==undefined){
        //为私聊
        if (data.type == 'is_ok') {

        } else if (data.type == 0 || data.type == 1) {
          if (that.data.newslist.length == 0) {
            var newlog = data.c_id;
            that.setData({
              friendlist: {
                [newlog]: {
                  'username': data.username,
                  'header': data.header
                }
              },
              newslist: that.data.newslist.concat([data])
            })
          } else {
            for (var item in that.data.newslist) {
              if (that.data.newslist[item].c_id == data.c_id) {
                that.data.newslist[item] = data;
                that.setData({
                  newslist: that.data.newslist
                })
              } else {
                var newheader = 'friendlist[' + data.c_id + '].header';
                var newusername = 'friendlist[' + data.c_id + '].username';
                that.setData({
                  ['newusername']: data.username,
                  ['newheader']: data.header,
                  newslist: that.data.newslist.concat([data])
                })
              }
            }
          }
        }
      }else{
        //群聊
        if (data.type == 'is_ok') {

        } else {
          if (data.content == undefined) {

          } else {
            var newworkid = data.content.workid;
            that.data.unreadnumberarr[newworkid] += 1;
            that.setData({
              unreadnumberarr: that.data.unreadnumberarr
            })
          }
          if (that.data.groupIdArr.includes(parseInt(data.content.workid))) {
            for (var item in that.data.lastmsg) {
              if (item == parseInt(data.content.workid)){
                if (that.data.lastmsg[item].content == undefined) {
                  that.data.lastmsg[item] = data
                  that.setData({
                    lastmsg: that.data.lastmsg
                  })
                } else {
                  that.data.lastmsg[item].content = data.content
                  that.setData({
                    lastmsg: that.data.lastmsg
                  })
                }
              }
              
            }
          } else {
            
          }
        }
      }
      
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.getLastMsg(that);
    that.setData({
      workerid: [],
      newslist: []
    });
    that.getNewsList();
    that.getUnreadNumber();
    wx.onSocketMessage(function (res) {
      var data = JSON.parse(res.data);
      if (data.content == undefined) {
        //为私聊
        if (data.type == 'is_ok') {

        } else if (data.type == 0 || data.type == 1) {
          if (that.data.newslist.length == 0) {
            var newlog = data.c_id;
            that.setData({
              friendlist: {
                [newlog]: {
                  'username': data.username,
                  'header': data.header
                }
              },
              newslist: that.data.newslist.concat([data])
            })
          } else {
            for (var item in that.data.newslist) {
              if (that.data.newslist[item].c_id == data.c_id) {
                that.data.newslist[item] = data;
                that.setData({
                  newslist: that.data.newslist
                })
              } else {
                var newheader = 'friendlist[' + data.c_id + '].header';
                var newusername = 'friendlist[' + data.c_id + '].username';
                that.setData({
                  ['newusername']: data.username,
                  ['newheader']: data.header,
                  newslist: that.data.newslist.concat([data])
                })
              }
            }
          }
        }
      } else {
        //群聊
        if (data.type == 'is_ok') {

        } else {
          if(data.content==undefined){

          }else{
            var newworkid = data.content.workid;
            that.data.unreadnumberarr[newworkid]+=1;
            that.setData({
              unreadnumberarr:that.data.unreadnumberarr
            })
          }
          if (that.data.groupIdArr.includes(parseInt(data.content.workid))) {
            for (var item in that.data.lastmsg) {
              if (item == parseInt(data.content.workid)) {
                if(that.data.lastmsg[item].content==undefined){
                  that.data.lastmsg[item] = data
                  that.setData({
                    lastmsg: that.data.lastmsg
                  })
                }else{
                  that.data.lastmsg[item].content = data.content
                  that.setData({
                    lastmsg: that.data.lastmsg
                  })
                }
              }

            }
          } else {

          }
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
    var that = this;
    that.setData({
      unreadnumberarr:[]
    })
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