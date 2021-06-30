const express = require('express') // npm install express
const mongoose = require('mongoose') 
require('dotenv/config') // npm install dotenv
const morgan = require('morgan')
require('./mongoose') // Ejecuta todo el modulo
const { response }  = express
const cors = require('cors') // enlazar backend con frontend en diferentes puertos


// express-jwt
const authJwt = require('./middelwares/jwt')

// routes
const productRoute = require('./routers/products')
const categoryRoute = require('./routers/categories')
const ordersRoute = require('./routers/orders')
const usersRoute = require('./routers/users')
const notFound = require('./middelwares/notFound')
const handleErrors = require('./middelwares/handleErrors')

const api = process.env.API_URL // get enviroment variables

const PORT = process.env.PORT || 3001
const app = express() // init app with express


// Middleware

app.use(cors())
app.options('*',cors()) // todas la peticiones http puedenvenir de cualquier servidor

app.use(express.json())
app.use(morgan('tiny'))

app.use(authJwt())

app.use( `${api}/products`, productRoute )
app.use( `${api}/categories`, categoryRoute )
app.use( `${api}/orders`, ordersRoute )
app.use( `${api}/users`, usersRoute )
app.use('public/uploads', express.static(__dirname + '/public/uploads'))

app.get('/', (req,res) => {
    res.send("<h1> Hello Server </h1>")
}) 

// ** Middelware manejar los errores
app.use ( notFound )
app.use( handleErrors )


app.listen(PORT, () => {
    console.log("server started")
})