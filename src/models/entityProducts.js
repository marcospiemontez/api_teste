const products = (sequelize, DataTypes) => {
    const Products = sequelize.define('EntityProducts', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,  
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }, 
        description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'entityproducts'
    })

    return Products
}


module.exports = products