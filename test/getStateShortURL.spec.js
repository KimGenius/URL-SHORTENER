'use strict'
const chai = require('chai')
const { expect } = chai
const chaiHttp = require('chai-http')
const nanoId = require('nanoid')
const index = require('../index')
const URL = require('../model/url')
const UrlStats = require('../model/urlStats')

chai.use(chaiHttp)
chai.should()

describe('getStateShortURL Test', () => {
  const originUrl = 'https://bigcar.kr'
  const shortUrl = nanoId(9)
  before(async () => {
    // 테스트 전 Test Data Clear
    await URL.remove({})
    await UrlStats.remove({})
    // 테스트 전 Data 준비
    await new URL({
      originUrl,
      shortUrl
    }).save()
    await chai.request(index).get(`/${shortUrl}`)
  })
  it('조회 카운트가 잘 되었는지', async () => {
    const res = await chai.request(index).get(`/${shortUrl}/stats`)
    expect(res.body).to.have.key('Stats')
    expect(res.body.Stats).to.have.length(1)
    expect(res.body.Stats[0]).to.be.an('object')
    expect(res.body.Stats[0].visits).to.equal(1)
    res.should.have.status(200)
  })
})
