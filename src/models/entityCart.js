const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')
const Products = require('../models/entityProducts')
const Users = require('../models/entityUsers')

const Cart = configSequelize.define('EntityCart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,  
        autoIncrement: true
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: 'Products',
            key: 'id'
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: 'Users',
            key: 'id'
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'entitycart'
})

Cart.belongsTo(Products, { 
    constraint: true,
    foreignKey: 'productId',
    as: 'productData'
})

Cart.belongsTo(Users, { 
    constraint: true,
    foreignKey: 'userId',
    as: 'cartData'
})

module.exports = Cart