'use strict'
const nanoId = require('nanoid')
const URL = require('../model/url')

module.exports = async (req, res) => {
  const { url } = req.query
  const urlRegExp = new RegExp(/(http(s)?:\/\/).*/)
  if (!url || !urlRegExp.test(url)) {
    return res.status(400).json({
      errorCode: 'ValidationError',
      errorMessage: 'URL을 형식에 맞추어 입력해주세요.'
    })
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
