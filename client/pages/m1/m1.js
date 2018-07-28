/*


1 首页 , Nav => 2, 8
2 电影列表页, Nav =>3
3 电影详情页， Nav =>4, POPUP
4 影评列表页，
5 影评详情页，
6 影评编辑页，
7 影评预览页，
8 个人中心页。

m1 
首页 
随机展示当前热门电影的某一条影评。海报图需跳转至电影详情页；点击 "XX给你推荐了一部电影" 可跳转至该推荐人对此影片的影评详情页；首页还应包含两个按钮，分别跳转至电影列表页和个人中心页。

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
    console.log("... going to page User")
    wx.navigateTo({
      // url: `/pages/m8/m8`
      url: `/pages/user/user`
    })
    console.log("... why not working???")

  },


  /**
   * 页面的初始数据
   */
  data: {
    movie: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMovieDetail(1)
  },
  getMovieDetail(id) {
    console.log('...m1 doing  getMovieDetail(), id=' + id)
    // console.log(config.service.moviesDetail + id)
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