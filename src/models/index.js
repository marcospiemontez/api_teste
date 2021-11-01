const Sequelize = require('sequelize')
const configSequelize = require('../config/sequelize')

const Users = require('./entityUsers') //importação
const Products = require('./entityProducts.js')

const users =  Users(configSequelize, Sequelize.DataTypes)
const products = Products(configSequelize, Sequelize.DataTypes)

const db = {
    users: users,                       // estou puxando os dados do users acima
    products: products,                 // estou puxando os dados do products acima
    configSequelize: configSequelize    // estou puxando os dados do configSequelize acima
}

module.exports = db