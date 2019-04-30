const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/', authenticated, (req, res) => {
  Record.find({})
    .sort()
    .exec((err, records) => {
      if (err) return console.error(err)
      let totalAmount = 0
      records.forEach(record => {
        let recordAmount = parseInt(record.amount, 10)
        totalAmount += recordAmount
      })
      return res.render('index', { records, totalAmount })
    })
})

module.exports = router
