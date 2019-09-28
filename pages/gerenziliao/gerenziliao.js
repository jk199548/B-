// pages/gerenziliao/gerenziliao.js
const api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header:'',
    fuwuregion:'',
    companyname:'',
    positionname:'',//职位名称
    name:'',//招聘人名
    phonenum:'',//电话号码
    shopaddress:'',//门店地址
    serviceregion:'',//服务区域
    idcard:'',//身份证号码
    ischange:false,//用户是否已经重新输入了新的手机号码
    changeidcard:false,
    changephonenum:false,
    changename:false,
  },
  //获取已过认证的个人或公司信息
  getMyDetail:function(e){
    var that = this;
    api._get('/getMyDetails',{
      'token':wx.getStorageSync('token'),
      'id':wx.getStorageSync('id')
    }).then(res=>{
      if(res.result.is_company==1){
        that.setData({
          companyname:res.result.company,
          header:wx.getStorageSync('header'),
          phonenum:res.result.phone,
          name:res.result.username,
          idcard:res.result.idcard,
          changephonenum:true,
          changename:true,
          changeidcard:true
        })
      }else{
        that.setData({
          name:res.result.username,
          header:wx.getStorageSync('header'),
          phonenum:res.result.phone,
          idcard:res.result.idcard,
          changephonenum:true,
          changename:true,
          changeidcard:true
        })
      }
    })
  },
  //用户修改完手机号后的提交事件
  editPhone:function(e){
    var that = this;
    var phonenumreg = /^1[3456789]\d{9}$/;
    if(phonenumreg.test(that.data.phonenum)){
      api._post('/editPhone',{
        'id':wx.getStorageSync('id'),
        'phone':that.data.phonenum
      }).then(res=>{
        if(res.code==0){
          wx.showToast({
            title:'修改成功',
            icon:'none'
          });
          wx.switchTab({
            url: '../mine/mine',
          })
        }
      })
    }else{
      wx.showToast({
        title:'手机号码格式不正确',
        icon:'none'
      })
    }
  },
  //用户输入手机号码事件
  changephonenum:function(e){
    var that = this;
    if(e.detail.value!=''){
      that.setData({
        ischange:true,
        phonenum:e.detail.value
      })
    }
  },
  //选择服务区域
  chooseregion:function(e){
    var that = this;
    that.setData({
      serviceregion:e.detail.value
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
    that.getMyDetail();
    that.setData({
      header:wx.getStorageSync('header')
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