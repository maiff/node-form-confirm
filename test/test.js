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
  it.skip('validate error', function (done) {
    form.add('864306867qq.com', {
      label: '邮箱',
      validators: ['isEmail'],
      code: 1
    }).add('864306867@qqcom', {
      label: '邮箱',
      validators: ['isEmail'],
      code: 1
    })

    form.validate()
    form.on('validateError', (e, msg) => {
      assert.equal(e.code, 1)
      done()
    })
  })
  it('validate error', function (done) {
    form.add('', {
      label: '邮箱',
      validators: ['required','isEmail'],
      code: 1
    })

    form.validate()
    form.on('validateError', (e, msg) => {
      console.log(e)
      assert.equal(e.code, 1)
      done()
    })
  })
})