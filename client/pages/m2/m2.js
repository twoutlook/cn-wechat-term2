/*

m2
电影列表页

点击每部电影能够跳转到对应的电影详情页。



*/


const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: [], // 商品列表
  },
  onTapGotoM3(event) {

    wx.navigateTo({
      url: '/pages/m3/m3?id=' + event.currentTarget.dataset.id,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieList()
  },

  getMovieList() {
    console.log('... doing  getMovieList()')
    wx.showLoading({
      title: '数据加载中...',
    })
    qcloud.request({
      url: config.service.movieList,
      success: result => {
        wx.hideLoading()
        console.log('... doing  success')
        console.log('... url is ' + config.service.movieList)

        console.log(result.data.data)

        if (!result.data.code) {
          this.setData({
            movieList: result.data.data
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