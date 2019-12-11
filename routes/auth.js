const {Router} = require('express')
const router = Router()
const User = require('../models/user')

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    isLogin: true
  })
})

router.post('/login', async (req, res) => {
  const user = await User.findById('5df09d804e340805fc3f2053')
  req.session.user = user
  req.session.isAuthenticated = true
  req.session.save(err => {
    if(err) throw err

    res.redirect('/')
  })
})

router.get('/logout', async (req, res) => {
  // req.session.isAuthenticated = false
  req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
})

router.post('/registration', async (req, res) => {

})



module.exports = router