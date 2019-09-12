'use strict'
const nanoId = require('nanoid')
const URL = require('../model/url')

module.exports = async (req, res) => {
  const { url } = req.query
  if (!url) return res.status(400).send('URL을 입력해주세요.')
  try {
    const result = await new URL({
      originUrl: url,
      shortUrl: nanoId(10)
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
