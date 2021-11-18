const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')
const Users = require('./entityUsers')

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
        allowNull: false
    },
}, {
    tableName: 'entityRequests'
})

Requests.belongsTo(Users, { 
    constraint: true,
    foreignKey: 'userId',
    as: 'userData'
})

Requests.hasMany(Requests, { 
    constraint: true,
    foreignKey: 'userId',
})

module.exports = Requests