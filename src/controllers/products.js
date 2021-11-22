const express = require('express')
const { Products } = require('../models/index')
const ProductService = require('../services/products')
const { body, check, validationResult } = require('express-validator')
const middleware = require('../middlewares/authenticatedVerification')

const router = express.Router()
router.use(middleware)

const productService = new ProductService(Products)

router.get('/:id/details', async (req, res) => {
    const idProduct = req.params.id

    try {
        const validationProduct = await productService.getById(idProduct)
        res.status(200).send({
            status: 200,
            message: 'Product found successfully!',
            product: validationProduct
        })
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

router.get('/list', async(req, res) => {
    const listProducts = await productService.getAll()
    res.status(200).json(listProducts)
})

router.post('/',
    body('name').not().isEmpty().withMessage('The data sent cannot be empty or null').trim().escape(),
    check('price').not().isEmpty().isDecimal().withMessage('The data submitted must be a valid number. Example (10.99)'),
    check('inventory').not().isEmpty().isDecimal().withMessage('The data submitted must be a valid number for inventory'),

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
            price: req.body.price,
            inventory: req.body.inventory
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

router.put('/:id',
    body('name').not().isEmpty().withMessage('The data sent cannot be empty or null').trim().escape(),
    check('price').not().isEmpty().isDecimal().withMessage('The data submitted must be a valid number. Example (10.99)'),
    check('inventory').not().isEmpty().isDecimal().withMessage('The data submitted must be a valid number for inventory'),
    
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const idProduct = req.params.id

        const dataProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            inventory: req.body.inventory
        }

        try {
            await productService.update(idProduct, dataProduct)
            res.status(204).send()
        } catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            })
        }
    }
)

router.patch('/:id', 
    body('name').not().isEmpty().withMessage('The data sent cannot be empty or null').trim().escape(),
    check('price').not().isEmpty().isDecimal().withMessage('The data submitted must be a valid number. Example (10.99)'),
    check('inventory').not().isEmpty().isDecimal().withMessage('The data submitted must be a valid number for inventory'),
    
    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const idProduct = req.params.id

        const dataProduct = {...req.body}

        try {
            await productService.updateMerge(idProduct, dataProduct)
            res.status(204).send()
        } catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            })
        }
    }
)

router.delete('/:id', async (req, res) =>{
    const idProduct = req.params.id

    try {
        await productService.delete(idProduct)
        res.status(204).send()
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

module.exports = router