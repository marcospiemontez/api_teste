const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')

const Payments = configSequelize.define('EntityPayments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,  
        autoIncrement: true
    },
    method: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }, 
}, {
    tableName: 'entitypayments'
})

module.exports = Payments