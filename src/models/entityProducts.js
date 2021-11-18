const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')

const Products = configSequelize.define('EntityProducts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,  
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }, 
    description: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'entityproducts'
})

module.exports = Products