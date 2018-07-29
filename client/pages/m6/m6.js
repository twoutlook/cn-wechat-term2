// pages/m6/m6.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
/*

M6 影评编辑页 

根据用户想要添加的影评类型展示相应的编辑界面。
  类型为文字影评时，用户只能编写文字影评；
  类型为语音影评时，用户只能录入语音影评。




*/
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // movie:null


    movie: {},
    commentType:0,
    commentValue: '',
    // commentImages: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    console.log("commenttype is " + options.commenttype)
    console.log("movie id is " + options.id)


    this.setData({
      movie: options,
      commentType:options.commenttype
    })



  },

  /*
  Tut 6-02
  by Mark, 2018-07-29 10：24
  驗証逐字觸發
  */
  onInput(event) {
    console.log(event.detail.value.trim())

    this.setData({
      commentValue: event.detail.value.trim()
    })
  },

  // not for this project 2, 
  // but structure is good for audio comment
  uploadImage(cb) {
    let commentImages = this.data.commentImages
    let images = []

    if (commentImages.length) {
      let length = commentImages.length
      for (let i = 0; i < length; i++) {
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: commentImages[i],
          name: 'file',
          success: res => {
            let data = JSON.parse(res.data)
            length--

            if (!data.code) {
              images.push(data.data.imgUrl)
            }

            if (length <= 0) {
              cb && cb(images)
            }
          },
          fail: () => {
            length--
          }
        })
      }
    } else {
      cb && cb(images)
    }
  },

  addComment(event) {
    let content = this.data.commentValue
    if (!content) return

    console.log("addComment ")
    console.log(event)

    //DOING...
    // return;

    wx.showLoading({
      title: '正在发表 movie 评论'
    })

    // this.uploadImage(images => {
    qcloud.request({
      url: config.service.addCommentMovie,
      login: true,
      method: 'PUT',
      data: {
        // images,
        content,
        movie_id: this.data.movie.id
      },
      success: result => {
        wx.hideLoading()

        let data = result.data

        if (!data.code) {
          wx.showToast({
            title: '发表 movie 评论成功'
          })

          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        } else {
          wx.showToast({
            icon: 'none',
            title: '发表 movie 评论失败'
          })
        }
      },
      fail: (event) => {
        console.log("DEBUG ...comment movie fail")
        console.log(event)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '发表 movie 评论失败'
        })
      }
    })
    // }) // uploadImage
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