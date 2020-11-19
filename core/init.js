const Router = require('koa-router')
const requireDirectory = require('require-directory')
const config = require('../config/config')

class InitManager {
  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRouter()
    InitManager.initConfig()
    InitManager.initException()
  }

  static initLoadRouter () {
    requireDirectory(module, `${process.cwd()}/app/api`, {visit: visitFunction})
    function visitFunction (obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  static initConfig () {
    global.config = config
  }

  static initException () {
    global.errs = require('../core/http-exception')
  }
}

module.exports = InitManager