const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')
const monthList = require('../month.json').results

router.get('/', authenticated, (req, res) => {
  const month = req.query.month ? req.query.month : false
  const category = req.query.category ? req.query.category : { $exists: true }
  console.log(req.query.category)
  Record.find({ userId: req.user._id, category }).exec((err, records) => {
    if (err) return console.error(err)
    let filterMonthList = []
    let totalAmount = 0
    records = records
      .filter(record => {
        if (month) {
          // filterMonthList = [...monthList]
          // const filterMonthIndex = Number(month) - 1
          // filterMonthList = monthList.splice(filterMonthIndex, 1)
          console.log(month)
          return Number(record.date.slice(5, 7)) === Number(month)
        }
        return true
      })
      .map(record => {
        totalAmount += parseInt(record.amount, 10)
        return record
      })

    res.render('index', {
      records,
      totalAmount,
      monthList,
      month,
      filterMonthList,
    })
  })
})

module.exports = router
