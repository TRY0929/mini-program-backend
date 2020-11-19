class HttpException extends Error {
  constructor (msg = '啊哦，出现了一个错误', error_code = 10000, code = 200) {
    super()
    this.msg = msg
    this.error_code = error_code
    this.code = code
  }
}

class ParameterException extends HttpException {
  constructor (msg, error_code, code) {
    super()
    this.msg = msg || '参数错误'
    this.error_code = error_code || 10000
    this.code = 400 || code
  }
}

class NotFound extends HttpException {
  constructor (msg, error_code, code) {
    super()
    this.msg = msg || '资源不存在'
    this.error_code = error_code || 10001
    this.code = code || 404
  }
}

class AuthorFailed extends HttpException {
  constructor (msg, error_code, code) {
    super()
    this.msg = msg || '授权失败'
    this.error_code = error_code || 10004
    this.code = code || 401
  }
}

class Forbidden extends HttpException {
  constructor (msg, error_code, code) {
    super()
    this.msg = msg || '禁止访问'
    this.error_code = error_code || 10003
    this.code = code || 403
  }
}

class Success extends HttpException {
  constructor (msg, error_code, code) {
    super()
    this.msg = msg || 'ok'
    this.error_code = error_code || 0
    this.code = 200 || code
  }
}

module.exports = {
  HttpException,
  ParameterException,
  NotFound,
  Success,
  AuthorFailed,
  Forbidden
}