const configSequelize = require('../config/sequelize')

const Users = require('./entityUsers') //importação
const Products = require('./entityProducts.js')
const Requests = require('./entityRequests')
const Payments = require('./entityPayments')
const TypeAccess = require('./entityTypeAccess')
const Cart = require('./entityCart')

const db = {
    Users,                    // estou puxando os dados do users acima
    Products,                 // estou puxando os dados do products acima
    Requests,                 // estou puxando os dados do requests acima
    Payments,                 // estou puxando os dados do payments acima
    TypeAccess,               // estou puxando os dados do typeAccess acima
    Cart,                     // estou puxando os dados do cart acima
    configSequelize           // estou puxando os dados do configSequelize acima
}

module.exports = db