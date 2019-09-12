'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * shortUrl - 짧아진 URL
 * originUrl - 원래의 URL
 * dateCreated - 탄생일
 */
const URLSchema = new Schema({
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  originUrl: {
    type: String,
    required: true,
    unique: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
})

const Url = mongoose.model('url', URLSchema)
module.exports = Url
