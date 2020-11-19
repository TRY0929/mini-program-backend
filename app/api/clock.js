const Router = require('koa-router')
const {PositiveValidator} = require('../validator/validator')
const {Clock} = require('../models/clock')
const { Auth } = require('../../middlewares/auth')

const router = new Router({
  prefix: '/clock'
})

router.get('/query',new Auth().m , async (ctx, next) => {
  // const v = await new PositiveValidator().validate(ctx, {id: 'uid'})
  const uid = ctx.auth.uid
  const res = await Clock.getUserClockData(uid)
  const ans = {}
  res.forEach(item => {
    const key = `${item.year}-${item.month}`
    if (!ans[key]) {
      ans[key] = []
    }
    ans[key].push(item)
  })
  ctx.body = ans
})

router.post('/',new Auth().m , async (ctx, next) => {
  // const v = await new PositiveValidator().validate(ctx, {id: 'uid'})
  const uid = ctx.auth.uid
  const year = ctx.request.body.year
  const month = ctx.request.body.month
  const date = ctx.request.body.date
  await Clock.setClock(uid, year, month, date)
  throw new global.errs.Success('您已成功签到')
})

module.exports = router