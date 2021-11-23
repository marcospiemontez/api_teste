const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')

const Products = configSequelize.define('EntityProducts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,  
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false
    }, 
    description: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    inventory: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'entityproducts'
})

module.exports = Products