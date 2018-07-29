// pages/m5/m5.js

/*

m5
影评详情页

点击 "收藏" 按钮可收藏该条影评。除此之外还应有一个按钮，当用户没有评价过此影片时，点击此按钮弹出底部菜单，可让用户选择添加文字影评还是语音影评；当用户评价过此影片时，点击此按钮能够跳转到用户对此影片的影评详情页。



*/

const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const _ = require('../../utils/util')
Page({
  data: {
    movie: {},
    commentMovieList: []
  },

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
  this.getMovieDetail(1)
  this.getCommentListLastOne(1)
},
getCommentListLastOne(id) {
  qcloud.request({
    url: config.service.commentMovieListLastOne,
    data: {
      movie_id: id
    },
    success: result => {
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
  })
},

getMovieDetail(id) {
  console.log('...m1 doing  getMovieDetail(), id=' + id)
  console.log(config.service.moviesDetail + id)
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