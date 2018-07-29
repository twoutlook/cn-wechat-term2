// pages/m3/m3.js
// pages/home/home.js

/*
Requirement:
电影详情页 包含两个按钮，
一个点击后跳转至该电影的影评列表页，
另一个点击后弹出底部菜单，可让用户选择添加文字影评还是语音影评。

http://www.wxapp-union.com/article-2045-1.html








*/


var app = getApp()

const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
Page({
  onTapGotoM4() {
    var url =`/pages/m4/m4?` + this.getMovieUrlParam()
    console.log("url is "+url)
    wx.navigateTo({
      url: url
    })

  },

  getMovieUrlParam() {
    let str = "id=" + this.data.movie.id + "&title=" + this.data.movie.title + "&image=" + this.data.movie.image
    console.log(str)
    return str

  },

  onTapGotoM6(textOrAudio) {

    wx.navigateTo({
      // url: `/pages/m6/m6?type=` + textOrAudio + "&id=" + this.data.movie.id + "&title=" + this.data.movie.title + "&image=" + this.data.movie.image
      url: `/pages/m6/m6?` + `commenttype=` + textOrAudio + "&" + this.getMovieUrlParam()
    })

  },
  /**
   * 页面的初始数据
   */
  data: {
    movie: null,

    // text:"这是一个页面"
    actionSheetHidden: true,
    actionSheetItems: [{
        bindtap: 'Menu1',
        // bindtap: app.commentType.text,

        txt: '文字'
      },
      {
        bindtap: 'Menu2',
        // bindtap: app.commentType.audio,
        txt: '音頻'
      },

    ],
    menu: ''

  },


  actionSheetTap: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetbindchange: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },



  bindMenu1: function(event) {
    console.log("can we have para?")
    console.log(event.target)
    // this.setData({
    //   menu: 1,
    //   // actionSheetHidden: !this.data.actionSheetHidden
    // })
    this.onTapGotoM6(app.commentType.text)
  },
  bindMenu2: function() {
    // this.setData({
    //   menu: 2,
    //   // actionSheetHidden: !this.data.actionSheetHidden
    // })
    this.onTapGotoM6(app.commentType.audio)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    this.getMovieDetail(options.id)

  },
  getMovieDetail(id) {
    console.log('... doing  getMovieDetail()')
    console.log(config.service.movieDetail + id)
    wx.showLoading({
      title: '数据加载中...',
    })
    qcloud.request({
      url: config.service.movieDetail + id,
      success: result => {
        wx.hideLoading()
        console.log('... doing  success')

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