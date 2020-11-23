const Router = require('koa-router')
const {Journal} = require('../models/journal')
const {Auth} = require('../../middlewares/auth')
const {PositiveValidator} = require('../validator/validator')
const router = new Router({
  prefix: '/journal'
})

router.get('/latest', new Auth().m, async (ctx, next) => {
  ctx.body = await Journal.getLatest()
})

router.get('/prev/:index', new Auth().m, async (ctx, next) => {
  const v = await new PositiveValidator().validate(ctx, {id: 'index'})
  const index = v.get('path.index')
  ctx.body = await Journal.getJournal(index)
})

router.get('/next/:index', new Auth().m, async (ctx, next) => {
  const v = await new PositiveValidator().validate(ctx, {id: 'index'})
  const index = v.get('path.index')
  ctx.body = await Journal.getJournal(index)
})

module.exports = router