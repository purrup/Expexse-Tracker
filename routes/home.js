const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/', (req, res) => {
  Record.find({})
    .sort({ name: 'asc' })
    .exec((err, records) => {
      if (err) return console.error(err)
      return res.render('index', { records })
    })
})

module.exports = router
