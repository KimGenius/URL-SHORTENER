'use strict'
const URL = require('../model/url')

/**
 * shortUrl로 접근 시 originUrl로 redirect 시켜줌
 *
 * @param req
 * @param res
 * @return redirect originURL
 */
module.exports = async (req, res) => {
  const { shortUrl } = req.params
  const urlData = await URL.findOne({ shortUrl })
  return res.redirect(urlData.originUrl)
}
