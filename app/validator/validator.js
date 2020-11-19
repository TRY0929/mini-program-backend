const {LinValidator, Rule} = require('../../core/lin-validator')
class PositiveValidator extends LinValidator {
  constructor () {
    super()
    this.id = [
      new Rule('isInt', '需要正整数', {
        min: 1
      })
    ]
  }
}

class DateValidator extends PositiveValidator {
  constructor () {
    super()
    this.year = [
      new Rule('isInt', '请输入正确年份（只支持2018-2022）', {
        min: 2018,
        max: 2022
      })
    ]
    this.month = [
      new Rule('isInt', '请输入正确月份', {
        min: 1,
        max: 12
      })
    ]
  }
}

module.exports = {
  PositiveValidator,
  DateValidator
}