'use strict'
const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect('mongodb://localhost/url-shortener')
  const db = mongoose.connection
  db.on('error', console.error)
  db.once('open', () => {
    console.log('Connected to mongod server')
  })
}
