// pages/conpanyrenzheng/conpanyrenzheng.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    image:'../../images/index/banner1.png',
    companyname:'',
    companyusername:'',
    companyidcard:'',
    username:'',
    idcard:'',
    sex:'',
    openid:wx.getStorageSync('openid'),
    isCompany:1,
    header:wx.getStorageSync('header') ||'',
    license:'',
  },
  //选择图片
  chooseimage:function(e){
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        wx.uploadFile({
          url: 'https://www.xiaoshetong.cn/api/recruit/uploadImage',
          filePath:res.tempFilePaths[0],
          name:'image',
          formData:{
            'prefix':'license',
          },
          success: function(res){
            if(res.statusCode==200){
              wx.showToast({
                'title':'上传成功',
                'icon':'none'
              })
              that.setData({
                image:JSON.parse(res.data).license,
                license:JSON.parse(res.data).license,
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
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
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
      console.log(that.data.idcard)
      wx.showToast({
        title:'身份证号码格式有误',
        icon:'none'
      })
      that.setData({
        loading:false,
      })
    }else if(that.data.license==''){
      wx.showToast({
        title:'请上传营业执照',
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
      if(wx.getStorageSync('is_company')===0){
        if(wx.getStorageSync('is_company')==1){
          
        }else{
          api._post('/editUserInfo',{
            'isCompany':1,
            'license':that.data.license,
            'company':that.data.companyname,
            'id':wx.getStorageSync('id')
          }).then(res=>{
            console.log(res)
            if(res.code==0){
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
      }else{
        api._post('/register',{
          'username':e.detail.value.username,
          'idcard':e.detail.value.idcard,
          'sex':e.detail.value.sex,
          'phone':e.detail.value.phonenum,
          'openid':wx.getStorageSync('openid'),
          'isCompany':1,
          'header':wx.getStorageSync('header'),
          'license':that.data.license,
          'company':that.data.companyname
        }).then(res=>{
          console.log(res)
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(wx.getStorageSync('token')){
      api._get('/getMyDetails',{
        'token':wx.getStorageSync('token'),
        'id':wx.getStorageSync('id')
      }).then(res=>{
        that.setData({
          idcard:res.result.idcard,
          sex:res.result.sex,
          username:res.result.username,
          phonenum:res.result.phone,
        })
      })
    }
    if(options.companyname!=''){
      that.setData({
        companyname:options.companyname
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