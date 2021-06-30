const { model, Schema } = require('mongoose')  // forma de importar en CommonJS

/* Crear el esquema de la base de datos que solo va a estar a nivel de la app */
const categorySchema = new Schema({
    name : {
        type : String,
        required : true
    },
    icon: {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    image : {
        type : String,
        default : ''
    }
})

categorySchema.set('toJSON',{ 
    transform : (document, returnedObject) => {
            returnedObject.id = returnedObject._id
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

const Category = model('Categories', categorySchema) // crear una colleccion y siempre que se carge el esquema va a ser el anterior
module.exports = Category