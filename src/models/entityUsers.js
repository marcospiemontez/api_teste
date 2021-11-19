const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')
const TypeAccess = require('./entityTypeAccess')

const Users = configSequelize.define('EntityUsers', {
    id: {
        type: Sequelize.INTEGER,    // tipo de dado (documentação)
        primaryKey: true,           //chave unica por usuário
        autoIncrement: true         // quando mandar add na API, ele cria o id automático
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        unique: true,               // propriedade única do campo
        allowNull: false            // não pode enviar vazio
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    typeAccessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
            model: 'TypeAccess',
            key: 'id'
        }
    } 
}, {
    tableName: 'entityusers'
})

Users.belongsTo(TypeAccess, { 
    constraint: true,
    foreignKey: 'typeAccessId',
    as: 'typeAccessData'
})

TypeAccess.hasMany(Users, { 
    constraint: true,
    foreignKey: 'typeAccessId',
    as: 'typesDataUser'
})

module.exports = Users