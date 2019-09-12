'use strict'
require('./mongo')()
const app = require('express')()
const fs = require('fs')

const obj = JSON.parse(fs.readFileSync('./route.json', 'utf8'))
obj.map(v => {
  try {
    app[v.method](v.path, require('./handler/' + v.handler))
  } catch (e) {
    console.log(e)
  }
})

app.listen(3000, () => {
  console.log('URL 줄일 준비 완료!')
})
