const Users = require("../models/entityUsers")

class RequestService {
    constructor(RequestsModel) {
        this.request = RequestsModel
    }

    async getById (idDTO) {
        const validationRequestById = await this.request.findOne({
            include: {
                model: Users,
                as: 'userData'
            },
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
            include: {
                model: Users,
                as: 'userData'
            },
        })
        return listRequests
    }

    async add(requestDTO) {
        const validationRequest = await Users.findOne({
            where: {
                id: requestDTO.userId
            }
        })

        if(validationRequest === null) {
            throw new Error('The ID entered does not belong to a valid user!')
        }

        try {
            await this.request.create(requestDTO)
        } catch (error) {
            throw error.message
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
            throw error.message
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
            throw error.message
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
            throw error.message
        }
    }
}

module.exports = RequestService