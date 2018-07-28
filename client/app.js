//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

let userInfo

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

/* 

m1 首页：随机展示当前热门电影的某一条影评。
m2 电影列表页：展示当前最热门的若干部电影（至少5部）。
m3 电影详情页：展示电影详情信息。
m4 影评列表页：展示某电影的影评列表。
m5 影评详情页：展示某条具体的影评内容。
m6 影评编辑页：用户能在此页面编辑自己的影评内容。
m7 影评预览页：预览已编辑完成的影评。
m8 个人中心页：展示用户已收藏和已发布的影评列表。





M6 影评编辑页 
根据用户想要添加的影评类型展示相应的编辑界面。
类型为文字影评时，用户只能编写文字影评；类型为语音影评时，用户只能录入语音影评。
*/
const COMMENT_TEXT = 1
const COMMENT_AUDIO = 2

// function onTapGotoPage(x,str) {
//   console("handle all project wx navigate to here !!!")
//   wx.navigateTo({
//     url: `/pages/m` + x +`/m`+x+str
//   })

// }





App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },

  data: {
    locationAuthType: UNPROMPTED
  },

  login({ success, error }) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === false) {

          this.data.locationAuthType = UNAUTHORIZED
          // 已拒绝授权
          wx.showModal({
            title: '提示',
            content: '请授权我们获取您的用户信息',
            showCancel: false
          })
          error && error()
        } else {
          this.data.locationAuthType = AUTHORIZED
          this.doQcloudLogin({ success, error })
        }
      }
    })
  },

  doQcloudLogin({ success, error }) {
    // 调用 qcloud 登陆接口
    qcloud.login({
      success: result => {
        if (result) {
          let userInfo = result
          success && success({
            userInfo
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          this.getUserInfo({ success, error })
        }
      },
      fail: () => {
        error && error()
      }
    })
  },

  getUserInfo({ success, error }) {
    if (userInfo) return userInfo

    qcloud.request({
      url: config.service.user,
      login: true,
      success: result => {
        let data = result.data

        if (!data.code) {
          let userInfo = data.data

          success && success({
            userInfo
          })
        } else {
          error && error()
        }
      },
      fail: () => {
        error && error()
      }
    })
  },

  checkSession({ success, error }) {
    if (userInfo) {
      return success && success({
        userInfo
      })
    }

    wx.checkSession({
      success: () => {
        this.getUserInfo({
          success: res => {
            userInfo = res.userInfo

            success && success({
              userInfo
            })
          },
          fail: () => {
            error && error()
          }
        })
      },
      fail: () => {
        error && error()
      }
    })
  },
})