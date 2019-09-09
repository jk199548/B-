//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    delmodalid:0,
    showdelmodal:false,
    mydongtainodata:false,
    navid:0,
    showmodal:false,
    shaixuanisactive:false,
    zhaopinnodata:false,
    selectedid:0,
    navarr:['招聘','人才市场','我的职位','我的动态'],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //跳转到职位详情页面
  topositiondetail:function(e){
    var that = this;
    wx.navigateTo({
      url: '../positiondetail/positiondetail',
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
  },
})
