const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')
const month = require('../month.json').results

router.get('/', authenticated, (req, res) => {
  console.log(req.body)
  Record.find({ userId: req.user._id })
    .sort()
    .exec((err, records) => {
      if (err) return console.error(err)
      let totalAmount = 0
      records.forEach(record => {
        let recordAmount = parseInt(record.amount, 10)
        totalAmount += recordAmount
      })
      return res.render('index', { records, totalAmount, month })
    })
})

module.exports = router
