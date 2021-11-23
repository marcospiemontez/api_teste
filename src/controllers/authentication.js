const express = require('express')
const { Users } = require('../models/index')    // usando o user que foi centralizado no index
const AuthenticatedService = require('../services/authentication')   //classe é sempre maiúsculo
const { body, check, validationResult } = require('express-validator')
const UserService = require('../services/users')
const jwt = require('jsonwebtoken')
const keyToken = require('../config/keyToken.json')
const mailer = require('../util/mailer')

const router = express.Router()
const authenticatedService = new AuthenticatedService(Users)

const userService = new UserService(Users)

function generateToken(id = {}){
    return jwt.sign(
        {id},
        keyToken.secret,
        {expiresIn: '12h'}
    )
}

router.post('/registration',
    body('name').not().isEmpty().withMessage('The data sent connot be empty or null').trim().escape(),
    check('cpf').not().isEmpty().isNumeric().withMessage('The data sent must be valid numbers'),
    check('birthDate').not().isEmpty().isISO8601().toDate().withMessage('The date entered is not within the established pattern'),
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('The password entered must have more than 6 characters'),
    check('email').not().isEmpty().isEmail().withMessage('The e-mail entered is not a valid address'),
    check('phone').not().isEmpty().isNumeric().withMessage('The phone entered is not a valid number'),

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
            email: req.body.email,
            phone: req.body.phone,
            typeAccessId: req.body.typeAccessId
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

router.post('/loginUser',
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('The password ented must have more than 6 characters'),
    check('email').not().isEmpty().isEmail().withMessage('The e-mail entered is not a valid address'),
    
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const dataUser = {
            password: req.body.password,
            email: req.body.email
        }

        try {
            const validateUser = await authenticatedService.login(dataUser)
            res.status(201).send({
                status: 201,
                message: 'User found successfully',
                user: validateUser,
                token: generateToken({ id: validateUser.id })
            })
        } catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            })
        }
    }
)

router.post('/forgotPassword',
    check('email').not().isEmpty().isEmail().withMessage('The e-mail entered is not a valid address'),
    
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const dataUser = {
            email: req.body.email
        }

        try {
            const validateUserForgot = await authenticatedService.forgotPass(dataUser)

            const token = generateToken({ id: validateUserForgot.id })

            mailer.sendMail({
                to: req.body.email,
                from: 'marcos.para.software@gmail.com',
                subject: 'Password change request',
                template: 'template',
                context: { token }
            }, (err) => {
                if (err) {
                    return res.status(400).send({
                        status: 400,
                        message: 'Unable to send change email!'
                    })
                } else {
                    return res.status(200).send({
                        status: 200,
                        message: 'Email successfully sent!'
                    })
                }
            })           
        } catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            })
        }
    }
)

module.exports = router