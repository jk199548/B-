// pages/addposition/addposition.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    salaryday:'天',
    salaryselectedid:0,
    salarymodallist:['日结','周结','月结'],
    showmodal:false,
    imagecount:6,
    uploadconpanyimage: '../../images/shiming/conpany.png',
    conpanyimage: [],
    logourl:'../../images/index/uploadlogo.png',//公司logo
  },
  //显示薪资模态框
  showsalarymodal:function(e){
    var that = this;
    that.setData({
      showmodal:true,
    })
  },
  //关闭掉薪资待遇模态框
  closesalarymodal:function(e){
    var that = this;
    that.setData({
      showmodal:false,
    })
  },
  //薪资待遇模态框薪资结算方法的点击
  choosesalaryway:function(e){
    var that = this;
    if(e.currentTarget.dataset.id==0){
      that.setData({
        salaryselectedid: e.currentTarget.dataset.id,
        salaryday: '天'
      })
    }else if(e.currentTarget.dataset.id==1){
      that.setData({
        salaryselectedid: e.currentTarget.dataset.id,
        salaryday: '周'
      })
    } else if (e.currentTarget.dataset.id == 2){
      that.setData({
        salaryselectedid: e.currentTarget.dataset.id,
        salaryday: '月'
      })
    }
   
  },
  //跳转到职位要求页面
  topositionrequire:function(e){
    wx.navigateTo({
      url: '../positionrequire/positionrequire',
    })
  },
  //上传公司环境图片
  uploadconpanyimage:function(e){
    var that = this;
    if (that.data.conpanyimage.length > 6) {
      wx.showToast({
        title: '最多上传6张',
        icon: 'none'
      })
    }else{
      wx.chooseImage({
        count: that.data.imagecount,
        success: function (res) {
          that.setData({
            conpanyimage: that.data.conpanyimage.concat(res.tempFilePaths),
            imagecount: that.data.imagecount - that.data.conpanyimage.concat(res.tempFilePaths).length
          })
        },
      })
    }
  },
  //选择公司logo
  chooseconpanylogo:function(e){
    var that = this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        that.setData({
          logourl:res.tempFilePaths
        })
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