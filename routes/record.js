const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

// 列出全部 Record
// router.get('/', (req, res) => {
//   res.send('display all record')
// })

//新增一筆 Record 的頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

// 新增一筆 Record
router.post('/new', authenticated, (req, res) => {
  const newRecord = Record(req.body)
  newRecord.save(err => (err ? console.log(err) : res.redirect('/')))
})

// 修改 Record 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id }, (err, record) => {
    return res.render('edit', { record })
  })
})

// 修改 Record
router.put('/:id', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id }, (err, record) => {
    if (err) return console.error(err)
    Object.assign(record, req.body)
    record.save(err => {
      err ? console.error(err) : res.redirect('/')
    })
  })
})

//刪除 Record
router.delete('/:id/delete', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id }, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      err ? console.error(err) : res.redirect('/')
    })
  })
})

module.exports = router
