// pages/gerentoudixiangqing/gerentoudixiangqing.js
const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
const api = require('../../utils/api.js');
//获取年
for (let i = 2019; i <= date.getFullYear() ; i++) {
  years.push("" + i + "年");
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i + "月");
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i + "日");
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i + "点");
}
//获取分钟
// for (let i = 0; i < 60; i++) {
//   if (i < 10) {
//     i = "0" + i;
//   }
//   minutes.push("" + i + "分");
// }
Page({
  data: {
    yuyuelist:[],
    isyuyuesuccess:false,//是否预约成功
    mianshiaddress:'',//预约的面试地点
    mianshitime:'',//预约的面试时间
    yuyuemodal:false,
    time: '请选择时间',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [0, 0, 0, 0],
    choose_year: '',
    workerid:'',
    workid:'',
    infolist:[],
    schoolarr: ['请选择学历', '初中', '中专', '高中', '职高', '大专', '本科', '研究生'],
  },
  //面试不通过
  interviewrefuse:function(e){
    var that = this;
    api._post('/refuse',{
      'workid':that.data.workid,
      'workerid':that.data.workerid
    }).then(res=>{
      if(res.code==0){
        wx.navigateBack({
          delta:1
        })
      }
    })
  },
  //面试通过按钮
  interviewpass:function(e){
    var that = this;
    api._put('/removeWorker',{
      'workid':that.data.workid,
      'workerid':that.data.workerid
    }).then(res=>{
      console.log(res);
      if(res.code==0){
        wx.navigateBack({
          delta:1
        });
      }
    })
  },
  //获取该求职者对于此份工作是否已经预约面试
  getworkerInterviewAddress:function(e){
    var that = this;
    api._get('/getInterviewDetail',{
      'workid':that.data.workid,
      'workerid':that.data.workerid
    }).then(res=>{
      if(res.code==0){
        that.setData({
          isyuyuesuccess:true,
          yuyuelist: that.data.yuyuelist.concat([{
            'time': res.result.time,
            'position': res.result.address,
            'location': res.result.address
          }])
        })
      }
    })
  },
  //获取员工的基本信息
  getWorkerDetails:function(e){
    var that = this;
    api._get('/workerDetails',{
      'workerid':that.data.workerid
    }).then(res=>{
      if(res.code==0){
        that.setData({
          infolist:res.result
        })
      }
    })
  },
  //点击不同意按钮
  disagree:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定此人不合格',
      confirmText:'是的确定',
      confirmColor:'#fc7001',
      cancelText:'再想想',
      success:function(res){
        if(res.confirm){
          //点击了确定按钮
        }else if(res.cancel){
          //点击了取消按钮
        }
      }
    })
  },
  //预约模态框的点击完成按钮事件
  formSubmit:function(e){
    var that = this;
    if(that.data.time=='请选择时间'){
      wx.showToast({
        title: '请选择面试时间',
      })
    }else if(that.data.mianshiaddress==''){
      wx.showToast({
        title: '请选择面试地点',
      })
    }else{
      api._post('/notifyInterview',{
        'workerid':that.data.workerid,
        'workid':that.data.workid,
        'time':that.data.time,
        'address':that.data.mianshiaddress
      }).then(res=>{
        if(res.code==0){
          wx.showToast({
            title: '预约面试成功',
          })
        }
      });
      api._get('/setFormID',{
        'is_rec':1,
        'id':wx.getStorageSync('id'),
        'formId': e.detail.formId
      }).then(res=>{
      })
      that.setData({
        yuyuemodal: false,
        isyuyuesuccess: true,
        yuyuelist: that.data.yuyuelist.concat([
          {
            'time': that.data.time,
            'location': that.data.mianshiaddress
          }
        ])
      })
    }
  },
  //预约模态框里的地址输入事件
  inputaddress:function(e){
    var that = this;
    that.setData({
      mianshiaddress:e.detail.value
    })
  },
  //关掉遮罩层
  closemodal:function(e){
    var that = this;
    that.setData({
      yuyuemodal:false,
    })
  },
  //点击同意按钮
  agree:function(e){
    var that = this;
    that.setData({
      yuyuemodal:true
    })
  },
  //关掉预约modal
  closeyuyuemodal:function(e){
    var that = this;
    that.setData({
      yuyuemodal:false,
    })
  },
  onLoad: function (options) {
    var that = this;
    //设置默认的年份
    
    this.setData({
      choose_year: this.data.multiArray[0][0],
      workerid:options.workerid,
      workid:options.workid,
      yuyuelist: [
        {
          'time': options.created_at,
          'position': options.title,
        }
      ],
    });
    that.getWorkerDetails();
    that.getworkerInterviewAddress();
    console.log(that.data.yuyuelist)
  },
  //获取时间日期
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    this.setData({
      time: year + month + day + hour 
    })
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      this.setData({
        choose_year
      })
    }
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i + "日");
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i + "日");
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i + "日");
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i + "日");
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
})