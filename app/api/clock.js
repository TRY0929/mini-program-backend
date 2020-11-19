const Router = require('koa-router')
const {PositiveValidator} = require('../validator/validator')
const {Clock} = require('../models/clock')

const router = new Router({
  prefix: '/clock'
})

router.get('/query', async (ctx, next) => {
  const v = await new PositiveValidator().validate(ctx, {id: 'uid'})
  const res = await Clock.getUserClockData(v.get('query.uid'))
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

router.post('/', async (ctx, next) => {
  const v = await new PositiveValidator().validate(ctx, {id: 'uid'})
  await Clock.setClock(v.get('body.uid'), v.get('body.year'), v.get('body.month'), v.get('body.date'))
  throw new global.errs.Success('您已成功签到')
})

module.exports = router