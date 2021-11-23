const express = require('express')
const routers = require('./controllers/index')
const { configSequelize } = require('./models/index')
const cors = require('cors')

const app = express()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.json())
app.use('/', routers)

// { force: true }
configSequelize.sync().then(() => {
    console.log('Database Connected!')
})

app.listen(3000, () => {
    console.log('Application online!')
})