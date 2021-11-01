const express = require('express')
// const usersRouters = require('./users')
// const productsRouters = require('./products')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('App online!') 
})

// router.use('/users', usersRouters)
// router.use('.products', productsRouters)

module.exports = router