const {Sequelize, Model} = require('sequelize')
const {
  port,
  user,
  host,
  dbName,
  password
} = require('../config/config').database
const {
  clone
} = require('lodash')

const sequelize = new Sequelize(dbName, user, password, {
  host,
  dialect: 'mysql',
  port,
  logging: console.log,
  timezone: '+08:00',
  define: {
    timestamps: false,
    paranoid: true,
    createdAt: 'create_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at'
  }
})

Model.prototype.toJSON = function () {
  let dataValues = clone(this.dataValues)
  for(let key in dataValues) {
    if (key === 'img_url') {
      if (!dataValues[key].startsWith('http')) {
        dataValues[key] = global.config.host + dataValues[key]
      }
    }
  }
  return dataValues
}

sequelize.sync({force: false})

module.exports = {
  sequelize
}