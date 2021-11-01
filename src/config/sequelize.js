const Sequelize = require('sequelize')
const configDatabase = require('./database')


//sequelize cria toda a configuração do banco de dados, acessando o arquivo local "database" onde tem todas config de acesso ao banco de dados.
const sequelize = new Sequelize(configDatabase)

// com essa exportação estou deixando o sequelize aberto para qualquer importação ja configurada no DB.
module.exports = sequelize