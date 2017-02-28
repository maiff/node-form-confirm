const EventEmitter = require('events')

class From extends EventEmitter {
  constructor () {
    super()
    this.comfirmList = []
    this.validators = {}
    this.addValidator('isEmail', (text) => {
      let mailR = /^[\w\-]+@[\w\-]+(\.[\w\-]+)+$/
      if (mailR.test(text)) return { success: true }
      return {
        success: false,
        msg: '请输入合法邮件地址～'
      }
    })
  }
  /*
    options
    label : string ,
    validators : ['isString' , 'notEmpty'] ,
  */
  add (text, options) {
    if (text === undefined) throw new Error('add : text is required!')
    if (options.label === undefined) throw new Error('add : label is required!')

    let comfirmObj = {
      text: text,
      label: options.label,
      validators: options.validators || []
    }
    this.comfirmList.push(comfirmObj)

    return this
  }

  addValidator (name, fn) {
    if (typeof name !== 'string') throw new Error('addValidator : name must be string!')
    if (typeof fn !== 'function') throw new Error('addValidator : fn must be function!')
    /*
      fn
      return {
        success : false ,
        msg : '我说你错,你就是错'
      }
    */
    this.validators[name] = fn
    return this
  }

  validate (fn) {
    let flag = true
    let comfirmList = this.comfirmList
    let comfirmListLength = comfirmList.length
    for (let i = 0; i < comfirmListLength; i++) {
      flag = this._validateEvery(comfirmList[i])
    }
    flag && fn && fn()
  }

  _validateEvery (comfirmObj) {
    let text = comfirmObj.text
    let label = comfirmObj.label
    let needValidateList = comfirmObj.validators
    let needValidateListLength = needValidateList.length
    let flag = true
    for (let i = 0; i < needValidateListLength; i++) {
      flag = this._validate(label, text, needValidateList[i])
    }
    return flag
  }

  _validate (label, text, name /* string */) {
    let validators = this.validators
    let backObj = validators[name](text)
    if (backObj.success === false) {
      let e = {
        label: label,
        text: text,
        msg: backObj.msg
      }
      setImmediate(() => {
        this.emit('validateError', e, backObj.msg)
      })
      return false
    }
    return true
  }

}

module.exports = From
