const bcrypt = require('bcryptjs')
const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class User extends Model {
  static async verifyEmailPassword (account) {
    const res = await User.findOne({
      where: {
        email: account
      }
    })
    if (!res) {
      throw new global.errs.NotFound('账号不存在')
    }
    const correct = bcrypt.compareSync(secret, res.password)
    if (!correct) {
      throw new global.errs.AuthorFailed('密码不正确')
    }
    return res
  }

  static async getUserByOpenid (openid) {
    return await User.findOne({
      where: {
        openid
      }
    })
  }

  static async registerByOpenid (openid) {
    return await User.create({
      openid
    })
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set (val) {
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
  openid: {
    type: Sequelize.STRING,
    unique: true
  }
}, {
  sequelize,
  tableName: 'User'
})

module.exports = {
  User
}