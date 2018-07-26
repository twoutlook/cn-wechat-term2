const DB = require('../utils/db.js')
module.exports = {
  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM product;")
    // ctx.state.data = await DB.query("xxx SELECT * FROM product;")
  },

  // Tut 2-12
  detail:async ctx => {
    productId =+ ctx.params.id // enforce to be integer
    console.log (productId)
    if (isNaN(productId)) {// exception
      ctx.state.data ={}
    } else{
      ctx.state.data = (await DB.query("SELECT * FROM product where product.id =?", [productId]))[0]
    }       
    
  }
}