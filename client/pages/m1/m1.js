/*


1 首页 , Nav => 2, 8
2 电影列表页, Nav =>3
3 电影详情页， Nav =>4, POPUP
4 影评列表页，
5 影评详情页，
6 影评编辑页，
7 影评预览页，
8 个人中心页。



*/



const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

// pages/m1/m1.js
Page({
  onTapGotoM2() {

    wx.navigateTo({
      url: `/pages/m2/m2`
    })

  },
  onTapGotoM8() {

    wx.navigateTo({
      url: `/pages/m8/m8`
    })

  },


  /**
   * 页面的初始数据
   */
  data: {
  
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