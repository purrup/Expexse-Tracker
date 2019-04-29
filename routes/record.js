const express = require('express')
const router = express.Router()

// 列出全部 Record
// router.get('/', (req, res) => {
//   res.send('display all record')
// })

//新增一筆 Record 的頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增一筆 Record

// 修改 Record 頁面
router.get('/edit', (req, res) => {
  res.render('edit')
})

// 修改 Record

module.exports = router
