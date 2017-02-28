const Form = require('../index')
const assert = require('assert')

describe('form', function () {
  let form = new  Form()
  it.skip('add error', function () {
    form.add()
  })
  it.skip('add label error', function () {
    form.add('864306867@qq.com', {})
  })
  it('add', function (done) {
    form.add('864306867@qq.com', {
      label: '邮箱',
      validators: ['isEmail']
    })
    done()
  })
  it('validate', function (done) {
    form.add('864306867@qq.com', {
      label: '邮箱',
      validators: ['isEmail']
    }).add('xwt2101239@gmail.com',{
      label: '邮箱',
      validators: ['isEmail']
    })
    form.validate(done)
  })
  it('validate error', function (done) {
    form.add('864306867qq.com', {
      label: '邮箱',
      validators: ['isEmail']
    })

    form.validate()
    form.on('validateError', (e, msg) => {
      done()
    })
  })
})