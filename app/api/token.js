const Router = require('koa-router')
const { loginType } = require('../lib/enum')
const {TokenValidator} = require('../validator/validator')
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {WXManager} = require('../service/wx')
const { Auth } = require('../../middlewares/auth')

const router = new Router({
  prefix: '/token'
})

router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx)
  const type = v.get('body.type')
  const account = v.get('body.account')
  const secret = v.get('body.secret')
  switch (type) {
    case loginType.USER_EMAIL:
      ctx.body = await emailLogin(account, secret)
      break
    case loginType.USER_MINI_PROGRAM:
      const token = await WXManager.codeToToken(account)
      ctx.body = token
      break
    default:
      throw new global.errs.ParameterException('没有相应处理函数')
  }
})

async function emailLogin (account, secret) {
  const res = await User.verifyEmailPassword(account, secret)
  const token = generateToken(res.id, Auth.USER)
  return token
}

module.exports = router