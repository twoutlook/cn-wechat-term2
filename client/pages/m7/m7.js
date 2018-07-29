/*

m7
影评预览页

展示用户即将发布的影评内容。包含两个按钮，一个按钮可返回编辑页重新编辑；一个按钮可发布该条影评并跳转至该电影的影评列表。



*/


// pages/m7/m7.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  movie:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("m7 onLoad")
    console.log(options)
    this.setData({
      movie:options,
      // comment:comment
    })
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