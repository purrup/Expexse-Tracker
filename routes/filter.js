const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')
const month = require('../month.json').results

router.get('/month/:month', authenticated, (req, res) => {
  const monthFilter = parseInt(req.params.month, 10)
  Record.find({ userId: req.user._id })
    .sort()
    .exec((err, records) => {
      if (err) return console.error(err)
      const recordsFilter = records.filter(record => {
        const monthRecord = parseInt(record.date.substr(5, 2), 10) //從字串取出月份，並轉為數字
        return monthFilter === monthRecord
      })
      let totalAmount = 0
      recordsFilter.forEach(record => {
        let recordAmount = parseInt(record.amount, 10)
        totalAmount += recordAmount
      })
      console.log(recordsFilter)
      return res.render('index', { records: recordsFilter, totalAmount, month })
    })
})

router.get('/category/:category', authenticated, (req, res) => {
  res.send('category page')
})

module.exports = router
