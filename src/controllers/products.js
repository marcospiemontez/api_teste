const express = require('express')
const { products } = require('../models/index')
const ProductService = require('../services/products')
const { body, check, validationResult } = require('express-validator')
const middleware = require('../middlewares/authenticatedVerification')

const router = express.Router()
router.use(middleware)

const productService = new ProductService(products)

router.get('/listProducts', async(req, res) => {
    const listProducts = await productService.get()
    res.status(200).json(listProducts)
})

router.post('/cadProducts',
    body('name').not().isEmpty().withMessage('The data sent cannot be empty or null').trim().escape(),
    check('price').not().isEmpty().isDecimal().withMessage('The data submitted must be a valid number. Example (10.99)'),

    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const dataProducts = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        }

        try {
            await productService.add(dataProducts)
            res.status(201).send({
                status: 200,
                message: 'Product successfully added!'
            })
        } catch (error) {
            res.status(400).send({
                status: 400,
                message: error.message
            })
        }
    }
)

module.exports = router