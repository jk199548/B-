// pages/gerentoudixiangqing/gerentoudixiangqing.js
const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
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
    yuyuelist:[
      {
        'time': '2019年6月28日16: 30',
        'position':'顺丰分拣员',
      },
    ],
    isyuyuesuccess:false,//是否预约成功
    mianshiaddress:'',//预约的面试地点
    mianshitime:'',//预约的面试时间
    yuyuemodal:false,
    time: '请选择时间',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [0, 0, 0, 0],
    choose_year: '',
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
  confirmbtn:function(e){
    var that = this;
    if(that.data.time=='请选择时间' || that.data.mianshiaddress==''){
      wx.showToast({
        title: '请选择时间',
      })
    }else{
      that.setData({
        yuyuemodal:false,
        isyuyuesuccess:true,
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
  onLoad: function () {
    //设置默认的年份
    this.setData({
      choose_year: this.data.multiArray[0][0]
    })
  },
  //获取时间日期
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
    this.setData({
      time: year + month + day + hour 
    })
    // console.log(this.data.time);
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
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
        console.log(year);
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
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
})