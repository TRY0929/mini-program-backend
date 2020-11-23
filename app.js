const koa = require('koa')
const parser = require('koa-bodyparser')
const path = require('path')
const static = require('koa-static')
const InitManager = require('./core/init')
const CatchError = require('./middlewares/exceptions')


const app = new koa()

app.use(CatchError)

app.use(parser())
app.use(static(path.join(__dirname, './static/')))

InitManager.initCore(app)

app.listen(3000)