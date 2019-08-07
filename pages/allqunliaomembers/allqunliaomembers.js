// pages/allqunliaomembers/allqunliaomembers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showmodalgroup:false,
    memberslist:[
      {
        'name':'么么哒',
        'avtar':'../../images/index/avtar.png',
        'group':'赏罚分明'
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
      {
        'name': '么么哒',
        'avtar': '../../images/index/avtar.png',
        'group': 1
      },
    ],
    selectedgroupid:0
  },
  //长按显示分组
  showgroupmodal:function(e){
    console.log(e)
    var that = this;
    that.setData({
      showmodalgroup:true,
      selectedgroupid: e.currentTarget.dataset.id
    })
    console.log(that.data.selectedgroupid)
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