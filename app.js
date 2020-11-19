const koa = require('koa')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const CatchError = require('./middlewares/exceptions')

const app = new koa()

app.use(CatchError)
app.use(parser())
InitManager.initCore(app)

app.listen(3000)