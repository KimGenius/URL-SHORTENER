'use strict'
const UrlStats = require('../model/urlStats')

/**
 * Short URL의 Stats 정보 조회
 * @param req
 * @param res
 * @return {Promise<void>}
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
  const Stats = await UrlStats.find({ shortUrl }, { _id: 0, shortUrl: 0 })
  res.json({ Stats })
}
