'use strict'
const chai = require('chai')
const chaiHttp = require('chai-http')
const nanoId = require('nanoid')
const index = require('../index')
const URL = require('../model/url')

chai.use(chaiHttp)
chai.should()

describe('accessShortURL Test', function () {
  const originUrl = 'https://bigcar.kr'
  let shortUrl = ''
  before(async () => {
    // 테스트 전 Data 준비
    await new URL({
      originUrl,
      shortUrl: nanoId(9)
    }).save()
    const result = await URL.findOne({ originUrl })
    shortUrl = result.shortUrl
  })
  it('정상적으로 되는지', async () => {
    const res = await chai.request(index).get(`/${shortUrl}`)
    res.should.have.status(200)
  })
  it('없는 shortURL 입력시', async () => {
    const res = await chai.request(index).get(`/helloword`)
    res.should.have.status(400)
  })
  it('길이가 9자리가 아닌 shortURL 입력시', async () => {
    const res = await chai.request(index).get(`/helloworld`)
    res.should.have.status(400)
  })
})
