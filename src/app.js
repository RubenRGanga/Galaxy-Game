//APP

const winston = require('winston')
const express = require('express')
const path = require('path');


require('dotenv').config()

const app = express();

require('./startup/logging')()
require('./startup/routes')(app)

//ARCHIVOS ESTATICOS

app.use('/', express.static(path.join(__dirname, 'Galaxy')))

//PUERTO DE ESCUCHA

const port = process.env.PORT || 3000
app.listen(port, () => winston.info(`SERVIDOR CONECTADO EN: http://localhost:${port}`))