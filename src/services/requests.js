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
        const listRequests = await this.request.findAll()
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

    // async update(idDTO, productDTO) {
    //     const validationProductUpdate = await this.product.findOne({
    //         where: {
    //             id: idDTO
    //         }
    //     })

    //     if (validationProductUpdate === null) {
    //         throw new Error('Product not found!')
    //     }

    //     try {
    //         await this.product.update(
    //             {
    //                 ...productDTO
    //             },
    //             {
    //                 where: {
    //                     id: idDTO
    //                 }
    //             }
    //         )
    //     } catch (error) {
    //         throw error.message
    //     }
    // }

    // async updateMerge(idDTO, productDTO) {
    //     const validateProductUpdateMerge = await this.product.findOne({
    //         where: {
    //             id :idDTO
    //         }
    //     })

    //     if (validateProductUpdateMerge === null) {
    //         throw new Error('Product not found!')
    //     }

    //     const dataMerge = {
    //         ...validateProductUpdateMerge.dataValues,
    //         ...productDTO
    //     }

    //     try {
    //         await this.product.update(
    //             {
    //                 ...dataMerge
    //             },
    //             {
    //                 where: {
    //                     id: idDTO
    //                 }
    //             }
    //         )
    //     } catch (error) {
    //         throw error.message
    //     }
    // }

    // async delete(idDTO) {
    //     const validateProductDelete = await this.product.findOne({
    //         where: {
    //             id: idDTO
    //         }
    //     })

    //     if (validateProductDelete === null) {
    //         throw new Error('Product not found!')
    //     }

    //     try {
    //         await this.product.destroy(
    //             {
    //                 where: {
    //                     id: idDTO
    //                 }
    //             }
    //         )
    //     } catch (error) {
    //         throw error.message
    //     }
    // }
}

module.exports = RequestService