'use strict'
const moment = require('moment-timezone')
const URL = require('../model/url')
const UrlStats = require('../model/urlStats')

/**
 * shortUrl로 접근 시 originUrl로 redirect 시켜주고
 * visits 증가
 *
 * @param req
 * @param res
 * @return redirect originURL
 */
module.exports = async (req, res) => {
  const { shortUrl } = req.params
  if (shortUrl.length !== 9) {
    // create 시 nanoId를 9자리로만 생성하기 때문에 9자리 이외의 자릿수는 존재 불가
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '짧게 만든 주소는 9자리로 입력해주세요.'
    })
  }
  const urlData = await URL.findOneAndUpdate({
    shortUrl
  }, {
    useDate: moment()
  })
  if (!urlData) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: '존재하지 않는 URL 입니다.'
    })
  }
  await UrlStats.findOneAndUpdate({
    shortUrl,
    at: moment().format('YYYY-MM-DD HH:00:00')
  }, {
    $inc: { visits: 1 }
  }, {
    upsert: true
  })
  return res.redirect(urlData.originUrl)
}
