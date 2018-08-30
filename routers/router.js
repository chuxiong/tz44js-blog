const Router = require('koa-router')
const router = new Router

// 设计主页  
router.get("/", async (ctx) => {
  // 需要 title 
  await ctx.render("index", {
    title: "假装这是一个正经的 title"
  })
})
// 主要用来处理  用户登录 用户注册
router.get(/^\/user\/(?=reg|login)/, async (ctx) => {
  // show 为 true 则显示注册   false 显示登录
  const show = /reg$/.test(ctx.path)

  await ctx.render("register", {show})
})




module.exports = router