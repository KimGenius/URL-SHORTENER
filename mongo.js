'use strict'
const mongoose = require('mongoose')

module.exports = () => {
  const dbName = process.env.NODE_ENV === 'test'
    ? 'url-shortener-test'
    : 'url-shortener'
  mongoose.connect(`mongodb://localhost/${dbName}`)
  const db = mongoose.connection
  db.on('error', console.error)
  db.once('open', () => {
    console.log('Connected to mongod server')
  })
}
