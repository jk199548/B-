// pages/fabu/fabu.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    success:false,
    uploadsuccessarr:[],//显示和隐藏线上和本地图片的标志符数组
    showmodalarr:[],//是否显示遮罩层的数组
    showprogressarr:[],//是否显示进度条数组
    percentarr:[],//进度条的的数字数组
    onlineimagearr:[],//线上图片数组
    localimagearr:[],//本地图片数组
    inputcontent:'',//用户输入的动态内容
  },
  //发布按钮事件
  addDynamic:function(e){
    var that = this;
    if(that.data.inputcontent==''){
      wx.showToast({
        title: '内容不能为空',
        icon:'none'
      })
    }else if(that.data.onlineimagearr.length==0){
      api._post('/addDynamic', {
        'recruiter_id': wx.getStorageSync('id'),
        'content': that.data.inputcontent,
      }).then(res => {
        wx.showToast({
          title:'发布成功'
        });
        wx.switchTab({
          url: '../index/index',
        })
      })
    }else{
      api._post('/addDynamic',{
        'images':that.data.onlineimagearr,
        'recruiter_id':wx.getStorageSync('id'),
        'content':that.data.inputcontent,
      }).then(res=>{
        wx.showToast({
          title:'发布成功'
        });
        wx.switchTab({
          url: '../index/index',
        })
      })
    }
  },
  //用户输入的内容
  inputcontent:function(e){
    var that = this;
    that.setData({
      inputcontent:e.detail.value
    })
  },
  //长按删除图片
  bingLongTap:function(e){
    
  },
  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },
  bindTouchEnd: function (e) {
    this.endTime = e.timeStamp;
  },
  //预览图片
  bindTap:function(e){
    if (this.endTime - this.startTime < 350) {
      wx.previewImage({
        urls: [e.currentTarget.dataset.id],
      })
    }
  },
  //选择图片并上传图片
  chooseimage:function(e){
    var that = this;
    wx.chooseImage({
      success: function(res) {
        for(var i=0;i<res.tempFilePaths.length;i++){
          that.setData({
            uploadsuccessarr:that.data.uploadsuccessarr.concat([true]),
            percentarr:that.data.percentarr.concat([20]),
            showmodalarr:that.data.showmodalarr.concat([true]),
            showprogressarr:that.data.showprogressarr.concat([true])
          })
        }
        that.setData({
          localimagearr:that.data.localimagearr.concat(res.tempFilePaths),
          success:true,
        })
        for(var j=0;j<res.tempFilePaths.length;j++){
          wx.uploadFile({
            url: 'https://www.xiaoshetong.cn/api/recruit/uploadDynamicImage',
            filePath: res.tempFilePaths[j],
            name: 'image',
            formData:{
              'num':j
            },
            success:function(res){
              var data = JSON.parse(res.data);
              var noshowmodalarr = that.data.showmodalarr=[];
              noshowmodalarr.push(false)
              var noshowprogressarr = that.data.showprogressarr=[];
              noshowprogressarr.push(false)
              var newpercentarr = that.data.percentarr=[];
              newpercentarr.push(100);
              var newuploadsuccessarr = that.data.uploadsuccessarr=[];
              newuploadsuccessarr.push(false)
              that.setData({
                onlineimagearr:that.data.onlineimagearr.concat([data.result.url]),
                showmodalarr:that.data.showmodalarr.concat(noshowmodalarr),
                showprogressarr: that.data.showprogressarr.concat(noshowprogressarr),
                percentarr:that.data.percentarr.concat(newpercentarr),
                uploadsuccessarr: that.data.uploadsuccessarr.concat(newuploadsuccessarr),
                success:false,
              });
            }
          })
        }
      },
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