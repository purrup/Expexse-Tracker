const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    req.flash('warning_msg', info.message)
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.redirect('/users/login')
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err)
      }
      return res.redirect('/')
    })
  })(req, res, next)
  // passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/users/login',
  //   failureFlash: 'Invalid username or password.',
  // })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []
  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
    return res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    })
  }
  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
    return res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    })
  }
  if (errors.length > 0) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        // 使用者已經註冊過
        errors.push({ message: '這個 Email 已經註冊過了' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        })
      } else {
        const newUser = new User({
          // 如果 email 不存在就直接新增
          name,
          email,
          password,
        })

        // 密碼加密
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => console.log(err))
          })
        )
      }
    })
  }
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router
