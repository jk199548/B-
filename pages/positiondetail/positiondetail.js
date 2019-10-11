var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:'',
    wages:'',
    workid:'',
    salarymodallist: ['日结', '小时', '月结'],
    companyimage:[],
    uploadconpanyimage: '../../images/shiming/conpany.png',
    logourl: '../../images/index/uploadlogo.png',//公司logo
    catetext:'',
    cate: '',
    describe: '',//工作描述
    cycle: 1,
    number: '',//职位需要的招聘人数
    title: '',//职位的名称
    location: '',//详细位置
    street: '',//街道
    experience: '',//工作经验要求
    age: '',//年龄
    education: '',//学历
    sex: '',//性别要求
    welfarearr: [],
    welfare: '',//工作福利
    validity_time: '',//招聘有效期
  },
  //停止招聘
  stopzhaopin:function(e){
    var that = this;
    api._put('/delWork',{
      'id':wx.getStorageSync('id'),
      'workid':that.data.workid
    }).then(res=>{
      if(res.code==0){
        wx.showToast({
          title: '下架成功',
        });
        wx.navigateBack({
          delta:1
        })
      }
    })
  },
  //点击编辑按钮
  toeditposition:function(e){
    var that = this;
    wx.navigateTo({
      url: '../editposition/editposition?workid='+that.data.workid,
    })
  },
  //获取工作详情
  getWorkDetails:function(e){
    var that = this;
    api._get('/workDetail',{
      "id":that.data.workid,
    }).then(res=>{
      if(res.code==0){
        var newmyposition = that.data.welfarearr.concat([res.result]);
        for (let i = 0; i < newmyposition.length; i++) {
          if (newmyposition[i].welfare != null) {
            var newwelfare = newmyposition[i].welfare.split("，");
            newmyposition[i].welfare = newwelfare;
          }
        }
        that.setData({
          status:res.result.status,
          location:res.result.address,
          logourl:res.result.header,
          age:res.result.age,
          experience:res.result.experience,
          education:res.result.education,
          sex:res.result.sex,
          title:res.result.title,
          describe:res.result.describe.content,
          cycle:res.result.cycle,
          number:res.result.number,
          validity_time:res.result.validity_time,
          wages:res.result.wages,
          cate:res.result.cate,
          welfarearr:newwelfare,
          companyimage:res.result.work_image
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      workid:options.workid
    })
    that.getWorkDetails();
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
    var that = this;
    that.getWorkDetails();
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