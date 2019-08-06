// pages/positiondetail/positiondetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showmodal: false,
    salarymodallist: ['日结', '周结', '月结'],
    isedit:false,//是否是可编辑的状态
    workex:'',
    schoolex:'',
    age:'',
    sexrequire:'',
    salary:''
  },
  //薪资模态框完成按钮点击事件
  salaryconpletebtn:function(e){
    var that = this;
    that.setData({
      showmodal:false,
      salary:that.data.salary +'元/每'+ that.data.salaryday
    })
  },
  //薪资模态框输入事件
  inputsalary:function(e){
    var that = this;
    that.setData({
      salary:e.detail.value
    })
  },
  //显示薪资模态框
  showsalarymodal: function (e) {
    var that = this;
    if(that.data.isedit){
      that.setData({
        showmodal: true,
      })
    }
  },
  //关闭掉薪资待遇模态框
  closesalarymodal: function (e) {
    var that = this;
    that.setData({
      showmodal: false,
    })
  },
  //薪资待遇模态框薪资结算方法的点击
  choosesalaryway: function (e) {
    var that = this;
    if (e.currentTarget.dataset.id == 0) {
      that.setData({
        salaryselectedid: e.currentTarget.dataset.id,
        salaryday: '天'
      })
    } else if (e.currentTarget.dataset.id == 1) {
      that.setData({
        salaryselectedid: e.currentTarget.dataset.id,
        salaryday: '周'
      })
    } else if (e.currentTarget.dataset.id == 2) {
      that.setData({
        salaryselectedid: e.currentTarget.dataset.id,
        salaryday: '月'
      })
    }

  },
  //跳转到职位要求页面
  topositionrequire:function(e){
    var that = this;
    if(that.data.isedit){
      wx.navigateTo({
        url: '../positionrequire/positionrequire',
      })
    }
  },
  //编辑按钮点击事件
  editbtn:function(e){
    var that = this;
    that.setData({
      isedit:true,
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