class ProductService {
    constructor(ProductsModel) {
        this.product = ProductsModel
    }

    async getById (idDTO) {
        const validationProductById = await this.product.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationProductById === null) {
            throw new Error('Product not found!')
        } else {
            return validationProductById
        }
    }

    async getAll() {
        const listProducts = await this.product.findAll()
        return listProducts
    }

    async add(productDTO) {
        const validationProduct = await this.product.findOne({
            where: {
                name: productDTO.name
            }
        })

        if(validationProduct !== null) {
            throw new Error('There is already a product with this name registered')
        }

        try {
            await this.product.create(productDTO)
        } catch (error) {
            throw error
        }
    }

    async update(idDTO, productDTO) {
        const validationProductUpdate = await this.product.findOne({
            where: {
                id: idDTO
            }
        })

        if (validationProductUpdate === null) {
            throw new Error('Product not found!')
        }

        try {
            await this.product.update(
                {
                    ...productDTO
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

    async updateMerge(idDTO, productDTO) {
        const validateProductUpdateMerge = await this.product.findOne({
            where: {
                id :idDTO
            }
        })

        if (validateProductUpdateMerge === null) {
            throw new Error('Product not found!')
        }

        const dataMerge = {
            ...validateProductUpdateMerge.dataValues,
            ...productDTO
        }

        try {
            await this.product.update(
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
        const validateProductDelete = await this.product.findOne({
            where: {
                id: idDTO
            }
        })

        if (validateProductDelete === null) {
            throw new Error('Product not found!')
        }

        try {
            await this.product.destroy(
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
}

module.exports = ProductService