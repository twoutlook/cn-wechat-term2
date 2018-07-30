/**
 * 小程序配置文件
 */




// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://untbxjpi.qcloud.la';

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,

    // 获取产品列表
    productList: `${host}/weapp/product`,

    // by Mark, 2018-07-26 19:00
    // 获取 Movies 列表
    movieList: `${host}/weapp/movie`,


    // 获取产品详情
    productDetail: `${host}/weapp/product/`,

    // by Mark
    // 获取 Movies 详情
    movieDetail: `${host}/weapp/movie/`,


    // 拉取用户信息
    user: `${host}/weapp/user`,

    // 创建订单
    addOrder: `${host}/weapp/order`,

    // 获取已购买订单列表
    orderList: `${host}/weapp/order`,

    // 添加到购物车商品列表
    addTrolley: `${host}/weapp/trolley`,

    // 获取购物车商品列表
    trolleyList: `${host}/weapp/trolley`,

    // 更新购物车商品列表
    updateTrolley: `${host}/weapp/trolley`,

    // 添加评论
    addComment: `${host}/weapp/comment`,

    // 获取评论列表
    commentList: `${host}/weapp/comment`,

    // by Mark, 2018-07-29 10:54
    // 添加 movie 评论
    addCommentMovie: `${host}/weapp/commentmovie`,

    // 获取 movie 评论列表
    commentMovieList: `${host}/weapp/commentmovie`,



    commentMovieDetail: `${host}/weapp/commentmoviedetail`,

    // by Mark, 2018-07-29 19:25
    // 获取 movie 评论列表, for m1
    commentMovieListLastOne: `${host}/weapp/commentmovielastone`,

    // by Mark, 2018-07-29 20:36
    // 获取 movie 评论列表, for m1
    m001: `${host}/weapp/m001`,


    // by Mark, 2018-07-30 10:51
    // 添加 user collection
    addUserCollection: `${host}/weapp/usercollection`,

    // 获取 user collection 列表
    userCollectionList: `${host}/weapp/usercollection`,



  }
};

module.exports = config;