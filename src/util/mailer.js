const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const expressHandlebars = require('express-handlebars')
const { host, port, secure, user, pass } = require('../config/dataEmail.json')

const transporterEmail = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
        user,
        pass
    }
})

transporterEmail.use('compile', hbs({
    viewEngine: expressHandlebars.create({
        layoutsDir: path.resolve(__dirname, '..', 'util'),
        partialsDir: path.resolve(__dirname, '..', 'util'),
        defaultLayout: 'template',
        extname: '.hbs'
    }),
    viewPath: path.resolve(__dirname, '..', 'util'),
    extName: '.hbs'
}))

module.exports = transporterEmail