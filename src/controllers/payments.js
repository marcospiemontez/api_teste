const express = require('express')
const { Payments } = require('../models/index')
const PaymentService = require('../services/payments')
const { body, check, validationResult } = require('express-validator')
const middleware = require('../middlewares/authenticatedVerification')

const router = express.Router()
router.use(middleware)

const paymentService = new PaymentService(Payments)

router.get('/:id/details', async (req, res) => {
    const idPayment = req.params.id

    try {
        const validationPayment = await paymentService.getById(idPayment)
        res.status(200).send({
            status: 200,
            message: 'Payment method found successfully!',
            product: validationPayment
        })
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

router.get('/list', async(req, res) => {
    const listPayment = await paymentService.getAll()
    res.status(200).json(listPayment)
})

router.post('/',
    check('method').not().isEmpty().withMessage('The data submitted cannot be empty or null'),

    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const dataPayment = {
            method: req.body.method,
        }

        try {
            await paymentService.add(dataPayment)
            res.status(201).send({
                status: 200,
                message: 'Payment method successfully added!'
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
    check('method').not().isEmpty().withMessage('The data submitted cannot be empty or null'),
    
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const idPayment = req.params.id

        const dataPayment = {
            method: req.body.method
        }

        try {
            await paymentService.update(idPayment, dataPayment)
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
    check('method').not().isEmpty().withMessage('The data submitted cannot be empty or null'),
    
    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const idPayment = req.params.id

        const dataPayment = {...req.body}

        try {
            await paymentService.updateMerge(idPayment, dataPayment)
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
    const idPayment = req.params.id

    try {
        await paymentService.delete(idPayment)
        res.status(204).send()
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

module.exports = router