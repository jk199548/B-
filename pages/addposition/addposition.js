var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showwelfaremodal:false,
    salar:'',
    salaryday:'天',
    salaryselectedid:0,
    salarymodallist:['日结','小时','月结'],
    showmodal:false,
    imagecount:6,
    uploadconpanyimage: '../../images/shiming/conpany.png',
    conpanyimage: [],
    logourl:'../../images/index/uploadlogo.png',//公司logo
    cate:'',
    describe:'',//工作描述
    cycle:1,
    number:'',//职位需要的招聘人数
    title:'',//职位的名称
    longitude:'',
    latitude:'',
    province:'',//省
    city:'',//市
    district:'',//区
    location:'',//详细位置
    street:'',//街道
    experience:'',//工作经验要求
    age:'',//年龄
    education:'',//学历
    sex:'',//性别要求
    welfarearr:[],
    welfare:'',//工作福利
    validity_time:'请选择招聘有效期',//招聘有效期
  },
  //富文本编辑器
  onEditorReady() {
    // 输入~编辑框
    var that = this;
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      console.log("初始化成功：" + wx.getStorageSync("content"))
      that.editorCtx.setContents({ html:that.data.content}) // 注意：插入的是对象
    }).exec()

  },
  // 获取内容
  onContentChange(e) {
    var that = this;
    console.log(e.detail)
    that.setData({
      describe:e.detail.html
    })
  },
  //完成按钮事件
  submitBtn:function(e){
    var that = this;
    if(that.data.logourl=='../../images/index/uploadlogo.png'){
      wx.showToast({
        title:'请上传公司logo',
        icon:'none'
      })
    }else if(that.data.cate==''){
      wx.showToast({
        title:'请先选择工作类型',
        icon:'none'
      })
    }else if(that.data.title==''){
      wx.showToast({
        title:'请填写职位名称',
        icon:'none'
      })
    }else if(that.data.latitude==''){
      wx.showToast({
        title:'请填写工作地点',
        icon:'none'
      })
    }else if(that.data.age==''){
      wx.showToast({
        title:'请选择职位要求',
        icon:'none'
      })
    }else if(that.data.describe==''){
      wx.showToast({
        tile:'请输入工作描述',
        icon:'none'
      })
    }else if(that.data.salary==''){
      wx.showToast({
        title:'请输入职位薪资',
        icon:'none'
      })
    }else if(that.data.numer==''){
      wx.showToast({
        title:'请输入需要招聘的人数',
        icon:'none'
      })
    }else if(that.data.welfarearr.length==0){
      wx.showToast({
        title:'请填写工作福利',
        icon:'none'
      })
    }else if(that.data.validity_time=='请选择招聘有效期'){
      wx.showToast({
        title:'请选择招聘有效期',
        icon:'none'
      })
    }else if(that.data.conpanyimage.length==0){
      wx.showToast({
        title:'请选择公司环境图片',
        icon:'none'
      })
    }else{
      api._post('/addJob',{
        'id':wx.getStorageSync('id'),
        'cate':that.data.cate,
        'title':that.data.title,
        'cycle':that.data.cycle,
        'wages':that.data.salary,
        'token':wx.getStorageSync('token'),
        'validity_time':that.data.validity_time,
        'experience':that.data.experience,
        'age':that.data.age,
        'education':that.data.education,
        'welfare':that.data.welfare,
        'longitude':that.data.longitude,
        'latitude':that.data.latitude,
        'cate':that.data.cate,
        'sex':that.data.sex,
        'province':that.data.province,
        'header':that.data.logourl,
        'city':that.data.city,
        'district':that.data.district,
        'location':that.data.location,
        'street':that.data.street,
        'number':that.data.number,
        'describe':that.data.describe
      }).then(res=>{
        console.log(res);
        if(res.code==0){
          api._post('/addWorkImage',{
            'workid':res.result,
            'src': that.data.conpanyimage
          }).then(res=>{
            if(res.code==0){
              wx.navigateBack({
                delta:1,
                success:function(e){
                  wx.showToast({
                    title: '发布成功',
                  });
                }
              })
            }
          })
        }
      })
    }
  },
  //用户输入的招聘人数
  inputnumber:function(e){
    var that = this;
    that.setData({
      number:e.detail.value
    })
  },
  //用户选择招聘有效期
  bindTimeChange:function(e){
    var that = this;
    that.setData({
      validity_time:e.detail.value
    })
  },
  //用户输入的职位名称
  inputpositionname:function(e){
    var that = this;
    that.setData({
      title:e.detail.value
    })
  },
  //用户输入工作描述事件
  inputdescribe:function(e){
    var that = this;
    that.setData({
      describe:e.detail.value
    })
  },
  //用户输入的工作地点
  inputworkplace:function(e){
    var that = this;
    console.log(e.detail.value);
    var qqmapsdk = new QQMapWX({
      key: 'DEQBZ-SZEWJ-3R4FM-FPGJ2-CSRE2-3PFZU'
    });
    qqmapsdk.geocoder({
      address: e.detail.value,
      success: function(res){
        console.log(res)
        that.setData({
          longitude:res.result.location.lng,
          latitude:res.result.location.lat,
        });
        qqmapsdk.reverseGeocoder({
          location:{
            longitude: res.result.location.lng,
            latitude: res.result.location.lat,
          },
          success:function(res){
            that.setData({
              province:res.result.address_component.province,
              city:res.result.address_component.city,
              district:res.result.address_component.district,
              street:res.result.address_component.street,
              location:e.detail.value
            })
          }
        })
      },
    });
  },
  //招聘职位类型的选择
  radioChange:function(e){
    var that = this;
    console.log(e);
    that.setData({
      cate:e.detail.value
    })
    console.log(that.data.cate)
  },
  //工作福利模态框
  showwelfaremodal:function(e){
    var that = this;
    that.setData({
      showwelfaremodal:true
    })
  },
  //工作福利模态框input输入事件
  welfareinput:function(e){
    var that = this;
    if(e.detail.value==''){
      that.setData({
        welfarearr:[],
      })
    }else{
      var newwelfare = e.detail.value.split("，");
      that.setData({
        welfarearr:newwelfare,
        welfare:e.detail.value
      })
    }
    console.log(that.data.welfarearr)
  },
  //关闭工作福利模态框
  closewelfaremodal:function(e){
    var that = this;
    that.setData({
      showwelfaremodal:false,
    })
  },
  //工作福利模态框确定按钮
  welfaremodalbtn:function(e){
    var that = this;
    console.log(e)
    if(that.data.welfarearr.length==0){
      that.setData({
        welfarearr:[],
        showwelfaremodal:false,
      })
    }else{
      that.setData({
        showwelfaremodal:false,
      })
    }
  },
  //薪资模态框输入框输入事件
  salaryinput:function(e){
    var that = this;
    that.setData({
      salary:e.detail.value
    })
  },
  //点击薪资模态框完成按钮事件
  salarymodalbtn:function(e){
    var that = this;
    //var reg = /^[1-9]\d{1,5}$/;
      that.setData({
        showmodal:false,
        salary:that.data.salary,
      })
  },
  //显示薪资模态框
  showsalarymodal:function(e){
    var that = this;
    that.setData({
      showmodal:true,
    })
  },
  //关闭掉薪资待遇模态框
  closesalarymodal:function(e){
    var that = this;
    that.setData({
      showmodal:false,
      showwelfaremodal:false,
    })
  },
  //薪资待遇模态框薪资结算方法的点击
  choosesalaryway:function(e){
    var that = this;
    if(e.currentTarget.dataset.id==0){
      that.setData({
        salaryselectedid: e.currentTarget.dataset.id,
        salaryday: '日结',
        salary:'',
        cycle:1
      })
    }else if(e.currentTarget.dataset.id==1){
      that.setData({
        salaryselectedid: e.currentTarget.dataset.id,
        salaryday: '时薪',
        salary:'',
        cycle:0
      })
    } else if (e.currentTarget.dataset.id == 2){
      that.setData({
        salaryselectedid: e.currentTarget.dataset.id,
        salaryday: '月结',
        salary:'',
        cycle:2
      })
    }
   
  },
  //跳转到职位要求页面
  topositionrequire:function(e){
    wx.navigateTo({
      url: '../positionrequire/positionrequire',
    })
  },
  //上传公司环境图片
  uploadconpanyimage:function(e){
    var that = this;
    if (that.data.conpanyimage.length >= 6) {
      wx.showToast({
        title: '最多上传6张',
        icon: 'none'
      })
    }else{
      console.log(that.data.conpanyimage.length);
      wx.chooseImage({
        count: that.data.imagecount,
        success: function (res) {
          for(var item in res.tempFilePaths){
            wx.uploadFile({
              url: 'https://www.xiaoshetong.cn/api/recruit/uploadLogo',
              filePath:res.tempFilePaths[item],
              name:'logo',
              success: function(res){
                if(JSON.parse(res.data).code==0){
                  that.setData({
                    conpanyimage: that.data.conpanyimage.concat(JSON.parse(res.data).result),
                    imagecount: 6 - that.data.conpanyimage.length - 1
                  })
                }else{
                  wx.showToast({
                    title:'上传失败',
                    icon:'none'
                  })
                }
              },
              fail:function(res){
                console.log(res)
              }
            })
          }
          
        },
      })
    }
  },
  //选择公司logo
  chooseconpanylogo:function(e){
    var that = this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        wx.uploadFile({
          url: 'https://www.xiaoshetong.cn/api/recruit/uploadLogo',
          filePath:res.tempFilePaths[0],
          name:'logo',
          // header: {}, // 设置请求的 header
          // formData: {}, // HTTP 请求中其他额外的 form data
          success: function(res){
            console.log(res)
            if(JSON.parse(res.data).code==0){
              that.setData({
                logourl:JSON.parse(res.data).result
              })
            }else{
              wx.showToast({
                title:'上传失败',
                icon:'none'
              })
            }
          },
          fail:function(res){
            console.log(res)
          }
        })
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