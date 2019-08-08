// pages/qunliaofenzu/qunliaofenzu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qunliaogrouplist:[
      {
        'groupname':'小红帽新都区·1组',
        'image':'../../images/index/bianji.png',
        'delimage':'../../images/index/del.png'
      },
      {
        'groupname': '小红帽新都区·1组',
        'image': '../../images/index/bianji.png',
        'delimage': '../../images/index/del.png'
      },
      {
        'groupname': '小红帽新都区·1组',
        'image': '../../images/index/bianji.png',
        'delimage': '../../images/index/del.png'
      },
      {
        'groupname': '小红帽新都区·1组',
        'image': '../../images/index/bianji.png',
        'delimage': '../../images/index/del.png'
      },
      {
        'groupname': '小红帽新都区·1组',
        'image': '../../images/index/bianji.png',
        'delimage': '../../images/index/del.png'
      },
      {
        'groupname': '小红帽新都区·1组',
        'image': '../../images/index/bianji.png',
        'delimage': '../../images/index/del.png'
      },
      {
        'groupname': '小红帽新都区·1组',
        'image': '../../images/index/bianji.png',
        'delimage': '../../images/index/del.png'
      },
      {
        'groupname': '百世快递分拣员·1组',
        'image': '../../images/index/bianji.png',
        'delimage': '../../images/index/del.png'
      },
      {
        'groupname': '百世快递分拣员·1组',
        'image': '../../images/index/bianji.png',
        'delimage': '../../images/index/del.png'
      },
      {
        'groupname': '百世快递分拣员·1组',
        'image': '../../images/index/bianji.png',
        'delimage': '../../images/index/del.png'
      },
      {
        'groupname': '百世快递分拣员·1组',
        'image': '../../images/index/bianji.png',
        'delimage': '../../images/index/del.png'
      },
      {
        'groupname': '百世快递分拣员·1组',
        'image': '../../images/index/bianji.png',
        'delimage': '../../images/index/del.png'
      },
    ],
    isaddnewgroup:false,
    inputnewgroupname:'',//用户添加的新组名
    showmodal:false,
    modalgroupid:0,//模态框的id
    modalgroupname:'',//模态框显示时所展示的组名
    modalinputgroupname:''//模态框用户输入的新组名
  },
  //点击模态框添加新成员
  addnewmembers:function(e){
    wx.navigateTo({
      url: '../allqunliaomemberslist/allqunliaomemberslist',
    })
  },
  //点击编辑图标显示模态框
  bianji:function(e){
    var that = this;
    console.log(e)
    that.setData({
      showmodal:true,
      modalgroupid:e.currentTarget.dataset.id,
      modalgroupname:e.currentTarget.dataset.name,
      modalinputgroupname:''
    })
  },
  //点击确定保存模态里组名的修改
  savemodalchangebtn:function(e){
    var that = this;
    if(that.data.modalinputgroupname==''){
      that.setData({
        showmodal:false,
      })
    }else{
      var newqunliaogrouplist = that.data.qunliaogrouplist;
      newqunliaogrouplist[that.data.modalgroupid] = {
        'groupname': that.data.modalinputgroupname,
        'image': '../../images/index/bianji.png'
      }
      that.setData({
        showmodal: false,
        qunliaogrouplist: newqunliaogrouplist
      })
    }
  },
  //保存模态框中用户输入的新的组名
  savenewinputgroupname:function(e){
    var that = this;
    console.log(e)
    if(e.detail.value==''){
      wx.showToast({
        title: '组名不能为空',
        icon:'none'
      })
    }else if(e.detail.value==that.data.modalgroupname){
      that.setData({
        modalinputgroupname:that.data.modalgroupname
      })
    }else{
      that.setData({
        modalinputgroupname: e.detail.value,
      })
    }
  },
  //点击取消按钮关闭模态框
  closemodalbtn:function(e){
    var that = this;
    that.setData({
      showmodal:false,
    })
  },
  //保存用户输入的新分组名
  inputnewgroupnamehandler:function(e){
    var that = this;
    that.setData({
      inputnewgroupname:e.detail.value
    })
  },
  //确定添加用户输入的新的分组名单
  confirmaddnewgroupname:function(e){
    var that = this;
    if(that.data.inputnewgourpname==''){
      wx.showToast({
        title: '分组名不能为空',
        icon:'none',
        duration:2000
      })
    }else{
      that.setData({
        isaddnewgroup:false,
        qunliaogrouplist:that.data.qunliaogrouplist.concat([
          {
            'groupname': that.data.inputnewgroupname,
            'image':'../../images/index/bianji.png'
          }
        ])
      })
    }
  },
  //点击新增分组事件
  addnewgroupname:function(e){
    var that = this;
    that.setData({
      isaddnewgroup:true,
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