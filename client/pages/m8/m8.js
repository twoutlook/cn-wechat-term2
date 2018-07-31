// pages/user/user.js

const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const _ = require('../../utils/util')
const app = getApp()

Page({
  onTapGotoM1(event) {

    // by Mark, 2018-07-30 20：09
    // 驗証：來回十次就不動了
    // wx.navigateTo({
    //   url: '/pages/m1/m1',
    // })
    wx.navigateBack({
      
    })

  },
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    commentMovieList:[],
    index:0,
    array: ['已收藏的', '已发布的'],
  
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    // 已收藏的
    if (e.detail.value==0){
      this.setCommentListByUserCollection(this.data.userInfo.openId)
    }
    
    // 已发布的
    if (e.detail.value == 1) {
      this.setCommentListByUser(this.data.userInfo.openId)
    }

    
    this.setData({
      index: e.detail.value
    })
  },
  // onTapAddress() {
  //   wx.showToast({
  //     icon: 'none',
  //     title: '此功能暂未开放'
  //   })
  // },

  // onTapKf() {
  //   wx.showToast({
  //     icon: 'none',
  //     title: '此功能暂未开放'
  //   })
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  onTapLogin: function () {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  setCommentListByUser(user) {
    qcloud.request({
      url: config.service.commentMovieListByUser+"?user="+user,
    
      success: result => {

        console.log("DEBUG 自己發佈的。。。")
        let data = result.data
        console.log(data)
        if (!data.code) {
          this.setData({
            commentMovieList: data.data.map(item => {
              let itemDate = new Date(item.create_time)
              item.createTime = _.formatTime(itemDate)
              // item.images = item.images ? item.images.split(';;') : []
              return item
            })
          })
        }
      },
      fail:res=>{
        console.log(res)

      }
    })
  },

  setCommentListByUserCollection(user) {
    qcloud.request({
      url: config.service.commentMovieListByUserCollection + "?user=" + user,

      success: result => {
        let data = result.data
        console.log("DEBUG 收藏。。。")
        console.log(data)
        if (!data.code) {
          this.setData({
            commentMovieList: data.data.map(item => {
              let itemDate = new Date(item.create_time)
              item.createTime = _.formatTime(itemDate)
              // item.images = item.images ? item.images.split(';;') : []
              return item
            })
          })
        }
      },
      fail: res => {
        console.log(res)

      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 同步授权状态
    this.setData({
      locationAuthType: app.data.locationAuthType
    })
    app.checkSession({
      success: ({ userInfo }) => {
   
        console.log("userInfo")
        console.log(userInfo.openId+" nickName"+userInfo.nickName)
        // this.setCommentListByUser(userInfo.openId) 

        // 已收藏的
        if (this.data.index == 0) {
          this.setCommentListByUserCollection(userInfo.openId)
        }

        // 已发布的
        if (this.data.index == 1) {
          this.setCommentListByUser(userInfo.openId)
        }


        this.setData({
          userInfo
        })
      }
    })
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