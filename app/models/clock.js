const {Sequelize, Model, Op} = require('sequelize')
const {sequelize} = require('../../core/db')

class Clock extends Model {
  static async getMonthClockData (uid, year, month) {
    const dates = []
    const monthDay = new Date(year, month, 0).getDate()
    for (let i=0; i<=monthDay; i++) {
      dates[i] = 0
    }
    const res = await Clock.findAll({
      where: {
        [Op.and]: [
          {uid},
          {year},
          {month}
        ]
      }
    })
    if (!res) {
      throw new global.errs.NotFound()
    }
    res.forEach(item => {
      dates[item.day] = 1
    })
    return dates
  }

  static async setClock (uid, year, month, day) {
    await Clock.create({uid, year, month, day})
  }

  // 获取 1/2 个月的数据
  static async getWeekClockData (uid, year, dates, months) {
    const res = []
    res.push(await Clock.getMonthClockData(uid, year, months[0]))
    return res
  }

  static async getUserClockData (uid) {
    const res = await Clock.findAll({
      where: {
        uid
      }
    })
    return res
  }
}

Clock.init({
  uid: Sequelize.STRING,
  year: Sequelize.INTEGER,
  month: Sequelize.INTEGER,
  day: Sequelize.INTEGER,
  date: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'clock'
})

module.exports = {
  Clock
}