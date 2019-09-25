// pages/peoplechat/peoplechat.js
var websocket = require('../../utils/websocket.js');
var util = require('../../utils/util.js');
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshowmore: true,
    isloading: false,
    nodata: false,
    toview: '',
    msglist: [],
    group_id: '',
    inputvalue: '',
    id: '',
    lastmsgid: '',
    showmoretext: '点击查看更多聊天记录'
  },
  //点击获取聊天记录
  getchatrecord: function (e) {
    var that = this;
    that.setData({
      isshowmore: false,
      isloading: true,
    })
    api._get('/getGroupMsg', {
      'workid': that.data.group_id,
      'id': that.data.lastmsgid
    }).then(res => {
      console.log(res)
      if (res.code == 0) {
        if (res.result[0].length == 1) {
          if (res.result[0][0].id == that.data.msglist[0].id) {
            that.setData({
              showmoretext: '暂无更多了',
              nodata: true,
              isloading: false,
              isshowmore: false
            })
          }
        } else {
          var newmsglist;
          for (var item in res.result[0]) {
            res.result[0][item].content = JSON.parse(res.result[0][item].content);
            that.data.msglist.unshift(res.result[0][item]);
          }
          that.setData({
            msglist: that.data.msglist,
            lastmsgid: that.data.msglist[0].id,
            isloading: false,
            isshowmore: true,
            nodata: false,
          })
        }
      }
    })
  },
  //获取未读群消息
  getUnreadMsg: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/getUnreadMsg',
      data: {
        'workid': that.data.group_id,
        'id': wx.getStorageSync('id'),
        'is_rec': 1
      },
      success: function (res) {
        if(res.data.code==0){
          for (var index in res.data.result) {
            res.data.result[index].content = JSON.parse(res.data.result[index].content)
          }
          that.setData({
            msglist: that.data.msglist.concat(res.data.result),
            toview: 'msg-' + (res.data.result.length - 1),
            lastmsgid: res.data.result[0].id
          })
        }
      }
    })
  },
  //预览聊天记录中的图片
  previewimage: function (e) {
    var that = this;
    wx.previewImage({
      urls: [e.currentTarget.dataset.item],
    })
  },
  //获取群组的聊天记录
  getGroupMsg: function (e) {
    var that = this;
    api._get('/getGroupMsg', {
      'workid': that.data.group_id,
      'id': wx.getStorageSync('id')
    }).then(res => {

    })
  },
  //跳转到职位详情
  topositiondetail: function (e) {
    wx.navigateTo({
      url: '../positiondetail/positiondetail',
    })
  },
  //跳转到群公告
  toqungonggao: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../qungonggao/qungonggao?workid=' + that.data.group_id,
    })
  },
  //跳转到群签到
  toqiandao: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../qiandao/qiandao?workid=' + that.data.group_id,
    })
  },
  //跳转到群管理
  toqunguanli: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../qunguanli/qunguanli?workid='+that.data.group_id,
    })
  },
  //监听输入框事件
  bindinput: function (e) {
    var that = this;
    that.setData({
      inputvalue: e.detail.value
    })
  },
  //选择图片发送
  chooseimage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        wx.showLoading({
          title: '正在发送图片',
        });
        wx.uploadFile({
          url: 'https://www.xiaoshetong.cn/api/recruit/uploadLogo',
          filePath: res.tempFilePaths[0],
          name: 'logo',
          success: function (res) {
            var time = util.formatTime(new Date());
            wx.request({
              url: 'https://www.xiaoshetong.cn/api/sendMsg',
              data: {
                'workid': that.data.group_id,
                'id': wx.getStorageSync('id'),
                'msg': {
                  'type': 'say',
                  'content': JSON.parse(res.data).result,
                  'contentType': 'image',
                  'id': wx.getStorageSync('id'),
                  'workid': that.data.group_id
                },
                'created_at': time,
                'is_rec': 1,
                'username': wx.getStorageSync('username'),
                'header': wx.getStorageSync('header'),
              },
              success: function (res) {
                wx.hideLoading();
              }
            })
          }
        })
      },
    })
  },
  //发送消息按钮
  sendmsg: function (e) {
    var that = this;
    var time = util.formatTime(new Date());
    if (that.data.inputvalue == '') {
      wx.showToast({
        title: '消息不能为空哦',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showLoading({
        title: '正在发送',
        icon: 'none',
      });
      wx.request({
        url: 'https://www.xiaoshetong.cn/api/sendMsg',
        data: {
          'workid': that.data.group_id,
          'id': wx.getStorageSync('id'),
          'msg': {
            'type': 'say',
            'content': that.data.inputvalue,
            'contentType': 'text',
            'id': wx.getStorageSync('id'),
            'workid': that.data.group_id
          },
          'created_at': time,
          'is_rec': 1,
          'username': wx.getStorageSync('username'),
          'header': wx.getStorageSync('header'),
        },
        success: function (res) {
          wx.hideLoading();
          that.setData({
            inputvalue: ''
          })
        }
      })
    }
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      group_id: options.group_id,
      id: wx.getStorageSync('id')
    })
    wx.onSocketMessage(function (res) {
      if (JSON.parse(res.data).id) {
        that.setData({
          msglist: that.data.msglist.concat([JSON.parse(res.data)]),
          toview: 'msg-' + (that.data.msglist.length - 1),
        })
      }
    })
    that.getGroupMsg(that);
    that.getUnreadMsg(that);
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
    var that = this;
    if (that.data.msglist.length != 0) {
      wx.request({
        url: 'https://www.xiaoshetong.cn/api/recordUnreadId',
        data: {
          'workid': that.data.group_id,
          'msg_id': that.data.msglist[that.data.msglist.length - 1].id,
          'id': wx.getStorageSync('id'),
          'is_rec': 1
        },
        success: function (res) {

        }
      })
    }
    // api._get('/recordUnreadId',{
    //   'workid':that.data.group_id,
    //   'msg_id':that.data.msglist[that.data.msglist.length - 1].id,
    //   'id':wx.getStorageSync('id'),
    //   'is_rec':0
    // }).then(res=>{
    //   console.log(res)
    // })
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