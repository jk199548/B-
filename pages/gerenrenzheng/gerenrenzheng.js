// pages/shimingrenzheng/shimingrenzheng.js
const api = require('../../utils/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showfronttext: true,
    showbacktext: true,
    username: '',//用户输入的名字
    idcard: '',//用户输入的身份证号
    idcardfront: '../../images/shiming/shenfenzheng.png',//身份证正面照片
    idcardback: '../../images/shiming/shenfenzheng.png',//身份证反面照片
  },
  //表单提交
  formSubmit:function(e){
    var that = this;
    var usernamereg = /^(([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$))/;
    var phonenumreg = /^1[3456789]\d{9}$/;
    var idcardreg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
    if(!usernamereg.test(e.detail.value.username)){
      wx.showToast({
        title:'姓名格式有误',
        icon:'none'
      })
      that.setData({
        loading:false,
      })
    }else if(!phonenumreg.test(e.detail.value.phonenum)){
      wx.showToast({
        title:'电话号码格式有误',
        icon:'none'
      })
      that.setData({
        loading:false,
      })
    }else if(!idcardreg.test(e.detail.value.idcard)){
      wx.showToast({
        title:'身份证号码格式有误',
        icon:'none'
      })
      that.setData({
        loading:false,
      })
    }else{
      api._get('/setFormID',{
        'formId':e.detail.formId,
        'is_rec':1,
      }).then(res=>{
      })
      api._post('/register',{
        'username':e.detail.value.username,
        'idcard':e.detail.value.idcard,
        'sex':e.detail.value.sex,
        'phone':e.detail.value.phonenum,
        'openid':wx.getStorageSync('openid'),
        'isCompany':0,
        'header':wx.getStorageSync('header'),
        'position':that.data.idcardfront,
        'back':that.data.idcardback
      }).then(res=>{
        if(res.code==0){
          wx.setStorageSync('token',res.result.token);
          wx.setStorageSync('id', res.result.id);
          that.setData({
            loading:false,
          });
          wx.showToast({
            title:'认证成功',
            icon:'none'
          });
          wx.switchTab({
            url: '../index/index',
          })
        }
      })
    }
  },
  // //获取用户输入的姓名
  // getusername: function (e) {
  //   var reg = /^(([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$))/;
  //   console.log(reg.test(e.detail.value))
  //   if (reg.test(e.detail.value)) {
  //     var that = this;
  //     that.setData({
  //       username: e.detail.value,
  //     })
  //   } else {
  //     wx.showToast({
  //       title: '请输入正确的名字格式',
  //       duration: 2000,
  //       icon: 'none'
  //     })
  //   }
  // },
  // // 获取用户输入的身份证号
  // getidcard: function (e) {
  //   var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  //   if (reg.test(e.detail.value)) {
  //     var that = this;
  //     that.setData({
  //       idcard: e.detail.value,
  //     })
  //   } else {
  //     wx.showToast({
  //       title: '请输入正确的身份证号码',
  //       duration: 2000,
  //       icon: 'none'
  //     })
  //   }
  // },
  //用户选择正面照片
  chooseimagefront: function (e) {
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        wx.uploadFile({
          url: 'https://www.xiaoshetong.cn/api/recruit/uploadImage',
          filePath:res.tempFilePaths[0],
          name:'image',
          formData:{
            'prefix':'bank',
          },
          success: function(res){
            if(res.statusCode==200){
              wx.showToast({
                'title':'上传成功',
                'icon':'none'
              })
              
              that.setData({
                idcardfront:JSON.parse(res.data).bank,
                showfronttext: !that.data.showfronttext
              })
            }else{
              wx.showToast({
                title:'上传失败，请重试',
                icon:"none",
                duration:2000
              })
            }
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      },
    })
  },
  //选择身份证背面
  chooseimageback: function (e) {
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        wx.uploadFile({
          url: 'https://www.xiaoshetong.cn/api/recruit/uploadImage',
          filePath:res.tempFilePaths[0],
          name:'image',
          formData:{
            'prefix':'position',
          },
          success: function(res){
            if(res.statusCode==200){
              wx.showToast({
                'title':'上传成功',
                'icon':'none'
              })
              that.setData({
                idcardback:JSON.parse(res.data).position,
                showbacktext: !that.data.showbacktext
              })
            }else{
              wx.showToast({
                title:'上传失败，请重试',
                icon:"none",
                duration:2000
              })
            }
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      },
    })
  },
  //用户选择反面照片
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