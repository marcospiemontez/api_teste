const Sequelize = require('sequelize')
class TypeAccessService {
    constructor(TypeAccessModel) {
        this.typeAccess = TypeAccessModel
    }

    async getById (idDTO) {
        const validationTypeAccessById = await this.typeAccess.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationTypeAccessById === null) {
            throw new Error('Type access not found!')
        } else {
            return validationTypeAccessById
        }
    }

    async getAll() {
        const listTypeAccess = await this.typeAccess.findAll()
        return listTypeAccess
    }

    async add(typeAccessDTO) {
        const validationTypeAccess = await this.typeAccess.findOne({
            where: {
                type: typeAccessDTO.type
            }
        })

        if(validationTypeAccess !== null) {
            throw new Error('There is already a type access with this name registered')
        }

        try {
            await this.typeAccess.create(typeAccessDTO)
        } catch (error) {
            throw error
        }
    }

    async update(idDTO, typeAccessDTO) {
        const validationTypeAccessUpdate = await this.typeAccess.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationTypeAccessUpdate === null) {
            throw new Error('Type access not found!')
        }

        try {
            await this.typeAccess.update(
                {
                    ...typeAccessDTO
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

    async updateMerge(idDTO, typeAccessDTO) {
        const validateTypeAccessUpdateMerge = await this.typeAccess.findOne({
            where: {
                id :idDTO
            }
        })

        if (validateTypeAccessUpdateMerge === null) {
            throw new Error('Type access not found!')
        }

        const dataMerge = {
            ...validateTypeAccessUpdateMerge.dataValues,
            ...typeAccessDTO
        }

        try {
            await this.typeAccess.update(
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
        const validateTypeAccessDelete = await this.typeAccess.findOne({
            where: {
                id: idDTO
            }
        })

        if (validateTypeAccessDelete === null) {
            throw new Error('Type Access not found!')
        }

        try {
            await this.typeAccess.destroy(
                {
                    where: {
                        id: idDTO
                    }
                }
            )
        } catch (error) {
            if (error instanceof Sequelize.ForeignKeyConstraintError) {
                error.message = 'It is not possible to delete the type access as it is linked to another table!'
                throw error
                // if (error.index.includes("entityrequests_paymentId_fkey")) {}
            } else {
                throw error
            }
        }
    }
}

module.exports = TypeAccessService