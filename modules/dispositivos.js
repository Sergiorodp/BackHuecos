const { model, Schema } = require('mongoose')

const dispositivoSchema = Schema({
    numeroSerie:{
        type : Number,
        required : true
    },
    bateria: {
        type : Number,
        required : true
    },
    fechaCreacion: {
        type: Date,
        default : Date.now
    },
    usuario: {
        type : Schema.Types.ObjectId,
        ref: 'users',
        require : true
    }
})

dispositivoSchema.set('toJSON',{ 
    transform : (document, returnedObject) => {
            returnedObject.id = returnedObject._id
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

const User = model('User', dispositivoSchema)
module.exports = User