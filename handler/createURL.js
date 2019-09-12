'use strict'
const nanoId = require('nanoid')
const URL = require('../model/url')
const UrlStats = require('../model/urlStats')

module.exports = async (req, res) => {
  const { url } = req.query
  const urlRegExp = new RegExp(/(http(s)?:\/\/).*/)
  if (!url || !urlRegExp.test(url)) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: 'URL을 형식에 맞추어 입력해주세요.'
    })
  }
  // URL 데이터가 10000개 이상이면 제일 오래된 데이터 삭제
  const docCount = await URL.countDocuments()
  if (docCount === 10000) {
    const { shortUrl } = await URL.findOne().sort({ useDate: 1 })
    await URL.remove({ shortUrl })
    await UrlStats.remove({ shortUrl })
  }
  try {
    const result = await new URL({
      originUrl: url,
      shortUrl: nanoId(9)
    }).save()
    return res.status(201).json({
      url: `http://localhost:3000/${result.shortUrl}`
    })
  } catch (err) {
    if (err.code === 11000) {
      const urlData = await URL.findOne({
        originUrl: url
      })
      return res.status(200).json({
        url: `http://localhost:3000/${urlData.shortUrl}`
      })
    }
    return res.status(500).json(err)
  }
}
