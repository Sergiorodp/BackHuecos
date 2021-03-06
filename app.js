const express = require('express') // npm install express
const mongoose = require('mongoose') 
require('dotenv/config') // npm install dotenv
const morgan = require('morgan')
require('./mongoose') // Ejecuta todo el modulo
const { response }  = express
const cors = require('cors') // enlazar backend con frontend en diferentes puertos
const jwt  = require("express-jwt")
const controllersSocket = require('./scoketIo/socketio')
const sio = require("socket.io")

// create app
const PORT = process.env.PORT || 3001
const app = express() // init app with express

// express-jwt
const { authJwt, authJwtClient }= require('./middelwares/jwt')

// routes

const notFound = require('./middelwares/notFound')
const handleErrors = require('./middelwares/handleErrors')

const deteccionRoute = require('./routers/deteccion')
const usersRoute = require('./routers/users')
const huecoRoute = require('./routers/hueco')
const dispositivoRoute = require('./routers/dispositivo')

const api = process.env.API_URL // get enviroment variables


// Middleware
app.use(cors())
app.options('*',cors()) // todas la peticiones http puedenvenir de cualquier servidor

app.use(express.json())
app.use(morgan('tiny'))

app.use(authJwt())

app.use( `${api}/users`, usersRoute )
app.use(`${api}/deteccion`, jwt({ secret: process.env.SecretSign, algorithms: ["HS256"] }) , deteccionRoute)
app.use(`${api}/hueco`, huecoRoute)
app.use(`${api}/dispositivo`, dispositivoRoute)

// app.use('public/uploads', express.static(__dirname + '/public/uploads'))
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.send("<h1> Hello Server Huecos</h1>")
}) 

// ** Middelware manejar los errores
app.use ( notFound )
app.use( handleErrors )

const server_sio = app.listen(PORT, ()=>{
    console.log( `servidor iniciado en ${ PORT }` )
})

const io = sio(server_sio, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {

    console.log('a user connected');

    setInterval(() => controllersSocket.getApiAndEmit(io), 10000)
    setInterval(() => controllersSocket.getPosition(io),10000)
    setInterval(() => controllersSocket.getArrayMetrics(io), 3000)

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });


module.exports = {app, server_sio}