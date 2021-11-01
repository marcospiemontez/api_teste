const users = (sequelize, DataTypes) => {
    const Users = sequelize.define('EntityUsers', {
        id: {
            type: DataTypes.INTEGER,    // tipo de dado (documentação)
            primaryKey: true,           //chave unica por usuário
            autoIncrement: true         // quando mandar add na API, ele cria o id automático
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING,
            unique: true,               // propriedade única do campo
            allowNull: false            // não pode enviar vazio
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        passoword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        } 
    }, {
        tableName: 'entityusers'
    })

    return Users
}

module.exports = users