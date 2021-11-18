const Sequelize = require('sequelize')
const Users = require('./entityUsers')
const Products = require('./entityProducts')
const configSequelize = require('../config/sequelize')

const Requests = configSequelize.define('EntityRequests', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    note: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        Reference: {
            model: 'Users',
            key: 'id'
        }
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    amountProduct: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    amountDiscount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    // payment: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     reference: {
    //         model: 'Payments',
    //         key: 'id'
    //     }
    // },
    products: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: false,
    },
}, {
    tableName: 'entityRequests'
})

Requests.belongsTo(Users, { 
    constraint: true,
    foreignKey: 'userId',
    as: 'userData'
})

Users.hasMany(Requests, { 
    constraint: true,
    foreignKey: 'userId',
})

module.exports = Requests