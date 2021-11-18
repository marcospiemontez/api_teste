const express = require('express')
const { Requests } = require('../models/index')
const RequestService = require('../services/requests')
const { check, validationResult } = require('express-validator')
const middleware = require('../middlewares/authenticatedVerification')

const router = express.Router()
router.use(middleware)

const requestService = new RequestService(Requests)

router.get('/:id/details', async (req, res) => {
    const idRequest = req.params.id

    try {
        const validationRequests = await requestService.getById(idRequest)
        res.status(200).send({
            status: 200,
            message: 'Request found successfully!',
            product: validationRequests
        })
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

router.get('/list', async(req, res) => {
    const listRequests = await requestService.getAll()
    res.status(200).json(listRequests)
})

router.post('/',
    check('userId').not().isEmpty().isNumeric().withMessage('The data submitted must be a valid number for ID of user.'),
    check('amount').not().isEmpty().isDecimal().withMessage('The data submitted must be a valid number for amount.'),
    check('amountProduct').not().isEmpty().isDecimal().withMessage('The data submitted must be a valid number for amount of product.'),
    check('amountDiscount').not().isEmpty().isDecimal().withMessage('The data submitted must be a valid number for amount of discount.'),
    // check('paymentId').not().isEmpty().isNumeric().withMessage('The data submitted must be a valid number for ID of payment method.'),
    check('products').not().isEmpty().isArray().withMessage('The data sent is not valid for the expected array in the products field.'),

    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const dataRequests = {
            note: req.body.note,
            userId: req.body.userId,
            amount: req.body.amount,
            amountProduct: req.body.amountProduct,
            amountDiscount: req.body.amountDiscount,
            // paymentId: req.body.paymentId,
            products: req.body.products,
        }

        try {
            await requestService.add(dataRequests)
            res.status(201).send({
                status: 200,
                message: 'Request successfully added!'
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
    check('userId').not().isEmpty().isNumeric().withMessage('The data submitted must be a valid number for ID.'),
    
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const idRequest = req.params.id

        const dataRequest = {
            note: req.body.note,
            userId: req.body.userId,
        }

        try {
            await requestService.update(idRequest, dataRequest)
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
    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const idRequest = req.params.id

        const dataRequest = {...req.body}

        try {
            await requestService.updateMerge(idRequest, dataRequest)
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
    const idRequest = req.params.id

    try {
        await requestService.delete(idRequest)
        res.status(204).send()
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

module.exports = router