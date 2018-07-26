const qcloud = require('../../vendor/wafer2-client-sdk/index.js')

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[]
    // productList: [{
    //   id: 1,
    //   image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
    //   name: '商品1',
    //   price: 100,
    //   source: '国内·广东',
    // }, {
    //   id: 2,
    //   image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
    //   name: '商品2',
    //   price: 200,
    //   source: '国内·广东',
    // }, {
    //   id: 3,
    //   image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product3.jpg',
    //   name: '商品3',
    //   price: 300,
    //   source: '国内·广东',
    // }, {
    //   id: 4,
    //   image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product4.jpg',
    //   name: '商品4',
    //   price: 400,
    //   source: '国内·广东',
    // }, {
    //   id: 5,
    //   image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product5.jpg',
    //   name: '商品5',
    //   price: 500,
    //   source: '国内·广东',
    // }], // 商品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("...home.js -> onLoad ")
    console.log("    before      this.getProductList()  ")
    console.log(this.data)


    this.getProductList()   
    console.log("    after      this.getProductList()  ")
    console.log(this.data)

  },

// Tutorial 2-09

  getProductList(){
    wx.showLoading({
      title: '商品數據加載中...',
    })
    qcloud.request({
      url: 'https://untbxjpi.qcloud.la/weapp/product',
      // url: 'https://untbxjpi.qcloud.la/weappxxx/product',
      // url: 'https://untbxjpi.qcloud.la/weapp/productxxx',

      // url: 'https://xxxuntbxjpi.qcloud.la/weapp/product', //DEBUG, to test fail on purpose
      success: res => {
        // console.log("...success 07/26 10:36")
        // console.log(res.data)
        wx.hideLoading()
        if (res.data.code==0){
          console.log(res.data.code)
          this.setData({
            productList: res.data.data
          })
        }else{
          // console.log("XXX")
          wx.showLoading({
            title: '商品數據加載失敗！',
          })
        }
       
      },
      fail: res => {
        console.log("... fail 07/26 10:36")
        wx.hideLoading()
        wx.showLoading({
          title: '商品數據加載失敗！',
        })

      },
      complete: ()=>{
        wx.hideLoading()

      }

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