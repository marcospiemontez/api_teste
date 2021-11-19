const express = require('express')
const { TypeAccess } = require('../models/index')
const TypeAccessService = require('../services/typeAccess')
const { body, check, validationResult } = require('express-validator')
const middleware = require('../middlewares/authenticatedVerification')

const router = express.Router()
router.use(middleware)

const typeAccessService = new TypeAccessService(TypeAccess)

router.get('/:id/details', async (req, res) => {
    const idTypeAccess = req.params.id

    try {
        const validationTypeAccess = await typeAccessService.getById(idTypeAccess)
        res.status(200).send({
            status: 200,
            message: 'Type access found successfully!',
            product: validationTypeAccess
        })
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

router.get('/list', async(req, res) => {
    const listTypeAccess = await typeAccessService.getAll()
    res.status(200).json(listTypeAccess)
})

router.post('/',
    check('type').not().isEmpty().withMessage('The data submitted cannot be empty or null'),

    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const dataTypeAccess = {
            type: req.body.type,
        }

        try {
            await typeAccessService.add(dataTypeAccess)
            res.status(201).send({
                status: 200,
                message: 'Type access successfully added!'
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
    check('type').not().isEmpty().withMessage('The data submitted cannot be empty or null'),
    
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const idTypeAccess = req.params.id

        const dataTypeAccess = {
            type: req.body.type
        }

        try {
            await typeAccessService.update(idTypeAccess, dataTypeAccess)
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
    check('type').not().isEmpty().withMessage('The data submitted cannot be empty or null'),
    
    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const idTypeAccess = req.params.id

        const dataTypeAccess = {...req.body}

        try {
            await typeAccessService.updateMerge(idTypeAccess, dataTypeAccess)
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
    const idTypeAccess = req.params.id

    try {
        await typeAccessService.delete(idTypeAccess)
        res.status(204).send()
    } catch (error) {
        res.status(404).send({
            status: 404,
            message: error.message
        })
    }
})

module.exports = router