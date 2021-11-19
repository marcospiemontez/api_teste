const express = require('express')
const authenticatedRouters = require('./authentication')
const usersRouters = require('./users')
const productsRouters = require('./products')
const requestsRouters = require('./requests')
const paymentsRouters = require('./payments')
const typeAccessRouters = require('./typeAccess')
const cartRouters = require('./cart')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('App online!') 
})

router.use('/authentication', authenticatedRouters)
router.use('/users', usersRouters)
router.use('/products', productsRouters)
router.use('/requests', requestsRouters)
router.use('/payments', paymentsRouters)
router.use('/type/access', typeAccessRouters)
router.use('/cart', cartRouters)

module.exports = router