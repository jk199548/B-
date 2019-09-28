// pages/chat/chat.js
const app = getApp();
const websocket = require('../../utils/websocket.js');
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    toview:'',
    msglist:[],
    inputword:'',
    workerid:'',
    image:''
  },
  //预览聊天记录中的图片
  previewimage: function (e) {
    var that = this;
    wx.previewImage({
      urls: [e.currentTarget.dataset.image],
    })
  },
  //选择发送图片
  chooseimage:function(e){
    var that = this;
    wx.chooseImage({
      count:1,
      success: function(res){
        wx.uploadFile({
          url: 'https://www.xiaoshetong.cn/api/recruit/uploadLogo',
          filePath: res.tempFilePaths[0],
          name: 'logo',
          success:function(res){
            that.setData({
              image: JSON.parse(res.data).result
            })
            var time = util.formatTime(new Date());
            wx.request({
              url: 'https://www.xiaoshetong.cn/api/sendToPrivate',
              data:{
                'b_id':wx.getStorageSync('id'),
                'c_id':that.data.workerid,
                'is_rec':1,
                'massage': JSON.parse(res.data).result,
                'type':1,
                'username':wx.getStorageSync('username'),
                'header':wx.getStorageSync('header'),
                'created_at':time
              },
              success:function(res){
                that.setData({
                  msglist: that.data.msglist.concat([
                    {
                      'b_id': wx.getStorageSync('id'),
                      'c_id': that.data.workerid,
                      'created_at': time,
                      'header': wx.getStorageSync('header'),
                      'id': res.data,
                      'is_rec': 1,
                      'massage': that.data.image,
                      'type': 1,
                      'username': wx.getStorageSync('username'),
                    }
                  ]),
                  toview: 'msg-' + (that.data.msglist.length - 1),
                  inputword: ''
                })
              }
            })
          }
        })
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
  //输入聚焦是触发的事件
  focus:function(){
    var that = this;
    that.setData({
      toview:'num'
    })
  },
  //发送消息
  sendmsg:function(e){
    var that = this;
    var time = util.formatTime(new Date());
    if(that.data.inputword==''){
      wx.showToast({
        title: '消息不能为空',
        icon:'none'
      })
    }else{
      wx.request({
        url: 'https://www.xiaoshetong.cn/api/sendToPrivate',
        data: {
          'b_id': wx.getStorageSync('id'),
          'c_id': that.data.workerid,
          'is_rec': 1,
          'massage': that.data.inputword,
          'type': 0,
          'username': wx.getStorageSync('username'),
          'header': wx.getStorageSync('header'),
          'created_at': time,
        },
        success: function (res) {
          that.setData({
            msglist: that.data.msglist.concat([
              {
                'b_id': wx.getStorageSync('id'),
                'c_id': that.data.workerid,
                'created_at': time,
                'header': wx.getStorageSync('header'),
                'id': 32,
                'is_rec': 1,
                'massage': that.data.inputword,
                'type': 0,
                'username': wx.getStorageSync('username'),
              }
            ]),
            toview: 'msg-' + (that.data.msglist.length - 1),
            inputword: ''
          })
        }
      })
    }
    
  },
  //获取私聊聊天记录
  getPersonChatRecord:function(e){
    var that = this;
    wx.request({
      url: '',
      data:{
        '':'',
      }
    })
  },
  //标记消息为已读
  tabnewsRead:function(e){
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/tabRead',
      data:{
        'b_id':wx.getStorageSync('id'),
        'c_id':that.data.workerid,
        'is_rec':1
      },
      success:function(res){

      }
    })
  },
  //获取聊天记录
  getchatmsgrecord: function (e) {
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/getMsg',
      data: {
        'b_id': wx.getStorageSync('id'),
        'c_id': that.data.workerid,
        'is_rec': 1
      },
      success: function (res) {
        //1是有新消息
        //0是历史消息
        //14是错误
        //15是无消息
        if (res.data.code == 1) {
          wx.request({
            //获取用户未读消息
            url: 'https://www.xiaoshetong.cn/api/getPrivateMsg',
            data: {
              'b_id': wx.getStorageSync('id'),
              'c_id': that.data.workerid,
              'is_rec': 1
            },
            success: function (res) {
              that.setData({
                msglist: that.data.msglist.concat(res.data.result[0]),
                toview: 'msg-' + (that.data.msglist.length - 1),
              })
            }
          })
        } else if (res.data.code == 0) {
          //获取历史消息
          that.setData({
            msglist: that.data.msglist.concat(res.data.result),
            toview: 'msg-' + (that.data.msglist.length - 1),
          })
        } else if (res.data.code == 15) {
          //无消息

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    var that = this;
    that.setData({
      workerid:options.workerid
    })
    that.getchatmsgrecord();
    wx.onSocketMessage(function(res){
      var pages = getCurrentPages();
      
      if (pages[pages.length - 1].route == "pages/chat/chat") {
        if (JSON.parse(res.data).type == 0 || JSON.parse(res.data).type==1){
          wx.request({
            url: 'https://www.xiaoshetong.cn/api/tabOneRead',
            data: {
              'msg_id': JSON.parse(res.data).id
            },
            success: function (res) {
            }
          })
        }
      }else{
        
      }
      if (JSON.parse(res.data).type=='is_ok'){
        
      }else{
        that.setData({
          msglist: that.data.msglist.concat([JSON.parse(res.data)]),
          toview: 'msg-' + (that.data.msglist.length - 1),
        });
      }
    })
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
        url: 'https://www.xiaoshetong.cn/api/setLastMsgId',
        data: {
          'b_id': wx.getStorageSync('id'),
          'c_id': that.data.workerid,
          'msg_id': that.data.msglist[that.data.msglist.length - 1].id,
          'is_rec': 1
        },
        success: function (res) {

        }
      })
    }
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