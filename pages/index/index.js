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
    indexposition:[],
    newworkers:[],
    schoolarr:['请选择学历','初中','中专','高中','职高','大专','本科','研究生'],
    lookmearr:[],
    collectionworkerarr:[]
  },
  //招聘端获取收藏用户已发布的工作的员工
  getCollectionWorker:function(e){
    var that = this;
    api._get('/getCollectionWorker',{
      'id':wx.getStorageSync('id')
    }).then(res=>{
      if(res.code==0){
        that.setData({
          collectionworkerarr:res.result
        })
      }
    })
  },
  //查看新求职者
  looknewworkers:function(e){
    var that = this;
    wx.navigateTo({
      url: '../gerentoudixiangqing/gerentoudixiangqing?workerid='+e.currentTarget.dataset.id,
    })
  },
  //获取c端看过我职位的用户
  getViewWork:function(e){
    var that = this;
    api._get('/getViewWork',{
      'id':wx.getStorageSync('id')
    }).then(res=>{
      if(res.code==0){
        that.setData({
          lookmearr:res.result
        })
      }
    })
  },
  //获取首页人才市场的新求职者
  getNewWorkers:function(e){
    var that = this;
    api._get('/getNewWorkers',{
      'id':wx.getStorageSync('id'),
      'token':wx.getStorageSync('token')
    }).then(res=>{
      if(res.code==0){
        that.setData({
          newworkers:res.result
        })
      }
    })
  },
  //招聘页跳转到在职列表页
  towaitpositionlist:function(e){
    var that = this;
    wx.navigateTo({
      url: '../waitpositionlist/waitpositionlist?workid='+e.currentTarget.dataset.id+'&title='+e.currentTarget.dataset.title,
    })
  },
  //获取用户在招职位
  getRecruitWork:function(e){
    var that= this;
    if(wx.getStorageSync('id')){
      api._get('/getRecruitWork', {
        'id': wx.getStorageSync('id')
      }).then(res => {
        console.log(res)
        if (res.code == 0) {
          if (res.result.length == 0) {
            wx.stopPullDownRefresh();
            that.setData({
              zhaopinnodata: true,
            });
            wx.showToast({
              title: '刷新成功',
            })
          } else {
            wx.stopPullDownRefresh();
            var newmyposition = res.result;
            for (let i = 0; i < newmyposition.length; i++) {
              if (newmyposition[i].welfare != null) {
                var newwelfare = newmyposition[i].welfare.split("，");
                newmyposition[i].welfare = newwelfare;
              }
            }
            that.setData({
              zhaopinnodata: false,
              indexposition: newmyposition
            });
            wx.hideLoading();
            wx.showToast({
              title: '加载成功',
              icon: 'none'
            })
          }
        } else {
          wx.stopPullDownRefresh();
          wx.hideLoading();
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          })
        }
      })
    }else{
      that.setData({
        zhaopinnodata:true
      })
    }
  },
  //获取用户已经发布的职位
  getMyWork:function(e){
    var that = this;
    api._get('/getMyWork',{
      'token':wx.getStorageSync('token'),
      'id':wx.getStorageSync('id')
    }).then(res=>{
      if(res.code==0){
        wx.stopPullDownRefresh();
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
        });
        
        wx.hideLoading();
        wx.showToast({
          title: '加载成功',
          icon:'none'
        });
        
      } else {
        wx.stopPullDownRefresh();
        wx.hideLoading();
      }
    })
  },
  //获取到我的动态数据
  getDynamic:function(e){
    var that = this;
    if(wx.getStorageSync('id')){
      api._get('/getDynamic', {
        'recruiter_id': wx.getStorageSync('id')
      }).then(res => {
        if (res.code == 0) {
          if (res.result.length == 0) {
            that.setData({
              mydongtainodata: true,

            })
            wx.hideLoading();
            wx.showToast({
              title: '加载成功',
              icon: 'none'
            })
          } else {
            for (var i = 0; i < res.result.length; i++) {
              res.result[i].created_at = util.js_date_time(res.result[i].created_at);
            }
            that.setData({
              dynamiclist: res.result,
              mydongtainodata: false
            });
            wx.hideLoading();
            wx.showToast({
              title: '加载成功',
              icon: 'none'
            });
            wx.stopPullDownRefresh();
          }
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '加载失败',
          });
          wx.stopPullDownRefresh();
        }
      })
    }else{
      
    }
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
      selectedid: e.currentTarget.dataset.id
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
    that.getRecruitWork();
    that.getNewWorkers();
    that.getViewWork();
    that.getCollectionWorker();
  },
  onShow:function(){
    var that = this;
    that.getDynamic();
    that.getMyWork();
    that.getCollectionWorker();
    that.getViewWork();
    that.getRecruitWork();
    that.getNewWorkers();
  },
  onPullDownRefresh:function(e){
    var that = this;
    wx.showLoading({
      title: '正在刷新...',
    })
    if(that.data.selectedid==0){
      that.getRecruitWork();
    }else if(that.data.selectedid==1){

    } else if (that.data.selectedid == 2) {
      that.getMyWork();
    } else if (that.data.selectedid == 3) {
      that.getDynamic();
    }
  }
})
