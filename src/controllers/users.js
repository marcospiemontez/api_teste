const express = require('express')
const { users } = require('../models/index')
const UserService = require('../services/users')
const { body, check, validationResult } = require('express-validator')
const middleware = require('../middlewares/authenticatedVerification')

const router = express.Router()
router.use(middleware)

const userService = new UserService(users)

router.get('/listUser/:id', async (req, res) => {
    const idUser = req.params.id

    try {
        const validateUser = await userService.getById(idUser)
        res.status(200).send({
            status: 200,
            message: 'User found successfully',
            user: validateUser
        })
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
        
    }
})

router.get('/listUsers', async (req, res) => {
    const listUsers = await userService.getAll()
    res.status(200).json(listUsers)
})

router.post('/cadUsers',
    body('name').not().isEmpty().withMessage('The data sent connot be empty or null').trim().escape(),
    check('cpf').not().isEmpty().isNumeric().withMessage('The data sent must be valid numbers'),
    check('birthDate').not().isEmpty().isISO8601().toDate().withMessage('The date entered is not within the established pattern'),
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('The password entered must have more than 6 characters'),
    check('email').not().isEmpty().isEmail().withMessage('The e-mail entered is not a valid address'),

    async (req, res) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const dataUser = {
            name: req.body.name,
            cpf: req.body.cpf,
            birthDate: req.body.birthDate,
            password: req.body.password,
            email: req.body.email
        }

        try {
            await userService.add(dataUser)
            res.status(201).send({
                status: 201,
                message: 'User successfully added!'
            })
        } catch (error) {
            res.status(400).send({
                status:400,
                message: error.message
            })
        }
    }
)

router.put('/updateUser/:id',
    body('name').not().isEmpty().withMessage('The data sent cannot be empty or null').trim().escape(),
    check('cpf').not().isEmpty().isNumeric().withMessage('The data sent must be valid numbers'),
    check('birthDate').not().isEmpty().isISO8601().toDate().withMessage('The date entered is not within the established pattern'),
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('The password entered must have more than 6 characters'),
    check('email').not().isEmpty().isEmail().withMessage('The e-mail entered is not a valid address'),
    
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const idUser = req.params.id

        const dataUser = {
            name: req.body.name,
            cpf: req.body.cpf,
            birthDate: req.body.birthDate,
            password: req.body.password,
            email: req.body.email
        }

        try {
            await userService.update(idUser, dataUser)
            res.status(204).send()
        } catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            })
        }
    }
)

router.patch('/updateUserMerge/:id', 
    body('name').not().isEmpty().withMessage('The data sent cannot be empty or null').trim().escape(),
    check('cpf').not().isEmpty().isNumeric().withMessage('The data sent must be valid numbers'),
    check('birthDate').not().isEmpty().isISO8601().toDate().withMessage('The date entered is not within the established pattern'),
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('The password entered must have more than 6 characters'),
    check('email').not().isEmpty().isEmail().withMessage('The e-mail entered is not a valid address'),
    
    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const idUser = req.params.id

        const dataUser = {...req.body}

        try {
            await userService.updateMerge(idUser, dataUser)
            res.status(204).send()
        } catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            })
        }
    }
)

router.delete('/deleteUser/:id', async (req, res) =>{
    const idUser = req.params.id

    try {
        await userService.delete(idUser)
        res.status(204).send()
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

router.post('/changePassword',
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('The password entered must have more than 6 characters'),
    
    async (req, res) => {
        const idUser = req.idUser.id
        
        const dataUser = { ...req.body }

        try {
            await userService.updateMerge(idUser, dataUser)
            res.status(200).send({
                status: 200,
                message: 'Password changed successfully'
            })
        } catch (error) {
            res.status(400).send({
                status: 400,
                message: error.message
            })    
        }
})

module.exports = router