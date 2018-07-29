// pages/m6/m6.js

/*

M6 影评编辑页 

根据用户想要添加的影评类型展示相应的编辑界面。
  类型为文字影评时，用户只能编写文字影评；
  类型为语音影评时，用户只能录入语音影评。




*/
var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  movie:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log( options)
    this.setData({
      movie:options
    })
 


  },

/*
Tut 6-02
by Mark, 2018-07-29 10：24
驗証逐字觸發
*/
  onInput(event) {
    console.log( event.detail.value.trim())

    this.setData({
      commentValue: event.detail.value.trim()
    })
  },


  addComment(event) {
    let content = this.data.commentValue
    if (!content) return

    console.log("addComment ")
    console.log(event)

    //DOING...
    return;

    wx.showLoading({
      title: '正在发表评论'
    })

    this.uploadImage(images => {
      qcloud.request({
        url: config.service.addComment,
        login: true,
        method: 'PUT',
        data: {
          images,
          content,
          product_id: this.data.product.id
        },
        success: result => {
          wx.hideLoading()

          let data = result.data

          if (!data.code) {
            wx.showToast({
              title: '发表评论成功'
            })

            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          } else {
            wx.showToast({
              icon: 'none',
              title: '发表评论失败'
            })
          }
        },
        fail: () => {
          wx.hideLoading()

          wx.showToast({
            icon: 'none',
            title: '发表评论失败'
          })
        }
      })
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