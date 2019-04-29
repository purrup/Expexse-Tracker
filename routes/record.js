const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// 列出全部 Record
router.get('/', (req, res) => {
  res.send('display all record')
})

//新增一筆 Record 的頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增一筆 Record
router.post('/new', (req, res) => {
  console.log(req.body)
  const newRecord = Record(req.body)
  newRecord.save(err => (err ? console.log(err) : res.redirect('/')))
})

// 修改 Record 頁面
router.get('/:id/edit', (req, res) => {
  Record.findOne({ _id: req.params.id }, (err, record) => {
    return res.render('edit', { record })
  })
})

// 修改 Record
router.post('/edit', (req, res) => {})

module.exports = router
