const Sequelize = require('sequelize')
const Users = require('./entityUsers')
const Payments = require('./entityPayments')
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
    paymentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: 'Payments',
            key: 'id'
        }
    },
    products: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: false,
    },
}, {
    tableName: 'entityrequests'
})

Requests.belongsTo(Users, { 
    constraint: true,
    foreignKey: 'userId',
    as: 'userData'
})

Users.hasMany(Requests, { 
    constraint: true,
    foreignKey: 'userId',
    as: 'userDataRequests'
})

Requests.belongsTo(Payments, { 
    constraint: true,
    foreignKey: 'paymentId',
    as: 'paymentData'
})

Payments.hasMany(Requests, { 
    constraint: true,
    foreignKey: 'paymentId',
    as: 'paymentDataRequests'
})
module.exports = Requests