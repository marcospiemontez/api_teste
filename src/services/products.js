class ProductService {
    constructor(ProductsModel) {
        this.product = ProductsModel
    }

    async get() {
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
            throw error.message
        }
    }
}

module.exports = ProductService