const express = require('express')
const { Cart } = require('../models/index')
const CartService = require('../services/cart')
const { body, check, validationResult } = require('express-validator')
const middleware = require('../middlewares/authenticatedVerification')

const router = express.Router()
router.use(middleware)

const cartService = new CartService(Cart)

router.get('/details', async (req, res) => {
    const idUserCart = req.idUser.id

    try {
        const validationCart = await cartService.getById(idUserCart)
        res.status(200).send({
            status: 200,
            message: 'Cart found successfully!',
            cart: validationCart
        })
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

router.post('/',
    check('productId').not().isEmpty().isNumeric().withMessage('The data sent is not valid numbers for an ID!'),
    check('quantity').not().isEmpty().isNumeric().withMessage('The data sent is not valid numbers for an quantity!'),

    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        console.log(req.idUser.id)
        const dataCarts = {
            productId: req.body.productId,
            quantity: req.body.quantity,
            userId: req.idUser.id
            
        }

        try {
            await cartService.add(dataCarts)
            res.status(201).send({
                status: 200,
                message: 'Product successfully added to cart'
            })
        } catch (error) {
            res.status(400).send({
                status: 400,
                message: error.message
            })
        }
    }
)

// router.put('/:id',
//     check('productId').not().isEmpty().isNumeric().withMessage('The data sent is not valid numbers for an ID!'),
    
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
//             await cartService.update(idProduct, dataProduct)
//             res.status(204).send()
//         } catch (error) {
//             res.status(404).send({
//                 status: 404,
//                 message: error.message
//             })
//         }
//     }
// )

// router.patch('/:id', 
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
//             await cartService.updateMerge(idProduct, dataProduct)
//             res.status(204).send()
//         } catch (error) {
//             res.status(404).send({
//                 status: 404,
//                 message: error.message
//             })
//         }
//     }
// )

// router.delete('/:id', async (req, res) =>{
//     const idProduct = req.params.id

//     try {
//         await cartService.delete(idProduct)
//         res.status(204).send()
//     } catch (error) {
//         res.status(404).send({
//             status: 404,
//             message: error.message
//         })
//     }
// })

module.exports = router