const mongoose = require('mongoose') 

const {CONECTION_STRING , CONECTION_STRING_PRODUCTION, NODE_ENV} = process.env

const connStr = NODE_ENV === 'test' 
    ? process.env.CONECTION_STRING
    : process.env.CONECTION_STRING_PODUCTION

console.log(connStr)

mongoose.connect(connStr,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false,
    useCreateIndex : true,
})
.then(() => {
    console.log("Database connection is ready")
})
.catch( e => console.log(e))

