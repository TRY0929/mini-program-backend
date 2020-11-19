const {HttpException} = require('../core/http-exception')
const CatchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isDev = global.config.environment === 'dev'
    const isHttpException = error instanceof HttpException
    if (isDev && isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.error_code,
        requestUrl: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else if (isDev && !isHttpException) {
      ctx.body = {
        msg: 'We made a mistake.',
        error_code: 9999,
        requestUrl: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = CatchError