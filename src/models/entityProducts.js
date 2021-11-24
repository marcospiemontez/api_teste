const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')
const Users = require('./entityUsers')

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
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        Reference: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    tableName: 'entityproducts'
})

Products.belongsTo(Users, { 
    constraint: true,
    foreignKey: 'userId',
    as: 'userData'
})

module.exports = Products