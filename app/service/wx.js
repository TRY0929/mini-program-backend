const axios = require('axios')
const util = require('util')
const {generateToken} = require('../../core/util')
const { User } = require('../models/user')
const { Auth } = require('../../middlewares/auth')
class WXManager {
  static async codeToToken (code) {
    const loginUrl = util.format(global.config.wx.url, global.config.wx.appId, global.config.wx.appSecret, code)
    const res = await axios.get(loginUrl)
    if (res.status !== 200) {
      throw new global.errs.AuthorFailed('openid获取失败')
    }
    if (res.data.errcode) {
      throw new global.errs.AuthorFailed('openid获取失败 ' + res.data.errmsg)
    }
    const openid = res.data.openid
    let user = await User.getUserByOpenid(openid)
    if (!user) {
      user = await User.registerByOpenid(openid)
    }
    const token = generateToken(user.id, Auth.USER)
    return token
  }
}

module.exports = {
  WXManager
}