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
   * 获取评论列表
   */
  list: async ctx => {
    let movieId = +ctx.request.query.movie_id

    if (!isNaN(movieId)) {
      ctx.state.data = await DB.query('select * from commentmovie where commentmovie.movie_id = ?', [movieId])
    } else {
      ctx.state.data = []
    }
  },
}