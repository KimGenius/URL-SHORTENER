'use strict'
const chai = require('chai')
const chaiHttp = require('chai-http')
const index = require('../index')
const URL = require('../model/url')

chai.use(chaiHttp)
chai.should()

describe('createURL Test', function () {
  const url = 'https://bigcar.kr'
  before(async () => {
    // 테스트 전 Test Data Clear
    await URL.remove({})
  })
  it('처음 정상 등록', async () => {
    const res = await chai.request(index).post(`/register.json?url=${url}`)
    res.should.have.status(201)
  })
  it('같은 값으로 하는 경우', async () => {
    const res = await chai.request(index).post(`/register.json?url=${url}`)
    res.should.have.status(200)
  })
})
