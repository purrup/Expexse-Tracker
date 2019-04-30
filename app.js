const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const helpers = require('handlebars-helpers')({
  handlebars: handlebars,
})

app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo', {
  useNewUrlParser: true,
  useCreateIndex: true,
})
const db = mongoose.connection
db.on('error', () => console.log('mongodb error'))
db.once('open', () => console.log('mongodb connected!'))

// 載入路由
app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))
// app.use('/users', require('./routes/user'))

// listen to port
app.listen(process.env.PORT || 3000, () => {
  console.log('App is running on http://localhost:3000')
})
