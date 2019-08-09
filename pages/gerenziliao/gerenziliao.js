// pages/gerenziliao/gerenziliao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fuwuregion:'',
    positionname:'aa',
    name:'西喜爱',
    phonenum:'额呵呵呵',
    shopaddress:'乐乐乐乐',
    changeshopaddress:false,
    changephonenum:false,
    changename:false,
  },
  //选择服务区域
  chooseregion:function(e){
    var that = this;
    that.setData({
      fuwuregion:e.detail.value
    })
  },
  //点击修改职位名称
  positionnamehandler:function(e){
    var that = this;
    that.setData({
      changepositionname:false,
    })
  },
  //点击修改姓名
  namehandler:function(e){
    var that = this;
    that.setData({
      changename: false,
    })
  },
  //点击修改联系方式
  phonenumhandler:function(e){
    var that = this;
    that.setData({
      changephonenum:false,
    })
  },
  //点击修改门店的地址
  shophandler:function(e){
    var that = this;
    that.setData({
      changeshopaddress:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(that.data.shopaddress==''){
      that.setData({
        changeshopaddress:false,
      })
    }else{
      that.setData({
        changeshopaddress: true,
      })
    }
    if (that.data.phonenum == '') {
      that.setData({
        changephonenum: false,
      })
    } else {
      that.setData({
        changephonenum: true,
      })
    }
    if (that.data.name == '') {
      that.setData({
        changename: false,
      })
    } else {
      that.setData({
        changename: true,
      })
    }
    if (that.data.positionname == '') {
      that.setData({
        changepositionname: false,
      })
    } else {
      that.setData({
        changepositionname: true,
      })
    }
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