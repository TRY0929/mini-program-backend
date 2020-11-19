const {LinValidator, Rule} = require('../../core/lin-validator')
const {loginType} = require('../lib/enum')

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

class TokenValidator extends LinValidator {
  constructor () {
    super()
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32
      })
    ]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '最短6个字符，最长32个字符', {
        min: 6,
        max: 32
      })
    ]
  }
  async validateLoginType (vals) {
    const type = vals.body.type
    if (!type) {
      throw new Error('type是必须的')
    }
    const res = loginType.isThisType(type)
    if (!res) {
      throw new Error('type不符合规范')
    }
  }
}

module.exports = {
  PositiveValidator,
  DateValidator,
  TokenValidator
}