// pages/personrecruitmentdetail/personrecruitmentdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qiyebasicinfo:[
      {
        'name':'企业类型',
        'text':'有限责任公司(台港澳法人独资)',
        'type':'conpanystyle'
      },
      {
        'name': '经营状态',
        'text': '存续',
        'type': 'conpanystyle'
      },
      {
        'name': '注册资本',
        'text': '100万元',
        'type': 'conpanystyle'
      },
      {
        'name': '行业类型',
        'text': '商务服务业',
        'type': 'conpanystyle'
      },
      {
        'name': '成立日期',
        'text': '2005年04月25日',
        'type': 'conpanystyle'
      },
      {
        'name': '注册地址',
        'text': '上海市长宁区广顺路33号6幢6楼',
        'type': 'conpanystyle'
      },
      {
        'name': '登记机关',
        'text': '上海市工商局',
        'type': 'conpanystyle'
      },
      {
        'name': '统一社会信用代码',
        'text': '91310000773718882U',
        'type': 'conpanystyle'
      },
      {
        'name': '组织机构代码',
        'text': '773718882',
        'type': 'conpanystyle'
      },
      {
        'name': '经营范围',
        'text': '餐饮企业管理（不含食品生产经营）；饮品店（不含熟食卤味，限分支机构经营）。【依法须经批准的项目，经相关部门批准后方可开展经营活动】',
        'type': 'conpanystyle'
      },
    ],
    qiyeimageurl: ['../../images/index/jd1.png', '../../images/index/jd1.png', '../../images/index/jd1.png', '../../images/index/jd1.png', '../../images/index/jd1.png', '../../images/index/jd1.png',],
    imageurl: ['https://www.xiaoshetong.cn/upload_auth/2019-07-26/R5sIR7EC0B2P7YNkn7B.png', 'https://www.xiaoshetong.cn/upload_auth/2019-07-26/R5sIR7EC0B2P7YNkn7B.png', 'https://www.xiaoshetong.cn/upload_auth/2019-07-26/R5sIR7EC0B2P7YNkn7B.png','https://www.xiaoshetong.cn/upload_auth/2019-07-26/R5sIR7EC0B2P7YNkn7B.png'],
    selectid:0,
    navlist: ['在招职位', '个人介绍','我的动态'],
    readmore:{
      status:false,
      tip:'查看更多',
    },
    showmodal:false,
    ismore:false,
    height:290,
    isdianzan:false,
    showsharemodal:false,
  },
  //跳转到编辑上传个人介绍页面
  tobianji:function(e){
    var that = this;
    wx.navigateTo({
      url: '../personrecruitmentdetailbianji/personrecruitmentdetailbianji?selectid=1',
    })
  },
  //点击nav切换事件
  changenavid:function(e){
    var that = this;
    that.setData({
      selectid: e.currentTarget.dataset.id
    })
  },
  //立即报名点击事件
  baoming:function(e){
    var that = this;
    that.setData({
      showmodal:true,
    })
  },
  //点击模态框空白处事件
  showmodal:function(e){
    var that = this;
    that.setData({
      showmodal:false,
    })
  },
  //点击分享图标事件
  share:function(e){
    var that = this;
    that.setData({
      showsharemodal:true,
    })
  },
  showsharemodal:function(e){
    var that = this;
    that.setData({
      showsharemodal:false,
    })
  },
  //点击模态框确定按钮事件
  confirmbtn:function(e){
    var that = this;
    that.setData({
      showmodal:false,
    })
  },
  // 评论点赞
  dianzan:function(e){
    var that = this;
    that.setData({
      isdianzan:!that.data.isdianzan,
    })
  },
  // 评论查看更多按钮
  lookmore:function(e){
    const status = this.data.readmore.status;
    var that = this;
    const query = wx.createSelectorQuery()
    query.select(".pingjialist-right-bottom-normal").boundingClientRect(function (res) {
      const height = res.height//获取到的文字高度
      if(that.data.readmore.tip == '查看更多'){
        that.setData({
          height: 290,
        })
      } else if (that.data.readmore.tip == '收起'){
        
        that.setData({
          height: that.data.height + height * 2,
        })
      }
    }).exec()
    that.setData({
      readmore: {
        status: !status,
        tip: !status ? '查看更多' : '收起',
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
    const query = wx.createSelectorQuery()
    let self = this
    query.select(".pingjialist-right-bottom-normal").boundingClientRect(function (res) {
      const lineHeight = 20
      const height = res.height//获取到的文字高度
      const status = "readmore.status"
      if (height / lineHeight > 3){
        self.setData({
          [status]:true,
          ismore:true,
        })
      }else{
        self.setData({
          ismore:false,
          [status]: false,
        })
      }
    }).exec()
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