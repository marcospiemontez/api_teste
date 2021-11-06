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

    async forgotPass(userDTO) {
        const validationUserForgot = await this.user.findOne({
            where: {
                email: userDTO.email,
            }
        })
    
        if (validationUserForgot === null) {
            throw new Error('The email entered does not belong to a valid user!')
        } else {
            return validationUserForgot
        }
    }
}

module.exports = AuthenticatedService