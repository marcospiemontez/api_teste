const express = require('express')
const { users } = require('../models/index')    // usando o user que foi centralizado no index
const AuthenticatedService = require('../services/authentication')   //classe é sempre maiúsculo
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const keyToken = require('../config/keyToken.json')

const router = express.Router()
const authenticatedService = new AuthenticatedService(users)

function generateToken(id = {}){
    return jwt.sign(
        {id},
        keyToken.secret,
        {expiresIn: 2592000}
    )
}

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

module.exports = router