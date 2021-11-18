const configSequelize = require('../config/sequelize')

const Users = require('./entityUsers') //importação
const Products = require('./entityProducts.js')
const Requests = require('./entityRequests')

const db = {
    Users,                    // estou puxando os dados do users acima
    Products,                 // estou puxando os dados do products acima
    Requests,                 // estou puxando os dados do requests acima
    configSequelize           // estou puxando os dados do configSequelize acima
}

module.exports = db