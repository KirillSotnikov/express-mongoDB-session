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
  try{
    const {email, password} = req.body

    const candidate = await User.findOne({email})

    if(candidate) {
      const isSame = password === candidate.password

      if(isSame) {
        req.session.user = candidate
        req.session.isAuthenticated = true
        req.session.save(err => {
          if(err) throw err
      
          res.redirect('/')
        })
      } else {
        res.redirect('/auth/login#login')
      }
    } else {
      res.redirect('/auth/login#login')
    }
  } catch (err) {
    console.log(err)
  }
})

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
})

router.post('/registration', async (req, res) => {
  try{
    const {email, password, repeat, name} = req.body

    const candidate = await User.findOne({ email })

    if(candidate) {
      res.redirect('/auth/login#registration')
    } else {
      const user = new User({
        email,
        name,
        password,
        cart: { items: [] }
      })
      await user.save()
      res.redirect('/auth/login#login')
    }
  } catch(err) {
    console.log(err)
  }
})



module.exports = router