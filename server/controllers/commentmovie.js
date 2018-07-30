const DB = require('../utils/db')

module.exports = {

  /**
   * 添加评论
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let movieId = +ctx.request.body.movie_id
    let content = ctx.request.body.content || null

    // let images = ctx.request.body.images || []
    // images = images.join(';;')

    if (!isNaN(movieId)) {
      await DB.query('INSERT INTO commentmovie(user, username, avatar, content,  movie_id) VALUES (?, ?, ?, ?, ?)', [user, username, avatar, content, movieId])
    }

    ctx.state.data = {}
  },


  /**
   * 获取 [user|movie] movie 评论列表
   *   // https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api
   * 
   * SELECT a.*,b.title,b.image
FROM `commentmovie`  a,movies b
where a.movie_id=b.id

and user = 'ot3ho5G2gWq2duJcGlNVRx_2NzG4'
   * 
   * 
   */
  listbyuser: async ctx => {
    // let user = ctx.state.$wxInfo.userinfo.openId

    // let movie_id = +ctx.request.query.movie
    let user = ctx.request.query.user
    let sql = ' SELECT a.*, b.title, b.image FROM commentmovie a, movies b     where a.movie_id=b.id' //     and user = ?'
    if (user!=null) {
      ctx.state.data = await DB.query(sql+ ' and user = ?', [user])

    } else {
      ctx.state.data = await DB.query(sql)
    }
  },


  /**
   * 获取 all  评论列表
   *   // https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api
   * 
   */
  list: async ctx => {
    let movie_id = +ctx.request.query.movie
    if (isNaN(movie_id)) {
      ctx.state.data = await DB.query('select * from commentmovie ')
    } else {
      ctx.state.data = await DB.query('select * from commentmovie where commentmovie.movie_id = ?', [movie_id])
    }
  },

  /**
   * 获取评论列表
   */
  bymovie: async ctx => {
    // let movie_id = +ctx.request.query.id
    let movie_id = +ctx.params.id

    let temp
    if (!isNaN(movie_id)) {
      temp = await DB.query('select * from commentmovie where commentmovie.movie_id = ?', [movie_id])
    } else {
      temp = [{
        'movie_id': movie_id
      }]
    }
    ctx.state.data = temp
  },

  // https://stackoverflow.com/questions/30967822/when-do-i-use-path-params-vs-query-params-in-a-restful-api
  bymovie: async ctx => {
    // let movie_id = +ctx.request.query.id
    let movie_id = +ctx.params.id

    let temp
    if (!isNaN(movie_id)) {
      temp = await DB.query('select * from commentmovie where commentmovie.movie_id = ?', [movie_id])
    } else {
      temp = [{
        'movie_id': movie_id
      }]
    }
    ctx.state.data = temp
  },

  byid: async ctx => {
    // let movie_id = +ctx.request.query.id
    let id = +ctx.params.id

    let temp
    if (!isNaN(id)) {
      temp = await DB.query('select * from commentmovie where commentmovie.id = ?', [id])
    } else {
      temp = [{
        'movie_id': movie_id
      }]
    }
    ctx.state.data = temp
  },

  /**
   * 获取 單個评论 
   */
  detail: async ctx => {
    let id = +ctx.request.query.id

    if (!isNaN(id)) {
      ctx.state.data = await DB.query('select * from commentmovie where commentmovie.id = ?', [id])
    } else {
      ctx.state.data = []
    }
  },


  /**
   * by Mark, 2018-07-29 19:28
   * 获取评论列表, only last one
   */
  listlastone: async ctx => {
    let movieId = +ctx.request.query.movie_id

    if (!isNaN(movieId)) {
      // select * from commentmovie where commentmovie.movie_id = 1 order by create_time desc LIMIT 0, 1
      ctx.state.data = await DB.query('select * from commentmovie where commentmovie.movie_id = ?  order by create_time desc LIMIT 0, 1', [movieId])
    } else {
      ctx.state.data = []
    }
  },

  /**
   * by Mark, 2018-07-29 20:38
   * 获取评论列表, only last one
   */
  m001: async ctx => {

    ctx.state.data = await DB.query('select * from commentmovie  order by create_time desc LIMIT 0, 12')

  },

}