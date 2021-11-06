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
            throw error.message 
        }
    }
}

module.exports = UserService

// throw interrompe a requisição