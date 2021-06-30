const mongoose = require('mongoose') 

const connStr =  process.env.CONECTION_STRING

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

