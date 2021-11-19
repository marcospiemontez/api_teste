const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')

const TypeAccess = configSequelize.define('EntityTypeAccess', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,  
        autoIncrement: true
    },
    type: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }, 
}, {
    tableName: 'entitytypeaccess'
})

module.exports = TypeAccess