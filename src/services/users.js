class UserService {
    constructor(UserModel) {
        this.user = UserModel
    }

    async getById(idDTO) {
        const validateUserByID = await this.user.findOne({
            where: {
                id: idDTO
            }
        })

        if (validateUserByID === null) {
            throw new Error('User not found!')
        } else {
            return validateUserByID
        }
    }

    async getAll() {
        const listUsers = await this.user.findAll()
        return listUsers
    }
    // DTO = objeto de transferência
    async add(userDTO) {
        // procura o cpf
        const validationUserCpf = await this.user.findOne({
            where: {
                cpf: userDTO.cpf
            }
        })
        // se encontrar um cpf existente pare!
        if (validationUserCpf !== null) {
            throw new Error('The informative CPF is already being used!')
        }

        const validationUserEmail = await this.user.findOne({
            where: {
                email: userDTO.email
            }
        })

        if (validationUserEmail !== null) {
            throw new Error('The informative email is already being used!')
        }
        // se passar crie um novo
        try {
            await this.user.create(userDTO)
        } catch (error) {
            throw error 
        }
    }

    async update(idDTO, userDTO) {
        const validationUserUpdate = await this.user.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationUserUpdate === null) {
            throw new Error('User not found!')
        }

        try {
            await this.user.update(
                {
                    ...userDTO
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

    async updateMerge(idDTO, userDTO) {
        const validateUserUpdateMerge = await this.user.findOne({
            where: {
                id :idDTO
            }
        })

        if (validateUserUpdateMerge === null) {
            throw new Error('User not found!')
        }

        const dataMerge = {
            ...validateUserUpdateMerge.dataValues,
            ...userDTO
        }

        try {
            await this.user.update(
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
        const validateUserDelete = await this.user.findOne({
            where: {
                id: idDTO
            }
        })

        if (validateUserDelete === null) {
            throw new Error('User not found!')
        }

        try {
            await this.user.destroy(
                {
                    where: {
                        id: idDTO
                    }
                }
            )
        }   catch (error) {
            if (error instanceof Sequelize.ForeignKeyConstraintError) {
                error.message = 'It is not possible to delete the user as it is linked to another table!'
                throw error
                // if (error.index.includes("entityrequests_paymentId_fkey")) {}
            } else {
                throw error
            }
        }
    }
}

module.exports = UserService
