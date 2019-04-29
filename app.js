const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo', {
  useNewUrlParser: true,
  useCreateIndex: true,
})
const db = mongoose.connection

const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 載入路由
app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))
// app.use('/users', require('./routes/user'))

// listen to port
app.listen(process.env.PORT || 3000, () => {
  console.log('App is running on http://localhost:3000')
})
