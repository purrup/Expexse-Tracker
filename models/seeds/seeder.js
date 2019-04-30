const mongoose = require('mongoose')
const Record = require('../record')
const records = require('../../record.json').results
const users = require('../../user.json').results
const bcrypt = require('bcryptjs')
const User = require('../user')

mongoose.set('debug', true)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/record', {
  useNewUrlParser: true,
  useCreateIndex: true,
})
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  for (let i = 0; i < users.length; i++) {
    const user = User(users[i])
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        user.save()
      })
    })
    // 一個使用者分配4個records
    for (let j = i * 4; j < i * 4 + 4; j++) {
      Record.create({ ...records[j], userId: user._id })
    }
  }
  // Record.create({ records, userId: user._id })
  console.log('done!')
})
