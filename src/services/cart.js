const Products = require("../models/entityProducts")
const Users = require("../models/entityUsers")

class CartService {
    constructor(CartModel) {
        this.cart = CartModel
    }

    async getById (idDTO) {
        const validationCartById = await this.cart.findAll({
            include: {
                model: Products,
                as: 'productData'
            },
            where: {
                userId: idDTO
            }
        })

        if (validationCartById === null) {
            throw new Error('Cart not found!')
        } else {

            var dataFormat = {
                userId: idDTO,
                products: []
            }

            await validationCartById.forEach(element => {

                var product = {}
                var quantity = 0
                var productData = {}

                product = element.dataValues.productData.dataValues
                quantity = element.dataValues.quantity

                productData = {
                    ...product,
                    quantity
                }

                dataFormat.products.push(productData)
            })

            return dataFormat
        }
    }

    async add(cartDTO) {
        const validationCart = await Products.findOne({
            where: {
                id: cartDTO.productId
            }
        })

        if(validationCart === null) {
            throw new Error('The sent ID does not correspond to a valid user!')
        }

        const validationUsers = await Users.findOne({
            where: {
                id: cartDTO.userId
            }
        })

        if(validationUsers === null) {
            throw new Error('The sent ID does not correspond to a valid product!')
        }

        try {
            await this.cart.create(cartDTO)
        } catch (error) {
            throw error
        }
    }

    async updateMerge(idDTO, cartDTO) {
        const validatecartUpdateMerge = await this.cart.findOne({
            where: {
                id :idDTO
            }
        })

        if (validatecartUpdateMerge === null) {
            throw new Error('cart not found!')
        }

        const dataMerge = {
            ...validatecartUpdateMerge.dataValues,
            ...cartDTO
        }

        try {
            await this.cart.update(
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

    async delete(idUserCartDTO, idProductCartDTO) {
        const validateCartDelete = await this.cart.findOne({
            where: {
                userId: idUserCartDTO,
                productId: idProductCartDTO
            }
        })

        if (validateCartDelete === null) {
            throw new Error('Product not found!')
        } else {
            var idCart = validateCartDelete.dataValues.id 
        }


        try {
            await this.cart.destroy(
                {
                    where: {
                        id: idCart
                    }
                }
            )
            } catch (error) {
                throw error
            }
    }
}

module.exports = CartService