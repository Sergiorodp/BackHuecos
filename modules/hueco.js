const { model, Schema } = require('mongoose')

const huecoSchema = Schema({
    latitud:{
        type : Number,
        required : true
    },
    longitud: {
        type : Number,
        required : true
    },
    Image: {
        type: String,
        require: true
    },
    fechaCreacion: {
        type : Date,
        default : Date.now
    },
    usuario: {
        type : Schema.Types.ObjectId,
        ref: 'users',
        require : true
    }
})

huecoSchema.set('toJSON',{ 
    transform : (document, returnedObject) => {
            returnedObject.id = returnedObject._id
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

const User = model('User', huecoSchema)
module.exports = User