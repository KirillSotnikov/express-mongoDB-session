const express = require('express')
const exphbs = require('express-handlebars')

const path = require('path')

const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')


const MONGODB_URI = 'mongodb+srv://sotnikov_k:OP1imCvCqLmcrQri@mongovue-voe6y.mongodb.net/trainingVladilenSession?retryWrites=true&w=majority'

// const User = require('./models/user')

const varMiddleware = require('./middleware/variables')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// app.use(async (req, res, next) => {
//   try{
//     const user = await User.findById('5df09d804e340805fc3f2053')
//     req.user = user
//     next()
//   } catch(err) {
//     console.log(err)
//   }
// })

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(varMiddleware)

app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useFindAndModify: false,
      useNewUrlParser: true
    })
    // const candidate = await User.findOne()
    // if(!candidate){
    //   const user = new User({
    //     email: 'sotnikov_k@outlook.com',
    //     name: 'Kirill',
    //     cart: { items: [] }
    //   })
    //   await user.save()
    // }
    app.listen(PORT, () => {
      console.log(`Server is running ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
