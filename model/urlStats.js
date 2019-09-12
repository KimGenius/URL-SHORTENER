'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * shortUrl - 짧아진 URL
 * datetime - 시간대
 * visits - 조회 횟수
 */
const URLStatsSchema = new Schema({
  shortUrl: {
    type: String,
    required: true
  },
  at: {
    type: String,
    required: true
  },
  visits: {
    type: Number,
    default: 0
  }
}, {
  versionKey: false
})

const UrlStats = mongoose.model('urlStats', URLStatsSchema)
module.exports = UrlStats
