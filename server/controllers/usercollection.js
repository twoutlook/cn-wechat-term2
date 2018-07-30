/**
 * by Mark, 2018-07-30 10:42
 * 
 */


const DB = require('../utils/db')

module.exports = {

  /**
   * 添加 user collection
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let comment_id = +ctx.request.body.comment_id


    if (!isNaN(user) && !isNaN(comment_id)) {
      await DB.query('INSERT INTO usercollection(user, comment_id) VALUES (?, ?)', [user, comment_id])
    }

    ctx.state.data = {}
  },

  /**
   * 获取 user collection 列表, user
   */
  list: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId

    if (!isNaN(user)) {
      ctx.state.data = await DB.query('select * from usercollection where user = ?', [user])
    } else {
      ctx.state.data = []
    }
  },

  /**
   * 获取 user collection 列表, user
   */
  commentid: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let comment_id = +ctx.request.body.comment_id

  //TODO 
  // not consider user right now
    if (!isNaN(user)) {
      ctx.state.data = await DB.query('select * from usercollection where comment_id = ?', [comment_id])
    } else {
      ctx.state.data = []
    }
  },

  /**
   * 获取 user collection 列表, user and comment_id
   */
  listbyusercomment: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let comment_id = +ctx.request.body.comment_id

    if (!isNaN(user) && !isNaN(comment_id)) {
      ctx.state.data = await DB.query('select * from usercollection where user = ? and comment_id = ?', [user,comment_id])
    } else {
      ctx.state.data = []
    }
  },

}