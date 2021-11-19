const Users = require("../models/entityUsers")
const Payments = require("../models/entityPayments")

class RequestService {
    constructor(RequestsModel) {
        this.request = RequestsModel
    }

    async getById (idDTO) {
        const validationRequestById = await this.request.findOne({
            include: [
                {
                    model: Users,
                    as: 'userData'
                },
                {
                    model: Payments,
                    as: 'paymentData'
                },
            ],
            where: {
                id: idDTO
            }
        })

        if (validationRequestById === null) {
            throw new Error('Request not found!')
        } else {
            return validationRequestById
        }
    }

    async getAll() {
        const listRequests = await this.request.findAll({
            include: [
                {
                    model: Users,
                    as: 'userData'
                },
                {
                    model: Payments,
                    as: 'paymentData'
                },
            ]
        })
        return listRequests
    }

    async add(requestDTO) {
        const validationRequestUser = await Users.findOne({
            where: {
                id: requestDTO.userId
            }
        })

        if(validationRequestUser === null) {
            throw new Error('The ID entered does not belong to a valid user!')
        }

        const validationRequestPayment = await Payments.findOne({
            where: {
                id: requestDTO.paymentId
            }
        })

        if(validationRequestPayment === null) {
            throw new Error('The ID entered does not belong to a valid payment method!')
        }

        try {
            await this.request.create(requestDTO)
        } catch (error) {
            throw error
        }
    }

    async update(idDTO, requestDTO) {
        const validationRequestUpdate = await this.request.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationRequestUpdate === null) {
            throw new Error('Request not found!')
        }

        try {
            await this.request.update(
                {
                    ...requestDTO
                },
                {
                    where: {
                        id: idDTO
                    }
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updateMerge(idDTO, requestDTO) {
        const validateRequestUpdateMerge = await this.request.findOne({
            where: {
                id :idDTO
            }
        })

        if (validateRequestUpdateMerge === null) {
            throw new Error('Request not found!')
        }

        const dataMerge = {
            ...validateRequestUpdateMerge.dataValues,
            ...requestDTO
        }

        try {
            await this.request.update(
                {
                    ...dataMerge
                },
                {
                    where: {
                        id: idDTO
                    }
                }
            )
        } catch (error) {
            throw error
        }
    }

    async delete(idDTO) {
        const validateRequestDelete = await this.request.findOne({
            where: {
                id: idDTO
            }
        })

        if (validateRequestDelete === null) {
            throw new Error('Request not found!')
        }

        try {
            await this.request.destroy(
                {
                    where: {
                        id: idDTO
                    }
                }
            )
        } catch (error) {
            throw error
        }
    }
}

module.exports = RequestService