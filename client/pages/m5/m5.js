// pages/m5/m5.js

/*

m5
影评详情页

点击 "收藏" 按钮可收藏该条影评。除此之外还应有一个按钮，当用户没有评价过此影片时，点击此按钮弹出底部菜单，可让用户选择添加文字影评还是语音影评；当用户评价过此影片时，点击此按钮能够跳转到用户对此影片的影评详情页。

下左 btn 收藏影評
按需求規格沒有跳轉到指定位置
設計如果該影評已收藏，則 btn 呈灰色，該用戶知道不能作用。


*/

var app = getApp()
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const _ = require('../../utils/util')
Page({
  data: {
    userInfo: {},
    movie: {},
    commentMovieList: [],
    comment: {},
 canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onTapToCollect() {
    console.log("  check if in user's collection first, 自己的不收藏，已收藏的不重覆收藏")
    app.checkSession({
      success: ({ userInfo }) => {

        console.log("userInfo")
        console.log(userInfo.openId + " nickName" + userInfo.nickName)
        this.toAddCollection()
        this.setData({
          userInfo
        })
      }
    })
   

  },
  toAddCollection() {
    console.log("  ###toAddCollection " + config.service.userCollectionCommentid)

    qcloud.request({
      url: config.service.addUserCollection,
      login: true,
      method: 'PUT',

      data: {
        comment_id: this.data.comment.id
      },
      success: res => {

        console.log(res)
     
      },
      fail: res => {
        console.log("Fail to userCollectionListByUserComment!!! to DEBUG, as follows")
        console.log(res)

      }
    })
  },


  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    console.log("######## to have openid")

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })


    console.log("m5, onLoad")
    console.log(options)
    this.getMovieDetail(options.movie_id)
    this.getCommentDetail(options.comment_id)

    // this.getCommentListLastOne(1)
  },
  // getCommentListLastOne(id) {
  //   qcloud.request({
  //     url: config.service.commentMovieListLastOne,
  //     data: {
  //       movie_id: id
  //     },
  //     success: result => {
  //       let data = result.data

  //       console.log(data)
  //       if (!data.code) {
  //         this.setData({
  //           commentMovieList: data.data.map(item => {
  //             let itemDate = new Date(item.create_time)
  //             item.createTime = _.formatTime(itemDate)
  //             // item.images = item.images ? item.images.split(';;') : []
  //             return item
  //           })
  //         })
  //       }
  //     },
  //   })
  // },

  getCommentDetail(id) {
    qcloud.request({
      url: config.service.commentMovieDetail,
      data: {
        id: id
      },
      success: result => {
        let data = result.data
        console.log("m5,getCommentDetail, convert it to non-array")
        console.log(data)
        var oneComment=data.data[0]
        console.log("m5,getCommentDetail, oneComment as follows")
        console.log(oneComment)

        if (!data.code) {
          var comment = data.data[0]

          comment.createTime = _.formatTime(new Date(comment.create_time))
          this.setData({
            // commentMovieList: data.data.map(item => {
            //   let itemDate = new Date(item.create_time)
            //   item.createTime = _.formatTime(itemDate)
            //   return item
            // }),

            comment: comment

          })
        }
      },
      fail: res => {
        
        console.log("m5,fail, why?")
        console.log(res)
        
      },
    })
  },


  getMovieDetail(id) {
    console.log('...m1 doing  getMovieDetail(), id=' + id)
    console.log(config.service.moviesDetail + id)
    wx.showLoading({
      title: '数据加载中...',
    })
    qcloud.request({
      url: config.service.movieDetail + id,
      success: result => {
        wx.hideLoading()
        console.log('... doing  success')

        console.log(result)
        console.log(result.data.data)

        if (!result.data.code) {
          this.setData({
            movie: result.data.data
          })
        } else {
          wx.showToast({
            title: '数据加载失败!',
          })
        }
      },
      fail: result => {
        wx.hideLoading()
        wx.showToast({
          title: '数据加载失败!',
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})