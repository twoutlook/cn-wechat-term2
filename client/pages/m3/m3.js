// pages/m3/m3.js
// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.getMoviesDetail(options.id)

  },
  getMoviesDetail(id) {
    console.log('... doing  getMoviesDetail()')
    console.log(config.service.moviesDetail + id)
    wx.showLoading({
      title: '数据加载中...',
    })
    qcloud.request({
      url: config.service.moviesDetail + id,
      success: result => {
        wx.hideLoading()
        console.log('... doing  success')
        console.log('... url is ' + config.service.moviesList)

        console.log(result.data.data)

        if (!result.data.code) {
          this.setData({
            moviesList: result.data.data
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