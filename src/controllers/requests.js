const express = require('express')
const { Requests } = require('../models/index')
const RequestService = require('../services/requests')
const { check, validationResult } = require('express-validator')
const middleware = require('../middlewares/authenticatedVerification')

const router = express.Router()
router.use(middleware)

const requestsService = new RequestService(Requests)

router.get('/:id/details', async (req, res) => {
    const idRequest = req.params.id

    try {
        const validationRequests = await requestsService.getById(idRequest)
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
    const listRequests = await requestsService.getAll()
    res.status(200).json(listRequests)
})

router.post('/',
    check('userId').not().isEmpty().isNumeric().withMessage('The data submitted must be a valid number for ID.'),

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
        }

        try {
            await requestsService.add(dataRequests)
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

// router.put('/updateProduct/:id',
//     body('name').not().isEmpty().withMessage('The data sent cannot be empty or null').trim().escape(),
//     check('price').not().isEmpty().isDecimal().withMessage('The data submitted must be a valid number. Example (10.99)'),
    
//     async (req, res) => {
//         const errors = validationResult(req)

//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array()
//             })
//         }

//         const idProduct = req.params.id

//         const dataProduct = {
//             name: req.body.name,
//             price: req.body.price,
//             description: req.body.description
//         }

//         try {
//             await productService.update(idProduct, dataProduct)
//             res.status(204).send()
//         } catch (error) {
//             res.status(404).send({
//                 status: 404,
//                 message: error.message
//             })
//         }
//     }
// )

// router.patch('/updateProductMerge/:id', 
//     body('name').not().isEmpty().withMessage('The data sent cannot be empty or null').trim().escape(),
//     check('price').not().isEmpty().isDecimal().withMessage('The data submitted must be a valid number. Example (10.99)'),
    
//     async (req, res) => {
//         const errors = validationResult(req)

//         if(!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array()
//             })
//         }

//         const idProduct = req.params.id

//         const dataProduct = {...req.body}

//         try {
//             await productService.updateMerge(idProduct, dataProduct)
//             res.status(204).send()
//         } catch (error) {
//             res.status(404).send({
//                 status: 404,
//                 message: error.message
//             })
//         }
//     }
// )

// router.delete('/deleteProduct/:id', async (req, res) =>{
//     const idProduct = req.params.id

//     try {
//         await productService.delete(idProduct)
//         res.status(204).send()
//     } catch (error) {
//         res.status(404).send({
//             status: 404,
//             message: error.message
//         })
//     }
// })

module.exports = router