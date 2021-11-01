const express = require('express')
const { users } = require('../models/index')
const UserService = require('../services/users')
const router = express.Router()
const { body, check, validationResult } = require('express-validator')

const userService = new UserService(users)

router.get('/listUsers', async (req, res) => {
    const listUsers = await userService.get()
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

module.exports = router