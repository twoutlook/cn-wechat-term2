/*


1 首页 , Nav => 2, 8
2 电影列表页, Nav =>3
3 电影详情页， Nav =>4, POPUP
4 影评列表页，
5 影评详情页，
6 影评编辑页，
7 影评预览页，
8 个人中心页。

=== Requirement ===
m1 
首页 
随机展示当前热门电影的某一条影评。海报图需跳转至电影详情页；点击 "XX给你推荐了一部电影" 可跳转至该推荐人对此影片的影评详情页；首页还应包含两个按钮，分别跳转至电影列表页和个人中心页。

=== Deployment ===
1. Get id list of comment, latest 100 only
2. To get random id
3. Show movie of comment's id and comment as well
*/



const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const _ = require('../../utils/util')

// pages/m1/m1.js
Page({
  onTapGotoM5() {

    wx.navigateTo({
      url: `/pages/m5/m5?movie_id=`+this.data.movie_id+"&comment_id="+this.data.comment_id
    })

  },
  onTapGotoM2() {

    wx.navigateTo({
      url: `/pages/m2/m2`
    })

  },
  onTapGotoM8() {
    console.log("... going to page User")
    wx.navigateTo({
      url: `/pages/m8/m8`
    })
  },


  /**
   * 页面的初始数据
   */
  data: {
    movie_id:0,
    comment_id:0,
    movie: {},
    // commentMovieList: []
    item:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */

  getRandomCommentId() {
    qcloud.request({
      url: config.service.m001,
  
      success: result => {
      
        let arr = result.data.data
        console.log (arr)
        // to verify random
        // for(var i=0;i<100;i++){
        //  console.log (Math.floor(Math.random() * arr.length))  
        // }
        var rnd = Math.floor(Math.random() * arr.length)
        console.log("rnd is "+rnd)
        console.log("comment id , this time is "+arr[rnd].id)
        console.log( arr[rnd])
        this.setData({
          item: arr[rnd]

        })
        // var commentId = arr[rnd].id
        this.setData({
          comment_id: arr[rnd].id,
            movie_id: arr[rnd].movie_id
        })
        this.getMovieDetail(arr[rnd].movie_id)
      },
      fail: result=>{
        console.log("Fail to get a random movie comment id!!!")

      }
    })
  },
  onLoad: function (options) {
    // let commentId = this.getRandomCommentId()
    this.getRandomCommentId()
    // console.log("random comment id is " + commentId)
    this.getMovieDetail(1)
    // this.getCommentListLastOne(1)

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
        console.log('... M1,getMovieDetail,doing  success')

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