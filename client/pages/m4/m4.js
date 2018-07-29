/*

Requirement：
M4 影评列表页 

根据影评类型展示不同UI，
  当类型为文字时，截取影评部分文字信息做展示；
  当类型为语音时，展示语音图标以示区分。
点击每条影评能够跳转到对应的影评详情页。






*/

const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const _ = require('../../utils/util')
// pages/m4/m4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    commentMovieList: []
  },

  getCommentList(id) {
    qcloud.request({
      url: config.service.commentMovieList,
      data: {
        movie_id: id
      },
      success: result => {
        let data = result.data
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
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("m4...onLoad")
    console.log(options)
    this.setData({
      movie: options
    })
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