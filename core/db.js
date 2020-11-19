const {Sequelize} = require('sequelize')
const {
  port,
  user,
  host,
  dbName,
  password
} = require('../config/config').database

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

sequelize.sync({force: false})

module.exports = {
  sequelize
}