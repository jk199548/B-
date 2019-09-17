//index.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');
var  util = require('../../utils/util.js');
Page({
  data: {
    delmodalid:0,
    showdelmodal:false,
    mydongtainodata:false,
    mypositionnodata:true,
    navid:0,
    showmodal:false,
    shaixuanisactive:false,
    zhaopinnodata:false,
    selectedid:0,
    navarr:['招聘','人才市场','我的职位','我的动态'],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    dynamiclist:[],
    myposition:[],
  },
  //获取用户已经发布的职位
  getMyWork:function(e){
    var that = this;
    api._get('/getMyWork',{
      'token':wx.getStorageSync('token'),
      'id':wx.getStorageSync('id')
    }).then(res=>{
      console.log(res)
      if(res.code==0){
        var newmyposition = res.result;
        for (let i = 0; i < newmyposition.length; i++) {
          if (newmyposition[i].welfare != null) {
            var newwelfare = newmyposition[i].welfare.split("，");
            newmyposition[i].welfare = newwelfare;
          }
        }
        that.setData({
          mypositionnodata:false,
          myposition:newmyposition
        })
      }
    })
  },
  //获取到我的动态数据
  getDynamic:function(e){
    var that = this;
    api._get('/getDynamic',{
      'recruiter_id':wx.getStorageSync('id')
    }).then(res=>{
      console.log(res)
      if(res.code==0){
        if(res.result.length==0){
          that.setData({
            mydongtainodata:true,
          })
        }else{
          for(var i = 0; i < res.result.length; i++){
            res.result[i].created_at = util.js_date_time(res.result[i].created_at);
          }
          that.setData({
            dynamiclist:res.result,
            mydongtainodata:false
          })
        }
      }
    })
  },
  //跳转到职位发布页面
  toaddposition:function(e){
    var that = this;
    wx.navigateTo({
      url: '../addposition/addposition',
    })
  },
  //跳转到职位详情页面
  topositiondetail:function(e){
    var that = this;
    console.log(e)
    wx.navigateTo({
      url: '../positiondetail/positiondetail?workid='+e.currentTarget.dataset.id,
    })
  },
  //跳转到发布页面
  tofabu:function(e){
    var that = this;
    wx.navigateTo({
      url: '../fabu/fabu',
    })
  },
  //删除动态事件
  deldongtai:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除此条动态',
      confirmText:'确定',
      cancelText:'取消',
      success:function(res){
        if(res.confirm){
          that.setData({
            showdelmodal:false
          });
          api._delete('/deleteDynamic',{
            'id':e.currentTarget.dataset.id,
            'recruiter_id':wx.getStorageSync('id')
          }).then(res=>{
            if(res.code==0){
              that.getDynamic();
            }
          })
        }else{
          console.log('取消删除')
        }
      }
    })
  },
  //点击我的动态页面的图标事件展示分享删除弹框
  showdelmodal:function(e){
    var that = this;
    console.log(e)
    that.setData({
      showdelmodal:!that.data.showdelmodal,
      delmodalid:e.currentTarget.dataset.id
    })
  },
  //跳转到投递详情页面
  totoudixiangqing:function(e){
    var that = this;
    wx.navigateTo({
      url: '../toudixiangqing/toudixiangqing',
    })
  },
  //点击人才市场的看过我的
  lookme:function(e){
    var that = this;
    that.setData({
      navid:e.currentTarget.dataset.id
    })
  },
  //点击人才市场的收藏我的
  shoucangme: function (e) {
    var that = this;
    that.setData({
      navid: e.currentTarget.dataset.id
    })
  },
  //点击人才市场的新求职者
  newworker: function (e) {
    var that = this;
    that.setData({
      navid: e.currentTarget.dataset.id
    })
  },
  //点击模态框隐藏
  showmodal:function(e){
    var that =this;
    that.setData({
      showmodal:false,
    })
  },
  //点击招聘筛选
  shaixuan:function(e){
    var that =this;
    that.setData({
      shaixuanisactive:!that.data.shaixuanisactive,
      showmodal:!that.data.showmodal,
    })
  },
  //跳转到人场市场
  torencaishichang:function(e){
    var that = this;
    that.setData({
      selectedid:1,
    })
  },
  //changenav点击导航切换事件
  changenav:function(e){
    var that =this;
    that.setData({
      selectedid:e.currentTarget.dataset.id
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    that.getDynamic();
    that.getMyWork();
  },
  onShow:function(){
    var that = this;
    that.getDynamic();
    that.getMyWork();
  }
})
