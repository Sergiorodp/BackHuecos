const { model, Schema } = require('mongoose')  // forma de importar en CommonJS

/* Crear el esquema de la base de datos que solo va a estar a nivel de la app */
const productSchema = new Schema({
    name : { 
        type : String ,
        required : true
    },
    description : { 
        type : String,
        required : true
    },
    rishDescription : {
        type : String,
        default : '',
    },
    price : { 
        type : Number,
        required : true
    },
    image : { 
        type : String, 
        required : true,
        default : ''
    },
    images : [{
        type : String,
        default : ''
    }],
    aval : { 
        type : Boolean,
        default : true
    },
    countInStock : { 
        type : Number,
        required : true,
        min : 0,
        max : 255
    },
    category : {
        type : Schema.Types.ObjectId,
        ref :'Categories',
        required : true
    },
    dateCreated : {
        type : Date,
        default : Date.now
    }
})

// otra forma de obtener el ID del producto

// Product.virtual('id').get( () => {
//     return this._id.toHexString()
// })

productSchema.set('toJSON',{ 
transform : (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Product = model('Product', productSchema) // crear una colleccion y siempre que se carge el esquema va a ser el anterior
module.exports = Product
