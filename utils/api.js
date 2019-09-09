const baseUrl = 'https://www.xiaoshetong.cn/api/recruit';
const http = ({ url = '', param = {}, ...other } = {}) => {
  var that = this;
  wx.onNetworkStatusChange(function (res) {
    console.log(res)
  })
  wx.showLoading({
    title: '请求中，请耐心等待..'
  });
  let timeStart = Date.now();
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      data: param,
      header: {
        'content-type': 'application/json' // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
      },
      ...other,
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode == 200) {
          return resolve(res.data)
        } else {
          wx.showModal({
            title: '提示',
            content: '网络出现错误是否需要重新加载？',
            success: function (res) {
              if (res.confirm) {
                return http({
                  url,
                  param
                })
              } else {

              }
            }
          })
        }
      },
      fail: function (res) {
        setTimeout(function () {
          wx.hideLoading();
        }, 100);
        wx.showToast({
          title: '服务器暂时无法连接',
          icon: 'loading',
          duration: 2000
        })
        reject(res);
      }
    })
  })
}

const getUrl = (url) => {
  if (url.indexOf('://') == -1) {
    url = baseUrl + url;
  }
  return url
}

// get方法
const _get = (url, param = {}) => {
  return http({
    url,
    param
  })
}

const _post = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'post'
  })
}

const _put = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'put'
  })
}

const _delete = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'delete'
  })
}
module.exports = {
  baseUrl,
  _get,
  _post,
  _put,
  _delete,
}