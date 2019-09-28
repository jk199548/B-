// pages/qunliaofenzu/qunliaofenzu.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTGroupid:'',
    currentgrouparr:[],
    allgroupmembers:[],
    groupnamelist:[],
    isaddnewgroup:false,
    inputnewgroupname:'',//用户添加的新组名
    showmodal:false,
    modalgroupid:0,//模态框的id
    modalgroupname:'',//模态框显示时所展示的组名
    modalinputgroupname:''//模态框用户输入的新组名
  },
  //点击模态框添加新成员
  addnewmembers:function(e){
    var that = this;
    wx.navigateTo({
      url: '../allqunliaomemberslist/allqunliaomemberslist?workid='+that.data.workid+'&group_id='+that.data.currentTGroupid
    })
  },
  //获取此分组的所有成员
  getCurrentGroupmenbers:function(e){
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/getWorkerGroup',
      data: {
        'workid':that.data.workid,
        'group_id':that.data.currentTGroupid
      },
      method: 'GET', 
      success: function(res){
        if(res.data.code==0){
          that.setData({
            currentgrouparr:res.data.result
          })
        }
      },
    })
  },
  //点击编辑图标显示模态框
  bianji:function(e){
    var that = this;
    that.setData({
      showmodal:true,
      currentTGroupid:e.currentTarget.dataset.id,
      modalgroupname:e.currentTarget.dataset.name,
      modalinputgroupname:''
    });
    that.getCurrentGroupmenbers();
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
  //添加新分组
  addNewGrouping:function(e){
    var that = this;
    if(that.data.inputnewgourpname==''){
      wx.showToast({
        title: '分组名不能为空',
        icon:'none',
        duration:2000
      })
    }else{
      wx.request({
        method:'POST',
        url: 'https://www.xiaoshetong.cn/api/addGroupingName',
        data: {
          'workid': that.data.workid,
          'grouping_name': that.data.inputnewgroupname
        },
        success:function(res){
          if(res.data.code==0){
            that.getGroupingName();
          }
        }
      })
      that.setData({
        isaddnewgroup:false,
      })
    }
  },
  //删除分组
  delgroupname:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除此分组名',
      cancelText:'再想想',
      success:function(res){
        if(res.confirm){
          wx.request({
            method: 'DELETE',
            url: 'https://www.xiaoshetong.cn/api/delGroupingName',
            data: {
              'workid': that.data.workid,
              'grouping_name': e.currentTarget.dataset.name
            },
            success: function (res) {
              if(res.data.code==0){
                that.getGroupingName();
              }
            }
          })
        }else if(res.cancel){

        }
      }
    })
  },
  //删除组内成员
  delgroupmembers:function(e){
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/delGrouping',
      data: {
        'workid':that.data.workid,
        'workerid':e.currentTarget.dataset.id
      },
      method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        if(res.data.code==0){
          that.getCurrentGroupmenbers();
        }
      },
    })
  },
  //获取该群聊的分组名
  getGroupingName:function(e){
    var that = this;
    wx.request({
      //获取该群聊的分组情况
      url: 'https://www.xiaoshetong.cn/api/getGroupingName',
      data: {
        'workid': that.data.workid
      },
      success: function (res) {
        if(res.data.code==0){
          that.setData({
            groupnamelist:res.data.result
          })
        }
      }
    });
  },
  //获取该群所有群成员
  getAllGroupmembers:function(e){
    var that = this;
    wx.request({
      url: 'https://www.xiaoshetong.cn/api/recruit/workDetails',
      data: {
        'workid':that.data.workid
      },
      method: 'GET', 
      success: function(res){
        if(res.data.code==0){
          that.setData({
            allgroupmembers:res.data.result[0].workers
          })
        }
      },
    })
  },
  //点击新增分组按钮事件
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
    var that = this;
    that.setData({
      workid:options.workid
    });
    that.getAllGroupmembers();
    that.getGroupingName();
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
    that.getAllGroupmembers();
    that.getGroupingName();
    that.getCurrentGroupmenbers();
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