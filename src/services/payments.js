class PaymentService {
    constructor(PaymentsModel) {
        this.payment = PaymentsModel
    }

    async getById (idDTO) {
        const validationPaymentById = await this.payment.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationPaymentById === null) {
            throw new Error('Payment method not found!')
        } else {
            return validationPaymentById
        }
    }

    async getAll() {
        const listPayments = await this.payment.findAll()
        return listPayments
    }

    async add(paymentDTO) {
        const validationPayment = await this.payment.findOne({
            where: {
                method: paymentDTO.method
            }
        })

        if(validationPayment !== null) {
            throw new Error('There is already a payment method with this name registered')
        }

        try {
            await this.payment.create(paymentDTO)
        } catch (error) {
            throw error.message
        }
    }

    async update(idDTO, paymentDTO) {
        const validationPaymentUpdate = await this.payment.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationPaymentUpdate === null) {
            throw new Error('Payment method not found!')
        }

        try {
            await this.payment.update(
                {
                    ...paymentDTO
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

    async updateMerge(idDTO, paymentDTO) {
        const validatePaymentUpdateMerge = await this.payment.findOne({
            where: {
                id :idDTO
            }
        })

        if (validatePaymentUpdateMerge === null) {
            throw new Error('Payment method not found!')
        }

        const dataMerge = {
            ...validatePaymentUpdateMerge.dataValues,
            ...paymentDTO
        }

        try {
            await this.payment.update(
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
        const validatePaymentDelete = await this.payment.findOne({
            where: {
                id: idDTO
            }
        })

        if (validatePaymentDelete === null) {
            throw new Error('Payment method not found!')
        }

        try {
            await this.payment.destroy(
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

module.exports = PaymentService