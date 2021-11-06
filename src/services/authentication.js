class AuthenticatedService {
    constructor(UserModel) {
        this.user = UserModel
    }

    async login(userDTO) {
        const validationUser = await this.user.findOne({
            where: {
                email: userDTO.email,
                password: userDTO.password
            }
        })

        if (validationUser === null) {
            throw new Error('The data entered is incorrect!')
        } else {
            return validationUser
        }
    }
}

module.exports = AuthenticatedService