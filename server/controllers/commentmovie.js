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
     * 获取 all  评论列表
     */
  list: async ctx => {
    ctx.state.data = await DB.query('select * from commentmovie ')
    // let movieId = +ctx.request.query.movie_id

    // if (!isNaN(movieId)) {
    //   ctx.state.data = await DB.query('select * from commentmovie where commentmovie.movie_id = ?', [movieId])
    // } else {
    //   ctx.state.data = []
    // }
  },

  /**
   * 获取评论列表
   */
  movie: async ctx => {
    // let movie_id = +ctx.request.query.id
    let movie_id = +ctx.params.id

    let temp
    if (!isNaN(movie_id)) {
      temp = (await DB.query('select * from commentmovie where commentmovie.movie_id = ?', [movie_id]))[0]
    } else {
      temp  = [{'movie_id':movie_id}]
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