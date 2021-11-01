class UserService {
    constructor(UserModel) {
        this.user = UserModel
    }

    async get() {
        const listUsers = await this.user.findAll()
        return listUsers
    }
    // DTO = objeto de transferência
    async add(userDTO) {
        // procura o cpf
        const validationUser = await this.user.findOne({
            where: {
                cpf: userDTO.cpf
            }
        })
        // se encontrar um cpf existente pare!
        if (validationUser != null) {
            throw new Error('The informative CPF is already being used!')
        }
        // se passar crie um novo
        try {
            await this.user.create(userDTO)
        } catch (error) {
            throw error.message 
        }
    }
}

module.exports = UserService

// throw interrompe a requisição