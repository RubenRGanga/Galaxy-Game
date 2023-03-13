//RUTAS

require('express-async-errors')

const errors = require('../middleware/errors')
// const landings = require('../routes/landings');
// const neas = require('../routes/neas');
// const users = require('../routes/users');
const express = require('express');
const cors = require('cors');

const app = express();

module.exports = function (app) {

    app.use(cors())
    app.use(express.json())

//PING

    app.get('/ping', (req, res) => {
        res.send('¡PONG!')
    })

    app.use(errors)

}