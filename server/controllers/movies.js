const DB = require('../utils/db.js')

module.exports = {
  /**
   * 拉取商品列表
   * 
   */

  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM movies;")
  },

  detail: async ctx => {
    let id = + ctx.params.id
    let product

    if (!isNaN(id)) {
      product = (await DB.query('select * from movies where id = ?', [id]))[0]
    } else {
      product = {}
    }

    // product.commentCount = (await DB.query('SELECT COUNT(id) AS comment_count FROM comment WHERE comment.product_id = ?', [productId]))[0].comment_count || 0
    // product.firstComment = (await DB.query('SELECT * FROM comment WHERE comment.product_id = ? LIMIT 1 OFFSET 0', [productId]))[0] || null

    ctx.state.data = product
  }
}