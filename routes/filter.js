const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')
const month = require('../month.json').results

router.get('/month/:month', (req, res) => {
  res.send('filter page')
})

router.get('/category/:category', (req, res) => {
  res.send('category page')
})

module.exports = router
