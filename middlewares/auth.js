const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
  constructor (level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
  }

  get m () {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      const errMsg = 'token不合法'
      if (!userToken || !userToken.name) {
        throw new global.errs.Forbidden(errMsg)
      }
      try {
        var decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          throw new global.errs.Forbidden('token已过期')
        }
        throw new global.errs.Forbidden(errMsg)
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.uid
      }
      await next()
    }
  }
}

module.exports = {
  Auth
}