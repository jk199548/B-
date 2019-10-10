// pages/myjianliku/myjianliku.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist:['全部简历','已收到的','工作中的','已完成的'],
    selectednavid:0,
    alllist:[],//全部简历数组
    receivedlist:[],//已收到简历数组
    workinglist:[],//正在工作中简历数组
    endlist:[]//已完成简历数组
  },
  //跳转到个人投递详情
  togerentoudixiangqing: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../gerentoudixiangqing/gerentoudixiangqing?workerid=' + e.currentTarget.dataset.id + "&workid=" + e.currentTarget.dataset.workid + "&title=" + that.data.title + "&created_at=" + e.currentTarget.dataset.created_at,
    })
  },
  //已收到4，工作中是1，完成是2
  getAllResume:function(e){
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/recruit/getAllResume',
      data:{
        'id':wx.getStorageSync('id')
      },
      success:function(res){
        if(res.data.code==0){
          var arr = that.data.alllist;
          for(var item in res.data.result.works){
            arr.push(res.data.result.works[item].all_worker)
          };
          that.setData({
            alllist:arr
          });
          var newreceivedlist = that.data.receivedlist;
          var newworkinglist = that.data.workinglist;
          var newendlist = that.data.endlist;
          for(var i in that.data.alllist){
            for(var j in that.data.alllist[i]){
              newreceivedlist.push(that.data.alllist[i][j])
            }
          }
          that.setData({
            receivedlist:newreceivedlist,
          });
          that.setData({
            receivedlist: that.removeRepeat(that.data.receivedlist)
          });
          for(var j in that.data.receivedlist){
            if(that.data.receivedlist[j].pivot.status==1){
              newworkinglist.push(that.data.receivedlist[j])
            } else if (that.data.receivedlist[j].pivot.status == 2){
              newendlist.push(that.data.receivedlist[j])
            }
          }
          that.setData({
            workinglist:newworkinglist,
            endlist:newendlist
          })
        }
      }
    })
  },
  removeRepeat:function(nodes) {
    var arr = [], obj = {};
    for(var i = 0, l = nodes.length; i<l;i++ ){
      var item = nodes[i].id;
      if (obj[item]) {
        obj[item] += 1;
      } else {
        obj[item] = 1;
        arr.push(nodes[i])
      }
    }
    return arr;
  },
  //导航切换点击事件
  changenav:function(e){
    var that = this;
    that.setData({
      selectednavid:e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getAllResume();
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