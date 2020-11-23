const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class Journal extends Model {
  static async getLatest () {
    const res = await Journal.findOne({
      order: [
        ['index', 'DESC']
      ]
    })
    if (!res) {
      throw new global.errs.NotFound('未找到最新一期')
    }
    return res
  }

  static async getJournal (index) {
    const res = await Journal.findOne({
      where: {
        index
      }
    })
    if (!res) {
      throw new global.errs.NotFound()
    }
    return res
  }
}

Journal.init({
  like_num: Sequelize.INTEGER,
  index: Sequelize.INTEGER,
  img_url: Sequelize.STRING,
  content: Sequelize.STRING,
  key_word: Sequelize.STRING
}, {
  sequelize,
  tableName: 'Journal'
})

module.exports = {
  Journal
}